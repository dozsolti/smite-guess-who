import gods from '../data/gods.json';
import { useGod } from '../store';
import GodCard from './GodCard';

export default function Grid() {
  const { hiddenGods, choosenGod, setChoosenGod, toggleHiddenGod } = useGod();

  return (
    <div className="gap-5 grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 mx-auto p-4 cursor-pointer container">
      {gods.map((god) => (
        <div
          key={god.name}
          className={hiddenGods.includes(god) ? "opacity-10" : ""}
        >
          <GodCard
            god={god}
            onClick={() => {
              if (choosenGod) {
                toggleHiddenGod(god);
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setChoosenGod(god);
              }
            }}
          />
        </div>
      ))}
    </div>
  );
}
