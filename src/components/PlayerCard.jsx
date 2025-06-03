import defaultProfile from '../assets/defaultProfile.png';

export default function PlayerCard({ profilePic, username }) {
  const imageToShow = profilePic || defaultProfile;

  return (
    <div className="flex items-center gap-4 text-white p-2">
      <img
        src={imageToShow}
        alt={username + "'s profile"}
        className="h-12 w-12 rounded-full object-cover border border-white"
      />
      <span className="text-lg font-semibold">{username}</span>
    </div>
  );
}
