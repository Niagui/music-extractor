# @inproceedings{rouard2022hybrid,
#   title={Hybrid Transformers for Music Source Separation},
#   author={Rouard, Simon and Massa, Francisco and D{\'e}fossez, Alexandre},
#   booktitle={ICASSP 23},
#   year={2023}
# }

import demucs
import demucs.separate
import subprocess
from os import path

demucs_process = None

FILEDIR = 'music-extractor/src/app/files/'

def split_vocal(commands: list):

    global demucs_process
    filename = path.join(FILEDIR, commands[0])
    args = [
        "demucs",
        "--mp3",
        "--two-stems", "vocals",
        "-o", FILEDIR,
        "-n", "mdx_extra",
        filename
    ]
    demucs_process = subprocess.Popen(args)
    return demucs_process
