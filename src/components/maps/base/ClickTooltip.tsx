import Image from "next/image";

// Hover hint shown over the interactive maps. Moved here from TFFFMapView so
// WorldMap no longer imports from the hero module (breaks the import cycle).
export function ClickTooltip() {
  return (
    <div className="relative group">
      <button
        className="bg-white rounded-lg p-1 cursor-pointer overflow-clip"
        onClick={() => {}}
      >
        <Image
          className="-translate-x-0.5"
          width={32}
          height={32}
          src="/assets/finger-tap.gif"
          alt=""
        />
      </button>

      {/* Tooltip */}
      <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
        <div className="bg-background text-base-text text-sm px-3 py-2 rounded-full whitespace-nowrap shadow-lg">
          Click on a country for more data
        </div>
      </div>
    </div>
  );
}
