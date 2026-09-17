// src/components/ProgressBar.tsx
export default function ProgressBar({
  value,
  color,
  small,
  light,
}: {
  value: number;
  color: string;
  small?: boolean;
  light?: boolean;
}) {
  return (
    <div
      className={`w-full overflow-hidden rounded-full ${light ? "bg-black/10" : "bg-white/10"} ${
        small ? "h-2" : "h-3"
      }`}
    >
      <div
        className="bar-glow h-full rounded-full transition-all duration-700"
        style={{
          width: `${value}%`,
          background: `linear-gradient(90deg, ${color}66, ${color})`,
        }}
      />
    </div>
  );
}