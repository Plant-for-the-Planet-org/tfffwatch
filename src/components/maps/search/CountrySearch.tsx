"use client";

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useClickAway } from "@uidotdev/usehooks";
import { Search, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useWorldMapStore } from "@/stores/map.store";
import {
  classify,
  CountryStatus,
  statusColor,
  statusLabel,
} from "@/domain/eligibility";
import { searchCountries, SearchableCountry } from "@/domain/country-search";

const MAX_RESULTS = 5;

// Order used for suggestions when nothing is typed yet.
const STATUS_RANK: Record<CountryStatus, number> = {
  ELIGIBLE: 0,
  ALMOST_ELIGIBLE: 1,
  INELIGIBLE: 2,
  NO_DATA: 3,
};

type Props = {
  onSelect: (country: SearchableCountry, status: CountryStatus) => void;
  // ISO2 of the country already shown (country page); marked "Current".
  currentIso2?: string;
  className?: string;
};

// A subtle "Search for a country" call to action that morphs, in place,
// into a small command panel. The CTA text is the input placeholder, so the
// icon and text never move when the panel opens.
export default function CountrySearch({
  onSelect,
  currentIso2,
  className,
}: Props) {
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { forestData, selectedDataset, selectedYear } = useWorldMapStore();

  // ISO2 -> eligibility for the chosen dataset and year, so each result
  // carries the same color as the map.
  const statusByIso2 = useMemo(() => {
    const map: Record<string, CountryStatus> = {};
    for (const row of forestData[selectedDataset] ?? []) {
      if (String(row.year) !== String(selectedYear)) continue;
      map[row["country-iso2"]] = classify(row);
    }
    return map;
  }, [forestData, selectedDataset, selectedYear]);

  const statusOf = (iso2: string): CountryStatus =>
    statusByIso2[iso2] ?? "NO_DATA";

  const results = useMemo(() => {
    const list = searchCountries(query);
    if (query.trim()) return list.slice(0, MAX_RESULTS);
    // No query: suggest countries with data, eligible first.
    return [...list]
      .filter((c) => c.iso2 !== currentIso2)
      .sort(
        (a, b) =>
          STATUS_RANK[statusByIso2[a.iso2] ?? "NO_DATA"] -
          STATUS_RANK[statusByIso2[b.iso2] ?? "NO_DATA"],
      )
      .slice(0, MAX_RESULTS);
  }, [query, statusByIso2, currentIso2]);

  const close = () => {
    setActive(false);
    setQuery("");
    // Drop focus from anything inside the panel (input or close button),
    // so the closed CTA is not left holding a hidden focused control.
    const focused = document.activeElement as HTMLElement | null;
    if (focused && panelRef.current?.contains(focused)) focused.blur();
    inputRef.current?.blur();
  };

  const panelRef = useClickAway<HTMLDivElement>(() => {
    if (active) close();
  });

  const hasQuery = query.length > 0;

  return (
    // Reserves the CTA height; the open panel floats over the content below.
    <div
      className={twMerge("relative h-10 w-full flex justify-center", className)}
    >
      <div
        ref={panelRef}
        className={twMerge(
          "absolute top-0 inset-x-0 mx-auto z-40 w-full md:w-96",
          // Closed: only the CTA label takes clicks.
          !active && "pointer-events-none",
        )}
        onBlur={(e) => {
          // Close when focus leaves the panel by keyboard (Tab).
          const next = e.relatedTarget as Node | null;
          if (next && !e.currentTarget.contains(next)) close();
        }}
      >
        {/* Card surface: scales and fades in behind the input and list */}
        <div
          aria-hidden
          className={twMerge(
            "absolute inset-0 rounded-2xl bg-white border border-primary-medium-light shadow-custom origin-top",
            "transition-[opacity,scale] motion-reduce:transition-none",
            active
              ? "opacity-100 scale-100 duration-200 ease-out"
              : "opacity-0 scale-[0.96] duration-150 ease-in",
          )}
        />

        <Combobox<SearchableCountry | null>
          value={null}
          immediate
          onChange={(country) => {
            if (!country) return;
            onSelect(country, statusOf(country.iso2));
            close();
          }}
        >
          <div className="relative h-10 flex items-center">
            {/* CTA and placeholder in one label. Closed: centred CTA.
                Active: slides to the left edge and acts as the placeholder. */}
            <button
              type="button"
              tabIndex={-1}
              onClick={() => inputRef.current?.focus()}
              aria-hidden
              className={twMerge(
                "absolute top-0 h-full flex items-center gap-2 text-sm whitespace-nowrap",
                "transition-[left,translate,color] duration-200 ease-out motion-reduce:transition-none",
                active
                  ? "left-3.5 translate-x-0 pointer-events-none text-primary"
                  : "left-1/2 -translate-x-1/2 pointer-events-auto cursor-pointer text-primary hover:text-primary-dark",
              )}
            >
              <Search
                className={twMerge(
                  "size-4 shrink-0 transition-colors duration-150",
                  hasQuery && "text-primary-dark",
                )}
              />
              <span
                className={twMerge(
                  "transition-opacity duration-100 ease-out",
                  hasQuery && "opacity-0",
                )}
              >
                Search for a country
              </span>
            </button>

            <ComboboxInput
              ref={inputRef}
              aria-label="Search for a country"
              autoComplete="off"
              spellCheck={false}
              value={query}
              onFocus={() => setActive(true)}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") close();
              }}
              className={twMerge(
                // Left padding lines typed text up with the label text (14px + icon 16px + gap 8px).
                "relative w-full h-full bg-transparent pl-[38px] pr-10 text-left outline-none caret-primary-dark",
                // 16px on mobile stops iOS from zooming on focus.
                "text-base md:text-sm text-base-text",
              )}
            />
            <button
              type="button"
              aria-label="Close search"
              tabIndex={active ? 0 : -1}
              // Keep focus in the input on press, so the input's blur does not
              // race the click (focus would land on the hidden button).
              onMouseDown={(e) => e.preventDefault()}
              onClick={close}
              className={twMerge(
                "absolute right-2 p-1 rounded-full text-primary hover:text-primary-dark hover:bg-primary-light cursor-pointer",
                "transition-[opacity,scale] duration-150 ease-out",
                active
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-75 pointer-events-none",
              )}
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>

          <ComboboxOptions
            transition
            className={twMerge(
              "relative border-t border-primary-medium-light outline-none origin-top",
              "transition-[opacity,scale,translate] duration-200 ease-out",
              "data-closed:opacity-0 data-closed:scale-[0.98] data-closed:-translate-y-1",
              "data-leave:duration-100 data-leave:ease-in",
              "motion-reduce:transition-none",
            )}
          >
            <div className="px-4 pt-2.5 pb-1 text-xs font-medium text-primary-dark">
              {hasQuery ? "Countries" : "Suggestions"}
            </div>

            {results.length === 0 ? (
              <div className="px-4 pb-3 pt-1 text-sm text-gray-500">
                No country found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              <div className="px-1.5 pb-1.5">
                {results.map((country) => {
                  const status = statusOf(country.iso2);
                  const isCurrent = country.iso2 === currentIso2;
                  return (
                    <ComboboxOption
                      key={country.iso2}
                      value={country}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm cursor-pointer select-none transition-colors duration-100 data-focus:bg-primary-light"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={country.flagImgUrl}
                        alt=""
                        className="w-5 h-3.5 shrink-0 object-cover rounded-[2px] ring-1 ring-primary-medium-light"
                        loading="lazy"
                      />
                      <span
                        className={twMerge(
                          "grow truncate text-base-text",
                          isCurrent && "font-semibold",
                        )}
                      >
                        {country.name}
                      </span>
                      {isCurrent ? (
                        <span className="shrink-0 text-xs font-medium text-primary-dark">
                          Current
                        </span>
                      ) : (
                        <span className="shrink-0 inline-flex items-center gap-1.5 text-xs text-gray-600">
                          <span
                            className="size-2.5 rounded-full ring-1 ring-black/10"
                            style={{ backgroundColor: statusColor(status) }}
                            aria-hidden
                          />
                          {statusLabel(status)}
                        </span>
                      )}
                    </ComboboxOption>
                  );
                })}
              </div>
            )}
          </ComboboxOptions>
        </Combobox>
      </div>
    </div>
  );
}
