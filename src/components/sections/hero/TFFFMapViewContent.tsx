import Br from "@/components/ui/Br";
import YearSelect from "@/components/ui/YearSelect";

type HeaderProps = {
  year: string;
};

export function WorldMapHeaderContent() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold typo-h2">Estimated TFFF Payouts</h2>
      <Br />
      {/* <h3 className="flex gap-2 items-center flex-wrap">
        <span className="text-center font-bold">
          Forest loss in <i>Tropical Forest Forever Facility</i> countries in
          <YearSelect />
        </span>
      </h3> */}
      {/* <p className="text-center max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl typo-p">
        % of eligible forest cover deforested or degraded in tropical forest
        countries according to the TFFF’s standards
      </p> */}
      <p className="text-center max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl typo-p">
        if TFFF were fully funded; based on 2024 forest change data
      </p>
    </div>
  );
}

export function CountryMapHeaderContent({ year }: HeaderProps) {
  return (
    <div className="flex flex-col items-center">
      <h3 className="flex gap-2 items-center flex-wrap">
        <span className="text-center font-bold">
          Forest change in
          <YearSelect initialValue={year} />
        </span>
      </h3>
      <p className="text-center max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl typo-p">
        compared to previous year and classified based on TFFF’s standards
      </p>
    </div>
  );
}
