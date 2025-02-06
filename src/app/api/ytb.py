from pytubefix import YouTube

def get_ytb(url: str):
    yt = YouTube(url)
    audio = yt.streams.filter(only_audio=True, ).first()
    audio.download(output_path='music-extractor/src/app/files', filename= 'sourceAudio.mp3')
    return



