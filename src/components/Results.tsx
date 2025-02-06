const Results = ({ result }: { result: any }) => {
    return (
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">{result.message}</h2>
        <div className="flex justify-end">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Download</button>
        </div>
      </div>
    );
  };
  
  export default Results;
  