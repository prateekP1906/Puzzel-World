from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
import nltk
from nltk.corpus import wordnet

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📌 Filtered word list
def get_words_by_length(min_len=4, max_len=8):
    words = set()
    for syn in wordnet.all_synsets():
        for lemma in syn.lemmas():
            word = lemma.name().lower()
            if word.isalpha() and min_len <= len(word) <= max_len:
                words.add(word)
    return list(words)

all_words = get_words_by_length()

# 📌 Scrambler
def scramble_word(word):
    word = list(word)
    while True:
        random.shuffle(word)
        scrambled = ''.join(word)
        if scrambled != ''.join(word):  # Make sure it's not the same
            return scrambled

@app.get("/get-puzzle/")
def get_puzzle():
    word = random.choice(all_words)
    scrambled = scramble_word(word)
    return {
        "scrambled_word": scrambled,
        "word_length": len(word)
    }
