const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
let data = require("./fake_data.json");

data.map((obj) => {
    //console.log(obj.id)
})

app.use(cors());


app.get('/data', (req, res) => {
    res.send(data);
});
app.post('/updateuser', (req, res) => {
    
}) 

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
