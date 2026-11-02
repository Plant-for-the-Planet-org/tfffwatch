import { Spacer } from "@/components/ui/layout";
import { IconButton } from "@/components/ui/Button";
import { formatPublisherForCardBadge } from "@/lib/text";
import { formatDateForCardBadge } from "@/lib/date";

type Props = {
  title: string;
  summary?: string;
  image: string;
  publisher?: string;
  datetime: string;
  url: string;
};

export default function PolicyCard(props: Props) {
  return (
    // <div className="group flex-1/3 grow-0 shrink p-3 bg-white border border-primary-medium-light rounding-xl">
    //   {/* <div className="flex flex-row gap-2 items-center md:flex-col h-full"> */}
    //   <div className="flex flex-row md:flex-col gap-2 items-strech relative mb-2 overflow-hidden rounded-lg lg:rounded-xl">
    //     <div className="flex-2/5 md:flex-auto w-full border border-base-gray relative overflow-hidden rounding-lg">
    //       <img
    //         className="w-full h-full md:aspect-[4/3] object-center object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
    //         src={props.image}
    //         alt={props.title}
    //         loading="lazy"
    //         decoding="async"
    //       />
    //       <div className="md:hidden absolute bottom-0 right-0 m-1">
    //         <IconButton href={props.url} small external />
    //       </div>
    //       <div className="hidden md:block absolute bottom-0 inset-x-0 px-3 pb-3">
    //         <div className="flex justify-between items-end">
    //           <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs max-h-10 flex gap-x-1 flex-wrap">
    //             <p className="max-h-4 max-w-fit overflow-hidden">
    //               <span>
    //                 <span className="hidden md:inline-block xl:hidden">
    //                   {formatPublisherForCardBadge(props.publisher!, 16)}
    //                 </span>
    //                 <span className="md:hidden xl:inline-block">
    //                   {formatPublisherForCardBadge(props.publisher!)}
    //                 </span>
    //               </span>
    //             </p>
    //             <span> · </span>
    //             <p id="date-badge" className="whitespace-nowrap">
    //               {formatDateForCardBadge(new Date(props.datetime))}
    //             </p>
    //           </div>
    //           <div className="">
    //             <IconButton href={props.url} external />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex-3/5 md:flex-auto ">
    //       <a href={props.url} target="_blank" rel="noopener noreferrer">
    //         <h3 className="font-bold text-base">{props.title}</h3>
    //         {/* <p className="text-sm xl:text-base">{props.summary}</p> */}
    //       </a>
    //     </div>
    //   </div>
    //   <Spacer className="hidden md:block" />
    //   {/* </div> */}
    // </div>
    <div className="group flex-1/3 grow-0 shrink p-3 bg-white border border-primary-medium-light rounding-xl">
      <div className="relative mb-2 overflow-hidden rounded-lg lg:rounded-xl">
        <img
          className="aspect-[2.42] md:aspect-[4/3] w-full object-center object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          src={props.image}
          alt={props.title}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute bottom-0 inset-x-0 px-3 pb-3">
          <div className="flex justify-between items-end">
            <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs max-h-10 flex gap-x-1 flex-wrap">
              <p className="max-h-4 max-w-fit overflow-hidden">
                <span>
                  <span className="hidden md:inline-block xl:hidden">
                    {formatPublisherForCardBadge(props.publisher!, 16)}
                  </span>
                  <span className="md:hidden xl:inline-block">
                    {formatPublisherForCardBadge(props.publisher!, 24)}
                  </span>
                </span>
              </p>
              <span> · </span>
              <p className="whitespace-nowrap">
                {formatDateForCardBadge(new Date(props.datetime))}
              </p>
            </div>
            <IconButton href={props.url} cn="hidden md:block" external />
            <IconButton href={props.url} cn="md:hidden" small external />
          </div>
        </div>
      </div>
      <a href={props.url} target="_blank" rel="noopener noreferrer">
        <h3 className="mb-2 font-bold text-base">{props.title}</h3>
        <p className="text-sm xl:text-base">{props.summary}</p>
      </a>
      <Spacer className="hidden md:block" />
    </div>
  );
}
