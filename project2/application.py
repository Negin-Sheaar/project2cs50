
import os
from flask import Flask, render_template, jsonify, url_for, session, redirect
from flask_socketio import SocketIO, emit, send
from collections import defaultdict

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)
users=[]
@app.route("/")
def index():
	return render_template("index.html", users=users)

@socketio.on("login")
def login(data):
     users.append(data["users"])
     emit("loadMsgPage", {"users":users} ,broadcast=True)
