import { useLoader } from '../context/LoaderContext';

export default function GlobalLoader() {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <video
        src="/loading&redirect.mp4"
        autoPlay
        muted
        loop
        className="w-3/4 max-w-xl"
      />
    </div>
  );
}
