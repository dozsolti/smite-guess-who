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
      className="inline-flex flex-col items-center bg-gray-800 shadow-black shadow-md hover:shadow-lg hover:p-1 border border-gray-600 rounded w-full text-center hover:scale-120 transition-all hover:-translate-y-3 hover:cursor-pointer select-none"
      onClick={onClick}
    >
      <img
        src={god.image_url}
        alt={god.name}
        className="rounded w-full min-w-5 pointer-events-none select-none"
      />
      <p className="p-2 font-semibold wrap-break-word">{god.name}</p>
    </div>
  );
}
