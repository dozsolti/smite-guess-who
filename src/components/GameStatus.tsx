import gods from '../gods.json';
import { useGod } from '../store';

export default function GameStatus() {
  const { choosenGod: selectedGod } = useGod();

  if (selectedGod) {
    const god = gods.find((g) => g.name === selectedGod.name);
    return (
      <div className="flex md:flex-row flex-col justify-center items-center gap-2 md:gap-4 md:text-left text-center">
        <img
          src={god?.image_url}
          alt={god?.name}
          className="rounded w-16 h-16"
        />
        <p>
          You have selected
          <br />
          <span className="font-bold text-xl">{selectedGod.name}</span>
        </p>
      </div>
    );
  } else {
    return (
      <div className="animate-bounce">
        <p className="text-center italic">Select your god.</p>
      </div>
    );
  }
}
