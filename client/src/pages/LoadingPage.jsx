import SyncLoader from 'react-spinners/SyncLoader';

function LoadingPage() {
  return (
    <div className="flex justify-center items-center h-[80vh] w-full bg-gray1">
      <SyncLoader color="#465955" />
    </div>
  );
}

export default LoadingPage;
