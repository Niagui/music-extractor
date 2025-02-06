"use client";

import { useState, useEffect } from "react";
import Loading from "./Loading";
import Results from "./Results";
const axios = require('axios');
import Link from "next/link";

const MusicExtractor = () => 
{
  const [fileType, setFileType] = useState("youtube");  //default as youtube
  const [file, setFile] = useState("");
  const [extractAccompaniment, setExtractAccompaniment] = useState(false);
  const [hideMelody, setHideMelody] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensures this runs only on the client
  }, []);

  if (!isMounted) return null; // Prevents hydration errors



  //submit file
  const handleAnalyze = async () => {
    if (!file) 
    {
      alert("please enter a link!");
      return;
    }
    setIsLoading(true);

    try
    {

      // here is where all the extra options should go in
      const response = await axios.post("/api/analyze", 
      {
        fileType,
        file,
        extractAccompaniment,
      });

      setShowResults(true);
      console.log(response.data)
    }
    catch(err)
    {
      console.error("Error:", err);
    }
    finally
    {
      setIsLoading(false);
    }
    
    // setTimeout(() => 
    // {
    //   setIsLoading(false);
    //   setShowResults(true);
    // }, 3000);
  };

  const handleCancel = () => 
  {
    setIsLoading(false);
  };


  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen text-black">
      {!isLoading && !showResults && (
        <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
          <nav>
            <h1 className="text-2xl font-bold mb-2 text-center">Music Information Extractor</h1>
            
            {/* Description */}
            <p className="text-center mb-4">
              Welcome to the Music Information Extractor. Here you can extract the vocals of songs!
            </p>

            {/* Turotial */}
            <ul className="list-disc list-inside mb-4">
              <li>Find the YouTube link to a song you like</li>
              <li>Paste it into the text bar</li>
              <li>Select extra features you would like to include</li>
              <li>Press Analyze</li>
            </ul>

            {/* Input && Analyze Button Container */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Place the YouTube music video you want to analyze!"
                className="border p-2 flex-grow rounded-lg"
                value={file}
                onChange={(e) => setFile(e.target.value)}
              />

            {/* Analyze Button */}
              <button
                className="bg-blue-500 px-4 py-2 rounded-lg"
                onClick={handleAnalyze}
              >
                Analyze
              </button>
            </div>

            {/* Option bar && Help Container*/}
            <div className="flex justify-between items-center mb-4">

            {/* Option bar*/}
              <div className="flex gap-4">
                
                {/* Extract accompaniment */}
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={extractAccompaniment}
                    onChange={() => setExtractAccompaniment(!extractAccompaniment)}
                  />
                  Extract accompaniment
                </label>

              </div>

            {/* Help */}
              <button className="text-blue-500">Help</button>
            </div>

          </nav>
        </div>
      )}

      {isLoading && <Loading onCancel={handleCancel} />}
      {showResults && <Results result={showResults} />}
    </div>
  );
};

export default MusicExtractor;
