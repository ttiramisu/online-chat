from flask import Flask, render_template


app = Flask(__name__, static_folder='static', static_url_path='')

###############################
############ MAIN #############
###############################

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('index.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/chat')
def chat():
    return render_template('chat.html')

###############################
######## RUN TIME CODE ########
###############################
if __name__ == "__main__":
    app.run(debug=True)