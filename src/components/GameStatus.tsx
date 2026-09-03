import { useGod } from "../store";
import { useEffect, useState } from "react";

export default function GameStatus() {
  const { choosenGod: selectedGod, pickRandomGod } = useGod();
  const [isReRandomVisible, setIsReRandomVisible] = useState(false);

  useEffect(() => {
    if (selectedGod?.name) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsReRandomVisible(true);
      const timer = setTimeout(() => {
        setIsReRandomVisible(false);
      }, 1000 * 5);
      return () => clearTimeout(timer);
    } else {
      setIsReRandomVisible(false);
    }
  }, [selectedGod?.name, pickRandomGod]);

  if (selectedGod) {
    return (
      <div className="flex md:flex-row flex-col justify-center items-center gap-2 md:gap-4 md:text-left text-center">
        <img
          src={selectedGod.image_url}
          alt={selectedGod.name}
          className="rounded w-16 h-16"
        />
        <p>
          <span className="font-bold text-xl">{selectedGod.name}</span>
          {isReRandomVisible && (
            <span
              className="ml-2 underline cursor-pointer"
              onClick={pickRandomGod}
            >
              rnd
            </span>
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="">
      <p className="text-center italic">
        <span className="animate-bounce">Select your god </span>
        or pick{" "}
        <span className="underline cursor-pointer" onClick={pickRandomGod}>
          random.
        </span>
      </p>
    </div>
  );
}
