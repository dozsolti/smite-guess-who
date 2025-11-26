import { useGod } from '../store';
import GameStatus from './GameStatus';

export default function Header() {
  const { restart } = useGod();

  return (
    <header className="justify-center items-center grid grid-cols-2 md:grid-cols-3 bg-gray-800 shadow p-4 text-white">
      <div className="order-first">
        <h1 className="text-xl md:text-3xl">
          <span className="text-orange-300">Smite 2</span> Guess Who
        </h1>
        <p className="text-stone-400 italic">Play it while in queue.</p>
      </div>
      <div className="col-span-2 md:col-span-1 mt-4 md:mt-0">
        <GameStatus />
      </div>
      <div className="order-first md:order-1">
        <button
          className="float-right hover:bg-orange-300 px-4 py-2 rounded text-orange-300 hover:text-black cursor-pointer"
          onClick={restart}
        >
          New game
        </button>
      </div>
    </header>
  );
}
