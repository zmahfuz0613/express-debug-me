const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3000

const app = express()

app.use(bodyParser.json())
app.use(logger('dev'))

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
})

const users =
    [
        {
            id: "32e3ee5c-98dc-62a6-b284-0da231e3abb6",
            username: "joe.e",
            email: "joey@gmail.com",
            password_digest: "OiJDs2sEycZEdkjdkhjsCHhQdJ8T9Lt2ns",
            admin: true
        }, {
            id: "44b5fe5c-98dc-62a6-b284-0da231e3abb6",
            username: "so.fia",
            email: "sophia@gmail.com",
            password_digest: "8eJ3s2s4ycGfdkjdkhjsCKhQdJ8T9Lt8ed",
            admin: false
        }
    ]

app.get('/', (req, res) => {
    res.send("This is root!");
});

app.get('/users', (req, res) => {
    res.json(users)
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id
    const user = users.filter(user => user.id === id)[0]
    res.json(user)
})

app.post('/users', (req, res) => {    
    const user = req.body
    user.id = uuidv4();
    users.push(user)
    res.json(users)
})

app.put('/users/:id', (req, res) => {
    const id = req.params.id
    const userIndex = users.findIndex(user => user.id === id)
    const user = { ...users[userIndex], ...req.body }
    user.id = id;    
    users.splice(userIndex, 1, user)
    res.json(user)
})

app.delete('/users/:id', (req, res) => {
    const id = req.params.id
    const userIndex = users.findIndex(user => user.id === id)
    if(userIndex > -1){
        users.splice(userIndex, 1);
    }
    res.json(users)
})


