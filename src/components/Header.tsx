import { resetGame, useGod } from "../store";
import GameStatus from "./GameStatus";

function NewGameButton({ className }: { className?: string }) {
  return (
    <div className={className}>
      <button
        className="md:float-right float-left hover:bg-orange-300 px-4 py-2 rounded text-orange-300 hover:text-black cursor-pointer"
        onClick={resetGame}
      >
        New game
      </button>
    </div>
  );
}

export default function Header() {
  const { choosenGod } = useGod();

  return (
    <header className="justify-center items-center grid grid-cols-2 md:grid-cols-3 bg-gray-800 shadow p-2 text-white">
      <div className="">
        <h1 className="text-xl md:text-3xl">
          <span className="text-orange-300">Smite 2</span> Guess Who
        </h1>
        <p className="text-stone-400 italic">Play it while in queue.</p>
        {choosenGod && <NewGameButton className="md:hidden block mt-2" />}
      </div>
      <div className="">
        <GameStatus />
      </div>
      {choosenGod && <NewGameButton className="hidden md:block" />}
    </header>
  );
}
