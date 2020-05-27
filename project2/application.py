import os
import requests

from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit
users=[]
msg=[]
app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

@app.route("/")
def index():

    return render_template("index.html",users=users,msg=msg)

@socketio.on("submit user")
def vote(data):
    users = data["users"]
    emit("announce user", {"users": users}, broadcast=True)
@socketio.on("submit msg")
def submitmsg(data):
    msg = data["msg"]
    emit("announce msg", {"msg": msg}, broadcast=True)
