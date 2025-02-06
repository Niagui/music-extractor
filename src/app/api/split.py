# @inproceedings{rouard2022hybrid,
#   title={Hybrid Transformers for Music Source Separation},
#   author={Rouard, Simon and Massa, Francisco and D{\'e}fossez, Alexandre},
#   booktitle={ICASSP 23},
#   year={2023}
# }

import demucs
import demucs.separate
from os import path

FILEDIR = 'music-extractor/src/app/files/'

def split_vocal(commands: list):

    separator = demucs.separate
    filename = path.join(FILEDIR, commands[0])
    separator.main(["--mp3", "--two-stems", "vocals", "-o", FILEDIR, "-n", "mdx_extra", filename])