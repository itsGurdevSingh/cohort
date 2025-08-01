const express = require("express");

const app = express();

app.use(express.json())

let notes = []


app.get('/notes', (req, res) => {
    res.send(notes)
})

app.post('/notes/add', (req, res) => {

    const note = req.body;

    notes.push(note);
    res.send('note added sucessfully')

})
app.delete('/notes/delete/:id', (req, res) => {

    const id = Number(req.params.id);
    const originalLength = notes.length;


    notes = notes.filter(note => note.id !== id)

    if(originalLength > notes.length) res.send('note deleted sucessfully')
    else res.status(404).send({message:'id not found'})
})
app.patch('/notes/update/:id', (req, res) => {
    const id = Number(req.params.id);
    const { title } = req.body;
    let idFound = true;


    notes.forEach(note => {
        if (note.id === id) note.title = title
        else idFound = false

    })

    if (idFound) res.send('note updated sucessfuly')
    else res.send({ message: 'id not found' })
})


const port = 3000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})