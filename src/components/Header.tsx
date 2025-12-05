import { useGod } from '../store';
import GameStatus from './GameStatus';

export default function Header() {
  const { choosenGod, restart } = useGod();

  return (
    <header className="justify-center items-center grid grid-cols-2 md:grid-cols-3 bg-gray-800 shadow p-2 text-white">
      <div className="">
        <h1 className="text-xl md:text-3xl">
          <span className="text-orange-300">Smite 2</span> Guess Who
        </h1>
        <p className="text-stone-400 italic">Play it while in queue.</p>
        {choosenGod && (
          <div className="md:hidden block mt-2">
            <button
              className="md:float-right float-left hover:bg-orange-300 px-4 py-2 rounded text-orange-300 hover:text-black cursor-pointer"
              onClick={restart}
            >
              New game
            </button>
          </div>
        )}
      </div>
      <div className="">
        <GameStatus />
      </div>
      {choosenGod && (
        <div className="hidden md:block">
          <button
            className="md:float-right float-left hover:bg-orange-300 px-4 py-2 rounded text-orange-300 hover:text-black cursor-pointer"
            onClick={restart}
          >
            New game
          </button>
        </div>
      )}
    </header>
  );
}
