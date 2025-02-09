const Results = ({ audioFiles }: {
    audioFiles: string[], 
  }) => {


  console.log("Audio files received:", audioFiles);
  const isEmpty = audioFiles.length === 0;
  const FOLDER = 'audioFiles/'
  const vocalsFile = audioFiles.find(file => file === 'vocals.mp3')
  const accompanimentFile = audioFiles.find(file => file === 'no_vocals.mp3')

  console.log(vocalsFile, accompanimentFile);
  
  return (
    <div>
        {!isEmpty ? (

            <div>
                <h2 className="">Here's an analysis of your song:</h2>
                <br></br>

                {/* vocal */}
                {vocalsFile && (
                    <div>
                        <p>Vocals</p>
                        <audio controls>
                            <source src={FOLDER + vocalsFile} type="audio/mp3" />
                        </audio>
                    </div>
                )}

                {/* extract Accompaniment */}
                {accompanimentFile && (
                    <div>
                        <p>Accompaniment</p>
                        <audio controls>
                            <source src={FOLDER + accompanimentFile} type="audio/mp3" />
                        </audio>
                    </div>
                )}
                
            </div>
            ) : null
        };
    </div>
  );
};

export default Results;
  