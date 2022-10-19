import type { HanoiDiskProps } from "../hanoiDisk";

import { HanoiDisk } from "../hanoiDisk";

export interface HanoiStandProps {
  disksIndex: HanoiDiskProps["index"][];
  totalDiskCount: HanoiDiskProps["totalCount"];
}

export const HanoiStand = ({ disksIndex, totalDiskCount }: HanoiStandProps) => {
  return (
    <div
      className="relative w-60 h-60 flex flex-col-reverse ml-2 pb-5 pt-10 items-center justify-start
     after:block after:absolute after:bottom-0 after:w-full after:h-5 after:bg-slate-500
     before:block before:absolute before:bg-slate-500 before:left-1/2 before:-translate-x-1/2 before:h-full before:w-5 before:rounded-t-sm"
    >
      {disksIndex.map((diskIndex) => (
        <HanoiDisk
          key={diskIndex}
          index={diskIndex}
          totalCount={totalDiskCount}
        />
      ))}
    </div>
  );
};
