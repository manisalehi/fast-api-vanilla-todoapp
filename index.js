// Getting the elements
input_field = document.getElementById("input_filed_text")
add_btn = document.getElementById("add_btn")
list_con = document.getElementById("list_con")

let edit = false
let edit_item 
let tasks_g 
//onClickADD
function add_btn_clicked(){
    if(!edit){
        if(input_field.value == ""){
            alert("Please enter something!")
        }else{
            add_to_the_list(input_field.value)
        }
    }else{
        
        if(input_field.value == "" || input_field.value === tasks_g[edit_item].task_text){
            alert("Please enter something!")
        }
        else{
            edit_task(edit_item , input_field.value)
        }
    }
    
}

//onEditButton
function edit_btn_clicked(id) { 
    console.log(tasks_g[id].task_text)
    input_field.value = tasks_g[id].task_text
    add_btn.innerText = "Apply"
    edit_item = id
    edit = true
}

//Renderer
const generator = (tasks)=>{
    tasks.map((task)=>{
        if(task != null){
            console.log(task.id)
        console.log(task)
        console.log(list_con)
        let node = document.createElement("li")
        node.classList.add("m-2" , "flex" , "border-2" , "border-grey-100" , "rounded-xl")
        node.innerHTML =  `<div class="flex-1 ">${task.task_text}</div> <button class="flex-2 mr-1 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded-full" onClick="task_done(${task.id})">🗑️</button> <button onClick="edit_btn_clicked(${task.id})" class="flex-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded-full">✏️</button>`
        list_con.appendChild(node)
    
    }
    })
}

//Get_all
async function get_all(){
    let tasks =[]
    const response = await fetch("http://127.0.0.1:8000/get-all",{
        method: "GET",
    }).then((response)=>{
        return response.json()
    }).then((data)=>{
        tasks_g = data;
        generator(data)
    })

}

//PUT
async function edit_task(id_fun , new_task_name_fun){

    const response = await fetch("http://127.0.0.1:8000/make-change"  , {
        method : "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({ 
            "task_name" : new_task_name_fun,
            "id" : id_fun
        })
    } ).then((response)=>{
        return response.json()
    }).then((data)=>{
        window.location.reload();
    })
}

//POST
async function add_to_the_list(new_task_name){

    const response = await fetch("http://127.0.0.1:8000/make-new" , {
        method:  "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({"task_text" : new_task_name})
    }).then((response)=>{
        return response.json()
    }).then((data)=>{
        window.location.reload();
    })
}

async function task_done(id) {
    
    const response = await fetch("http://127.0.0.1:8000/delete/" + id.toString() ,{
        method: "DELETE",
        headers:{
            "Content-type" : "application/json"
        }
    }).then((response)=>{
        return response.json()
    }).then((data)=>{
        window.location.reload();
    })
}

get_all()

