import Avatar from './Avatar';
import './AvatarPicker.css';

const EMOJIS = ['😊', '🚀', '🐱', '🌟', '🎵', '🌻', '🍕', '📚', '🎨', '💡', '🌈', '🐼'];
const COLORS = ['#6366f1', '#ec4899', '#14b8a6', '#f97316', '#8b5cf6', '#06b6d4', '#84cc16', '#f43f5e'];

interface AvatarPickerProps {
  selectedEmoji: string;
  selectedColor: string;
  onSelect: (emoji: string, color: string) => void;
}

export default function AvatarPicker({ selectedEmoji, selectedColor, onSelect }: AvatarPickerProps) {
  return (
    <div className="avatar-picker">
      <div className="emoji-grid">
        {EMOJIS.map(emoji => (
          COLORS.map(color => (
            <button
              key={`${emoji}-${color}`}
              className={`avatar-option ${emoji === selectedEmoji && color === selectedColor ? 'avatar-option-selected' : ''}`}
              onClick={() => onSelect(emoji, color)}
            >
              <Avatar emoji={emoji} color={color} size={40} />
            </button>
          ))
        ))}
      </div>
    </div>
  );
}

export { EMOJIS, COLORS };
