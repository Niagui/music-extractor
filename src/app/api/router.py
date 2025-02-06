import zmq
import os
import shutil
from ytb import get_ytb
from split import split_vocal

context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://localhost:5555")

FILEDIR = 'music-extractor/src/app/files/mdx_extra/sourceAudio'
PUBDIR = 'music-extractor/public/audioFiles'

while True:
    try:
        print("waiting for message")
        message = socket.recv_json()
        print("received: ", message)

        #option poll
        if message["fileType"] == "youtube":
            get_ytb(message["file"])
        
        #processing
        split_vocal(['sourceAudio.mp3'])

        audioFiles = []
        for file in os.listdir(FILEDIR):
            if file.endswith('.mp3'):
                audioFiles.append(file)
                shutil.move(os.path.join(FILEDIR, file), os.path.join(PUBDIR, file))

        response = {'audioFiles': audioFiles}
        print("responding: ", response)
        socket.send_json(response)


    except zmq.error.ZMQError as err:
        print(err)

    