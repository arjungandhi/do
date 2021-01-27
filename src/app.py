from flask import Flask, render_template, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

tasks = []




@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/next-task', methods=['GET'])
def next_task():
    return 'hallo i am a task you need to do'

@app.route('/add-task', methods=['POST'])
def add_task():
    if request.method == 'POST':
        data=request.form
        print(data)



def load_tasks():
    file= open('tasks.json','r')
    global tasks
    tasks = json.loads(file.read())
    file.close()
    return tasks

def save_tasks():
    file= open('tasks.json', 'w')
    global tasks
    file.write(json.dumps(tasks))
    file.close()