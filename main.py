from flask import Flask

app = Flask(__name__)

@app.route('/')

def display_words():

    try:
        with open('data.txt', 'r') as file:
            words = file.read().splitlines()
        words_html = '<br>'.join(words)
        return f"<h1>Words stored in data.txt:</h1><p>{words_html}</p>"
    
    except FileNotFoundError:
        return "File 'data.txt' not found."

if __name__ == '__main__':
    app.run(debug=True)
