export default function Button({
  onClick,
  text,
  active,
  className,
}: {
  onClick: () => void;
  text: string;
  active?: boolean;
  className?: string;
}) {
  return (
    <button
      className={`hover:bg-stone-800/70 mt-4 py-1 rounded transition cursor-pointer text-sm ${
        active ? "bg-stone-100/30" : ""
      } ${className || ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
