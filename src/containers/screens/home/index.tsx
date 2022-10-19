import { useState, useRef, useEffect, useReducer, useCallback } from "react";

import { HanoiStand } from "../../../components/hanoiStand";

const DISK_COUNT = 20;

interface diskStateType {
  a: number[];
  b: number[];
  c: number[];
}

function* hanoi<T>(
  source: T,
  middle: T,
  dest: T,
  n: number
): Generator<T[], void, unknown> {
  if (n === 1) {
    yield [source, dest];
  } else {
    yield* hanoi(source, dest, middle, n - 1);
    yield [source, dest];
    yield* hanoi(middle, source, dest, n - 1);
  }
}

const HomeScreen = () => {
  const [selectedDiskCount, setSelectedDiskCount] = useState(DISK_COUNT);
  const [curentDiskCount, setCurentDiskCount] = useState(selectedDiskCount);
  const [speed, setSpeed] = useState(100);
  const initialDiskState = {
    a: [...Array(selectedDiskCount)].map(
      (_, index) => selectedDiskCount - index
    ),

    b: [],
    c: [],
  };
  const [diskStates, setDiskStates] = useState<diskStateType>(initialDiskState);
  const [autoplay, toggleAutoplay] = useReducer((prev) => !prev, false);
  const moveDiskFromAtoB = (a: keyof diskStateType, b: keyof diskStateType) => {
    setDiskStates((prev) => {
      if (prev[b].length && (prev[a].at(-1) ?? -1) > (prev[b].at(-1) ?? -1)) {
        throw Error("disk is bigger than last disk");
      }
      return {
        ...prev,
        [a]: prev[a].slice(0, -1),
        [b]: [...prev[b], prev[a].at(-1) ?? -1].filter((val) => val !== -1),
      };
    });
  };
  const nextStep = useCallback(() => {
    const [fromDisk, toDisk] = hanoiIterator.current.next().value ?? ["a", "a"];
    moveDiskFromAtoB(fromDisk, toDisk);
  }, []);
  const hanoiIterator = useRef(
    hanoi<keyof diskStateType>("a", "b", "c", curentDiskCount)
  );
  const reset = () => {
    if (autoplay) toggleAutoplay();
    setCurentDiskCount(selectedDiskCount);
    setDiskStates(initialDiskState);
    hanoiIterator.current = hanoi<keyof diskStateType>(
      "a",
      "b",
      "c",
      selectedDiskCount
    );
  };
  useEffect(() => {
    if (autoplay) {
      let autoPlayInterval = setInterval(nextStep, speed);
      return () => clearInterval(autoPlayInterval);
    }
  }, [autoplay, speed, nextStep]);

  const actionClassNames = `p-2 bg-slate-500 rounded-md hover:bg-slate-400 active:bg-slate-300 px-3 w-16 shadow-md`;

  return (
    <main className="h-[100vh] flex justify-center items-center flex-col">
      <section className="w-full flex ml-[-2] p-5 items-center justify-center">
        <HanoiStand
          disksIndex={diskStates["a"]}
          totalDiskCount={curentDiskCount}
        />
        <HanoiStand
          disksIndex={diskStates["b"]}
          totalDiskCount={curentDiskCount}
        />
        <HanoiStand
          disksIndex={diskStates["c"]}
          totalDiskCount={curentDiskCount}
        />
      </section>
      <div className="flex justify-between w-52 mx-auto mt-3">
        <button className={actionClassNames} onClick={nextStep}>
          next
        </button>
        <button className={actionClassNames} onClick={toggleAutoplay}>
          {autoplay ? "pause" : "play"}
        </button>
        <button className={actionClassNames} onClick={reset}>
          reset
        </button>
      </div>
      <div className="flex flex-col justify-between w-52 mx-auto mt-5">
        <input
          type="range"
          name="diskCount"
          value={selectedDiskCount}
          onChange={(e) => setSelectedDiskCount(+e.target.value)}
          min={1}
          max={100}
        />
        <p className="text-center">disk count: {selectedDiskCount}</p>
      </div>
      <div className="flex flex-col justify-between w-52 mx-auto mt-5">
        <input
          type="range"
          name="speed"
          value={speed}
          onChange={(e) => setSpeed(+e.target.value)}
          min={1}
          max={300}
        />
        <p className="text-center">speed: {speed}</p>
      </div>
    </main>
  );
};

export default HomeScreen;
