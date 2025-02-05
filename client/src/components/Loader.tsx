import { LoaderCircle } from 'lucide-react';

function Loader() {
  return (
    <div className="h-screen z-50 w-full flex justify-center items-center">
      <LoaderCircle size="48px" />
    </div>
  );
}
export default Loader;
