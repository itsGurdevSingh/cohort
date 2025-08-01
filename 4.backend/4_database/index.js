const express = require("express")
const connectToDb = require('./src/db/db.js')
const notesModel = require('./src/models/notes.model.js');
const noteModel = require("./src/models/notes.model.js");


const app = express();
const port = 3000;

app.use(express.json());

app.get('/notes',async(req,res)=>{

    const notes = await notesModel.find()
    res.send(notes)
})

app.post('/notes/add',async(req,res)=>{
    const {title,content} = req.body;

    await notesModel.create({title,content})

    res.send('note added sucessfully')
})
app.delete('/notes/delete/:id',async(req,res)=>{
    const id = req.params.id;

    const note = await notesModel.findByIdAndDelete(id)

    res.send("note deleted sucessfully");
})
app.patch('/notes/update/:id',async(req,res)=>{
    const id = req.params.id;
    const {title} = req.body;

    await noteModel.findByIdAndUpdate(id,{title});

    res.send('note updated sucessfully');
})



connectToDb();
app.listen(port,()=>{
    console.log(`server is running on port: ${port}`)
})
 