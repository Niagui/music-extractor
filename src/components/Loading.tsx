import React, { useState } from "react";
import LoadingWarn from "./LoadingWarn";

const Loading = ({ onCancel }: { onCancel: () => void }) => {

    const [showWarning, setShowWarning] = useState(false);
    const showWarn = () => setShowWarning(true);
    const hideWarn = () => setShowWarning(false);

    const cancel = () => {
      hideWarn();
      onCancel();
    };

    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-200 bg-opacity-50">
        <p className="text-black text-lg mb-4">Loading...</p>
        <p>p.s. the process usually takes about the same amount of time as the duration of the song!</p>

        <div className="">
          <button className="bg-red-500 px-4 py-2 rounded-lg" onClick={showWarn}>
            Cancel
          </button>

          {showWarning && <LoadingWarn cancel={cancel} hideWarn={hideWarn} />}
        </div>
      </div>
    );
  };
  
  export default Loading;
  