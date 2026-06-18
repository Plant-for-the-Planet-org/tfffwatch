"use client";

import { useWorldMapStore } from "@/stores/map.store";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  initialValue?: string;
  onChange?: (value: string) => void;
};

function YearSelectContent({ initialValue, onChange }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setSelectedYear, selectedDataset } = useWorldMapStore();

  const [selectedId, setSelectedId] = useState(0);
  const [allOptions] = useState<
    { id: number; value: string; label: string; additionalLabels?: string[] }[]
  >([
    { id: 0, value: "2024", label: "2024" },
    { id: 1, value: "2023", label: "2023" },
    { id: 2, value: "2022", label: "2022" },
    { id: 3, value: "2021", label: "2021" },
    { id: 4, value: "2020", label: "2020" },
    { id: 5, value: "2019", label: "2019" },
    { id: 6, value: "2018", label: "2018" },
    // {
    //   id: 7,
    //   value: "2018-2024",
    //   label: "2018-2024",
    //   additionalLabels: ["average"],
    // },
  ]);

  // MMU data only goes back to 2021; other datasets back to 2018.
  const minYear = selectedDataset === "MMU" ? 2021 : 2018;
  const options = useMemo(
    () => allOptions.filter((el) => +el.value >= minYear),
    [allOptions, minYear]
  );

  // When switching to a dataset with a narrower year range (e.g. MMU),
  // snap an out-of-range selected year to the latest valid year + sync URL.
  useEffect(() => {
    const current = allOptions.find((el) => el.id === selectedId);
    if (current && +current.value < minYear) {
      const snapped = options[0];
      setSelectedId(snapped.id);
      setSelectedYear(snapped.value);

      const pathSegments = pathname.split("/");
      const yearIndex = pathSegments.findIndex((segment) =>
        /^\d{4}$/.test(segment)
      );
      if (yearIndex !== -1) {
        pathSegments[yearIndex] = snapped.value;
        const newPath = pathSegments.join("/");
        const queryString = searchParams.toString();
        router.push(queryString ? `${newPath}?${queryString}` : newPath, {
          scroll: false,
        });
      }
    }
  }, [
    minYear,
    options,
    allOptions,
    selectedId,
    setSelectedYear,
    pathname,
    router,
    searchParams,
  ]);

  useEffect(() => {
    if (!initialValue) {
      const selected = options[0];
      setSelectedId(selected.id);
      setSelectedYear(selected.value);
      return;
    }

    // Fall back to the latest valid year if initialValue is out of range
    // for the current dataset (e.g. a pre-2021 year while MMU is active).
    const selected =
      options.find((el) => el.value === initialValue) ?? options[0];
    setSelectedId(selected.id);
    setSelectedYear(selected.value);
  }, [initialValue, options, setSelectedYear]);

  return (
    <Menu>
      <MenuButton
        as="button"
        // disabled
        className="mx-2 rounded-full font-bold bg-white px-5 py-1 border border-base-gray outline-none inline-flex gap-2 items-center justify-center"
      >
        {({ open }) => (
          <>
            <span>{options.find((el) => el.id === selectedId)?.label}</span>
            <Image
              className={twMerge(open ? "text-[#307FED]" : "text-base-text")}
              width={8}
              height={8}
              src="/assets/ui/select-arrow.svg"
              alt=""
            />
          </>
        )}
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="my-2 z-30 bg-white px-2 border border-base-gray divide-base-gray divide-y outline-none rounding-lg shadow-custom"
      >
        {options.map((el) => (
          <MenuItem key={el.id} as="div">
            <button
              className="block w-full py-2 px-2 hover:font-bold cursor-default text-center"
              onClick={() => {
                setSelectedId(el.id);
                setSelectedYear(el.value);

                // Update URL path with new year (e.g., /brazil/2024 -> /brazil/2023)
                const pathSegments = pathname.split("/");
                // Find and replace the year segment (assuming format: /country/year)
                const yearIndex = pathSegments.findIndex((segment) =>
                  /^\d{4}$/.test(segment)
                );

                if (yearIndex !== -1) {
                  pathSegments[yearIndex] = el.value;
                  const newPath = pathSegments.join("/");
                  const queryString = searchParams.toString();
                  const newUrl = queryString
                    ? `${newPath}?${queryString}`
                    : newPath;
                  router.push(newUrl, { scroll: false });
                }

                if (onChange) onChange(el.value);
              }}
            >
              <span
                className={twMerge(
                  "block typo-p",
                  el.id === selectedId ? "font-bold" : ""
                )}
              >
                {el.label}
              </span>
              <span className="text-xs">{el.additionalLabels?.join(", ")}</span>
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}

export default function YearSelect(props: Props) {
  return (
    <Suspense fallback={<YearSelectFallback />}>
      <YearSelectContent {...props} />
    </Suspense>
  );
}

function YearSelectFallback() {
  return (
    <button className="mx-2 rounded-full font-bold bg-white px-5 py-1 border border-base-gray outline-none inline-flex gap-2 items-center justify-center">
      <span>2024</span>
      <Image width={8} height={8} src="/assets/ui/select-arrow.svg" alt="" />
    </button>
  );
}
