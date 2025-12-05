import allGods from '../gods.json';
import { useGod } from '../store';
import GodCard from './GodCard';

export default function Grid() {
  const { hiddenGods, choosenGod, setChoosenGod, toggleHiddenGod } = useGod();

  const gods = allGods.sort((a, b) => {
    if (hiddenGods.has(a.name) && !hiddenGods.has(b.name)) {
      return 1;
    }
    if (!hiddenGods.has(a.name) && hiddenGods.has(b.name)) {
      return -1;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="gap-2 md:gap-4 grid grid-cols-4 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-11 mx-auto mt-2 md:mt-0 px-4 xl:px-0 cursor-pointer container">
      <div className='col-span-full'/>
      {gods.map((god) => (
        <div
          key={god.name}
          className={hiddenGods.has(god.name) ? "opacity-10 is-hidden" : ""}
        >
          <GodCard
            god={god}
            onClick={() => {
              if (choosenGod) {
                toggleHiddenGod(god);
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setChoosenGod(god);
              }
            }}
          />
        </div>
      ))}
    </div>
  );
}
