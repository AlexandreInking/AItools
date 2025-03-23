import json
import os

script_dir = os.path.dirname(__file__)
FAVORITES_FILE = os.path.join(os.path.dirname(script_dir), 'favorites.json')

def loadFavorites():
    if os.path.exists(FAVORITES_FILE):
        with open(FAVORITES_FILE, 'r') as file:
            return json.load(file)
    return []

def saveFavorites(favorites):
    with open(FAVORITES_FILE, 'w') as file:
        json.dump(favorites, file)

def addFavorite(toolId):
    favorites = loadFavorites()
    if toolId not in favorites:
        favorites.append(toolId)
        saveFavorites(favorites)

def removeFavorite(toolId):
    favorites = loadFavorites()
    if toolId in favorites:
        favorites.remove(toolId)
        saveFavorites(favorites)