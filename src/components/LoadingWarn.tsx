const LoadingWarn = ({ cancel, hideWarn }: { cancel: () => void, hideWarn: () => void }) => 
    {
      return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            
          <div className="bg-white p-6 rounded-md shadow-lg text-center">

            <p className="mb-4">
              Warning: <br />
              Canceling now will lose all the ex
              traction progress.
            </p>

            <div className="flex justify-center gap-4">

              <button className="px-4 py-2 border border-black rounded" onClick={hideWarn}>
                Back
              </button>

              <button className="px-4 py-2 bg-red-600 text-white rounded"  onClick={cancel} >
                Cancel
              </button>

            </div>

          </div>
        </div>
      );
    }

    export default LoadingWarn