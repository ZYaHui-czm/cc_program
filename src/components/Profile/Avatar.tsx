import './Avatar.css';

interface AvatarProps {
  photo: string;
  size?: number;
}

export default function Avatar({ photo, size = 48 }: AvatarProps) {
  const style = {
    width: size,
    height: size,
  };

  return (
    <div className="avatar" style={style}>
      {photo ? (
        <img className="avatar-img" src={photo} alt="" />
      ) : (
        <span className="avatar-placeholder" style={{ fontSize: size * 0.5 }}>
          👤
        </span>
      )}
    </div>
  );
}
