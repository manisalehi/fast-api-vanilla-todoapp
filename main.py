from fastapi import FastAPI
from pydantic import BaseModel
from fastapi import Body
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI();

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# fake database
tasks = []


# Template for tasks
class Task():

    def __init__(self ,name):
        self.id = len(tasks) 
        self.task_text = name

    def delete(self):
        tasks[self.id] = None
        

    def edit(self , task_text):
        tasks[self.id].task_text = task_text

class Post_task(BaseModel):
    task_text :str

class Put_task(BaseModel):
    id : int
    task_name : str

task1 = Task("HI")  

tasks.append(task1)

task3 = Task("HI")  

tasks.append(task3)

#GET ALL
@app.get("/get-all")
def get_all():
    return tasks
   

@app.delete("/delete/{id}")
def remove_one(id :int):
    if tasks[id] is not None:
        tasks[id].delete()
    return tasks
    
@app.post("/make-new")
def make_new(task_name : Post_task):
    new_task = Task(task_name.task_text)
    tasks.append(new_task)
    print(task_name)
    return tasks

@app.put("/make-change")
def make_change(task:Put_task):
    if task.id > len(tasks) -1 :
        return "NOT FOUND"
    else : 
        tasks[task.id].task_text = task.task_name
        print("OK")
        return tasks
