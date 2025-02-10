import zmq
import os
import shutil
import json
from ytb import get_ytb
from split import split_vocal


PORT1 = "tcp://localhost:5555"
PORT2 = "tcp://localhost:5556"

#for requests
context = zmq.Context()
commSocket = context.socket(zmq.ROUTER)
commSocket.bind(PORT1)

#for cancels
cancelSocket = context.socket(zmq.PULL)
cancelSocket.bind(PORT2)

FILEDIR = 'music-extractor/src/app/files/mdx_extra/sourceAudio'
PUBDIR = 'music-extractor/public/audioFiles'
DEMUC_PROCESS = None

poller = zmq.Poller()
poller.register(commSocket, zmq.POLLIN)
poller.register(cancelSocket, zmq.POLLIN)

while True:
    try:
        print("waiting for message")
        sockets = dict(poller.poll())       #wait for initial socket

        #use 2 sockets to handle the cancelation of the subprocess
        if commSocket in sockets:
            id, _, message = commSocket.recv_multipart()
            message = json.loads(message.decode('utf-8'))
            print("received: ", message)

            #handle options
            if message["fileType"] == "youtube":
                get_ytb(message["file"])

            #processing
            DEMUC_PROCESS = split_vocal(['sourceAudio.mp3'])

        #cancel process
        while DEMUC_PROCESS and DEMUC_PROCESS.poll() is None:
            sockets = dict(poller.poll(100))
            if cancelSocket in sockets:
                cancelation = cancelSocket.recv_json()
                if cancelation["command"] == "cancel" and DEMUC_PROCESS:      #make sure no gap in between    
                    DEMUC_PROCESS.terminate()
                    DEMUC_PROCESS.wait()
                    cancelMsg = {'status': 'canceled', 'audioFiles': []}
                    commSocket.send_multipart([id, b'', json.dumps(cancelMsg).encode()])
                    print("Process canceled successfully")
                    print(DEMUC_PROCESS)
                    print(DEMUC_PROCESS.poll())
                    break


        if DEMUC_PROCESS and DEMUC_PROCESS.poll() is not None:

            #option for extract Accomp
            if message["extractAccompaniment"] is False:
                remover = os.path.join(FILEDIR, "no_vocals.mp3")
                if os.path.exists(remover):
                    os.remove(remover)

            #clear public directory for next song
            for f in os.listdir(PUBDIR):
                if os.path.exists(f):
                    os.remove(f)
                
            #handle files movement
            audioFiles = []
            print("moving files to public")
            for file in os.listdir(FILEDIR):
                if file.endswith('.mp3'):
                    shutil.move(os.path.join(FILEDIR, file), os.path.join(PUBDIR, file))
                    audioFiles.append(file)

            #send back
            response = {'status': 'ok', 'audioFiles': audioFiles}
            print("responding: ", response)
            commSocket.send_multipart([id, b'', json.dumps(response).encode()])
            DEMUC_PROCESS = None

    except zmq.error.ZMQError as err:
        print(err)
    

    