import './Avatar.css';

interface AvatarProps {
  emoji: string;
  color: string;
  size?: number;
}

export default function Avatar({ emoji, color, size = 48 }: AvatarProps) {
  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: size * 0.55,
      }}
    >
      {emoji}
    </div>
  );
}
