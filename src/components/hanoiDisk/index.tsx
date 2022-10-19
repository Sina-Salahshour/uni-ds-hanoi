const diskSizeSpecifier = (index: number, totalCount: number) =>
  (index / totalCount) * 0.8 + 0.2;

const diskColorSpecifier = (index: number, totalCount: number) => {
  const calculatedValue = (((index - 1) % totalCount) * 255) / totalCount;
  return `rgb(${calculatedValue}, ${calculatedValue / 3 + 128},${
    128 - calculatedValue / 5
  })`;
};

export interface HanoiDiskProps {
  index: number;
  totalCount: number;
}

export const HanoiDisk = ({ index, totalCount }: HanoiDiskProps) => {
  return (
    <div
      className="w-full bg-black"
      style={{
        transform: `scaleX(${diskSizeSpecifier(index, totalCount)})`,
        backgroundColor: diskColorSpecifier(index, totalCount),
        height: Math.round(80 / totalCount) + "%",
      }}
    ></div>
  );
};
