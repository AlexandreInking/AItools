import webview
import os
import time
from utils import favoritesManager
from tools import tempTool, wordCounter, localResearch, summarizer

def getTools():
    tools = [
        {'id': 'temp', 'name': 'Template Tool', 'description': 'This is just a template.', 'isFavorite': False},
        {'id': 'wordCounter', 'name': 'Contador de...', 'description': 'Cuenta palabras, párrafos, caracteres y caracteres sin espacios.', 'isFavorite': False},
        {'id': 'localResearch', 'name': 'Local Research', 'description': 'Realiza búsquedas locales y genera informes (simulado).', 'isFavorite': False},
        {'id': 'summarizer', 'name': 'Summarizer', 'description': 'Resume un texto de entrada.', 'isFavorite': False},
    ]
    favorites = favoritesManager.loadFavorites()
    for tool in tools:
        tool['isFavorite'] = tool['id'] in favorites
    favoriteTools = [tool for tool in tools if tool['isFavorite']]
    nonFavoriteTools = [tool for tool in tools if not tool['isFavorite']]
    return favoriteTools + nonFavoriteTools

class Api:
    def __init__(self):
        self.current_tool_window = None
        self.tools = getTools() # Get tools once, at the start

    def getTools(self):
        return self.tools  # Return the stored tools

    def markFavorite(self, toolId):
        favoritesManager.addFavorite(toolId)
        # Update the tools list after marking as favorite
        self.tools = getTools()
        if self.current_tool_window: # If the main window is open
           webview.windows[0].evaluate_js(f'renderTools({json.dumps(self.tools)})')


    def unmarkFavorite(self, toolId):
        favoritesManager.removeFavorite(toolId)
        # Update the tools list after unmarking
        self.tools = getTools()
        if self.current_tool_window:
            webview.windows[0].evaluate_js(f'renderTools({json.dumps(self.tools)})')


    def openTool(self, toolId):
        if self.current_tool_window:
            self.current_tool_window.destroy()

        script_dir = os.path.dirname(__file__)
        if toolId == 'wordCounter':
            html_path = os.path.join(script_dir, 'ui', 'wordCounter.html')
            self.current_tool_window = webview.create_window("Word Counter", html_path, js_api=self, width=800, height=600)
        elif toolId == 'localResearch':
            html_path = os.path.join(script_dir, 'ui', 'localResearch.html')
            self.current_tool_window = webview.create_window("Local Research", html_path, js_api=self, width=800, height=600)
        elif toolId == 'summarizer':
            html_path = os.path.join(script_dir, 'ui', 'summarizer.html')
            self.current_tool_window = webview.create_window("Summarizer", html_path, js_api=self, width=800, height=600)
        else:
            print("Tool not found or no specific UI")



    def get_word_count(self, text):
        words = len(text.split())
        paragraphs = text.count('\n\n') + 1
        characters = len(text)
        characters_no_spaces = len(text.replace(" ", "").replace("\n", ""))
        return {'words': words, 'paragraphs': paragraphs, 'characters': characters, 'characters_no_spaces': characters_no_spaces}

    async def get_local_research_updates(self):
        yield "Browsing online..."
        await time.sleep(2)
        yield "Generating report..."
        await time.sleep(2)
        yield "Successful"

    def summarize_text(self, text):
        sentences = text.split('.')
        if len(sentences) > 3:
            return '. '.join(sentences[:3]) + '.'
        else:
            return text

api = Api()
script_dir = os.path.dirname(__file__)
html_path = os.path.join(script_dir, 'ui', 'index.html')
window = webview.create_window('Local Toolbox', html_path, js_api=api, width=1600, height=900)
webview.start()