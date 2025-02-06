const Loading = ({ onCancel }: { onCancel: () => void }) => {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-50">
        <p className="text-white text-lg mb-4">Loading...</p>
        <p>p.s. the process usually takes about the same amount of time as the duration of the song!</p>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={onCancel}>
          Cancel
        </button>
      </div>
    );
  };
  
  export default Loading;
  