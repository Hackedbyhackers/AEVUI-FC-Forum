// components/UserAvatar.jsx
export default function Avatar({ user }) {
  return (
    <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-lg animate-pulse">
      <img
        src={user.photoURL}
        alt={user.displayName}
        className="w-full h-full object-cover border-2 border-blue-500 shadow-md"
      />
      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-ping"></span>
    </div>
  );
}