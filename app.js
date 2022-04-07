const express = require('express');
const app = express();
const axios = require('axios')

// middleware
const getTodo= async()=>{
    try{
        const {data} = await axios.get('https://jsonplaceholder.typicode.com/todos')
        return data;
    }catch(error){
        console.log(error);
    }
}

// routes

app.get("/todos", async(req, res)=>{

    const data = await getTodo();

    data.forEach(element => {
        delete element.userId;
    });

    res.status(200).json({
        data:data
    })
})

app.get("/user/:id", async(req, res)=>{

    const filteredTodo=[];

    const {data} = await axios.get(`https://jsonplaceholder.typicode.com/users/${req.params.id}`)

    const todo = await getTodo();

    todo.forEach(element => {
        if(element.userId === data.id){
            filteredTodo.push(element);
        }
    })

    data.todo = filteredTodo;
    
    res.status(200).json({
        data:data
    })
})

// listener
app.listen(4000, ()=>{
    console.log('Server started on http://localhost:4000');
})