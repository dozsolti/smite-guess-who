import type { God } from '../types';

export default function GodCard({
  god,
  onClick,
}: {
  god: God;
  onClick: () => void;
}) {
  return (
    <div
      className="inline-flex relative flex-col items-center bg-gray-800 shadow-black shadow-md hover:shadow-lg hover:p-1 border border-gray-500 rounded w-full text-center hover:scale-120 transition-all hover:-translate-y-3 hover:cursor-pointer select-none"
      onClick={onClick}
    >
      <img
        src={god.image_url}
        alt={god.name}
        className="mb-1 rounded w-full pointer-events-none select-none"
      />
      <div className="right-0 bottom-0 left-0 absolute bg-linear-to-t from-black to-transparent rounded-b">
        <p className="p-2 font-semibold md:text-md text-xs">{god.name}</p>
      </div>
    </div>
  );
}
