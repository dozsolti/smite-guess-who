import { useRef } from "react";

export type Toggle3Value = "left" | "middle" | "right";

type Toggle3Props = {
  value: Toggle3Value;
  onChange: (value: Toggle3Value) => void;
  leftLabel: string;
  rightLabel: string;
};

const values: Toggle3Value[] = ["left", "middle", "right"];

export function Toggle3({
  value,
  onChange,
  leftLabel,
  rightLabel,
}: Toggle3Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const valueIndex = values.indexOf(value);

  const selectValueAtPointer = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return;

    const bounds = track.getBoundingClientRect();
    const relativePosition = Math.min(
      1,
      Math.max(0, (clientX - bounds.left) / bounds.width),
    );
    const nextIndex = Math.round(relativePosition * 2);
    const nextValue = values[nextIndex];

    if (nextValue !== value) {
      onChange(nextValue);
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    selectValueAtPointer(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      selectValueAtPointer(event.clientX);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    let nextIndex = valueIndex;

    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      nextIndex = Math.max(0, valueIndex - 1);
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      nextIndex = Math.min(2, valueIndex + 1);
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = 2;
    } else {
      return;
    }

    event.preventDefault();

    if (nextIndex !== valueIndex) {
      onChange(values[nextIndex]);
    }
  };

  return (
    <div className="w-full">
      <div
        aria-label="Toggle selection"
        aria-valuemax={2}
        aria-valuemin={0}
        aria-valuenow={valueIndex}
        aria-valuetext={
          value === "left"
            ? leftLabel
            : value === "middle"
              ? "none"
              : rightLabel
        }
        className="relative p-1 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 h-11 touch-none cursor-grab active:cursor-grabbing select-none"
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        ref={trackRef}
        role="slider"
        tabIndex={0}
      >
        <div className="top-3/12 z-10 absolute place-items-center grid grid-cols-3 w-full font-medium text-sm pointer-events-none">
          <span
            className={`${value === "left" ? "text-white" : "text-slate-400 "}`}
          >
            {leftLabel}
          </span>
          <span className="opacity-50 font-thin italic">
            {value === "middle" ? "choose" : ""}
          </span>
          <span
            className={`${value === "right" ? "text-white" : "text-slate-400"}`}
          >
            {rightLabel}
          </span>
        </div>

        <div
          aria-hidden="true"
          className="top-2/12 absolute bg-slate-500 shadow-sm rounded-lg w-1/3 h-8/12 transition-transform duration-150 ease-out pointer-events-none"
          style={{ transform: `translateX(${valueIndex * 100}%)` }}
        />
      </div>
    </div>
  );
}
