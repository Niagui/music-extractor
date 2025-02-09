"use client";

import { useState, useEffect } from "react";
import Loading from "./Loading";
import Results from "./Results";
import HelpPage from "./HelpPage";

const axios = require('axios');

const MusicExtractor = () => 
{
  const [isMounted, setIsMounted] = useState(true);

  const [fileType, setFileType] = useState("youtube");  //default as youtube
  const [file, setFile] = useState(""); //input audio file
  const [audioFiles, setAudioFiles] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showHelpPage, setShowHelpPage] = useState(false);
  
  //options
  const [ifVocal, setIfVocal] = useState(true)
  const [extractAccompaniment, setExtractAccompaniment] = useState(false);

  if (!isMounted) return null; // Prevents hydration errors


  //submit file
  const handleAnalyze = async () => {

    //error checking stage
    if (!file) 
    {
      alert("please enter a link!");
      return;
    }
    if (fileType == 'youtube' && !file.startsWith('https://www.youtube.com/'))
    {
      alert("Not a youtube link! Please reenter");
      return;
    }

    setIsLoading(true);

    try
    {
      // here is where all the extra options should go in
      const result = await axios.post("/api/analyze", 
      {
        fileType,
        file,
        extractAccompaniment,
      });
      
      setAudioFiles(result.data.audioFiles)
      console.log(result.data);      
      setShowResults(true)
    }
    catch(err)
    {
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => 
  {
    try
    {
      setIsLoading(false);
      await axios.post("/api/cancel")
    }
    catch(err)
    {
      console.error("Error:", err);
    }
  };

  const handleBack = () => 
  {
    try{
      setShowHelpPage(false)
    }catch(err){
      console.error(err)
    }
  }


  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen text-black">
      {!isLoading && !showHelpPage && (
        <div className="h-auto w-auto bg-white p-6 rounded-lg shadow-md">
          <nav>
            <h1 className="text-2xl font-bold mb-2 text-center">Music Information Extractor</h1>

            {/* Main help button */}
            <div className = 'flex flex-col items-center' >
              <button className="text-center text-blue-500" onClick={() => setShowHelpPage(true)}>Help</button>
            </div>

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
                placeholder="Enter the YouTube music video link that you want to analyze!"
                className="border p-2 flex-grow rounded-lg"
                value={file}
                onChange={(e) => setFile(e.target.value)}
              />

            {/* Analyze Button */}
              <button
                className="bg-green-500 px-4 py-2 rounded-lg"
                onClick={handleAnalyze}
              >
                Analyze
              </button>
            </div>

            {/* Option bar && Help Container*/}
            <div className="flex justify-between items-center mb-4">

            {/* Option bar*/}
              <div className="flex flex-col gap-4 bg-gray-200 p-2 rounded-md">
                
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
              <button className="text-blue-500" onClick={() => setShowHelpPage(true)}>What are these options?</button>
            </div>

          </nav>
          {showResults && <Results audioFiles={audioFiles}/>}
        </div>
      )}

      {isLoading && <Loading onCancel={handleCancel} />}
      {showHelpPage && <HelpPage onBack = {handleBack}/>}

    </div>
  );
};

export default MusicExtractor;
