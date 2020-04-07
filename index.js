const express = require("express");
const shortid = require('shortid');

const server = express();
const PORT = 5000;

const users = [];

// Middleware
server.use(express.json());


// ------------- ENDPOINTS ---------------

server.get("/", (req, res) => {
  res.json({ api: "running.." });
});

//POST New User
server.post('/api/users', (req, res)=>{
    const body = req.body;

    // Add ID
    body['id'] = shortid.generate();

    // Add new user to the users variable and return 201 with the users variable
    try {
        users.push(body);
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
    }
    
})

// GET all users
server.get('/api/users', (req,res)=>{
    try {
        res.status(200).json(users);
    }catch (error) {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." });
    }
})

// Get a single user
server.get('/api/users/:id', (req,res)=>{
    try {
        const user = users.filter(function(user) { 
            return user['id'] == req.params.id;
        });
        res.status(200).json(user);
    }catch (error) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." });
    }
})

// Delete a user
server.delete('/api/users/:id', (req,res)=>{
    
    try {
        const index = users.map(e => e.id).indexOf(req.params.id);
        if (!(index >= 0)) {
            res.status(404).json({ message: "The user with the specified ID does not exist."});
        } else {
            users.splice(index, 1);
            res.sendStatus(200);
        }
    } catch (error) {
        res.status(500).json({ errorMessage: "The user could not be removed" });
    }
})


// Listen for requests
server.listen(PORT, () => console.log(`Listening on ${PORT}`));