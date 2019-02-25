const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = 3001;
let data = require("./fake_data.json");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/data', (req, res) => {
    res.send(data);
});

app.post('/updateuser', (req, res) => {
    let newUser = req.body['newUser'];
    let updatedUserIndex = req.body['updatedUserIndex'];
    console.log(newUser);
    data[updatedUserIndex] = newUser;
});

app.post('/deleteuser', (req, res) => {
    data = data.filter(user => user.id != req.body['userID']);
})

app.post('/adduser', (req, res) => {
    data.push(req.body['newUser']);
})

app.listen(port, () => console.log(`Server listening on port ${port}!`));
