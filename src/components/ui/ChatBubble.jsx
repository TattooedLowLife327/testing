import defaultProfile from '../assets/defaultProfile.png';

export default function ChatBubble({ profilePic, username, message }) {
  const imageToShow = profilePic || defaultProfile;

  return (
    <div className="flex items-start gap-3 text-white p-2">
      <img
        src={imageToShow}
        alt={username + "'s profile"}
        className="h-10 w-10 rounded-full object-cover border border-gray-600"
      />
      <div>
        <div className="text-sm font-bold">{username}</div>
        <div className="text-sm">{message}</div>
      </div>
    </div>
  );
}
