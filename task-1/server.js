const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const folder = './output';   //folder name where files will be stored

//to check the folder is already created. if not then creating the folder

if(!fs.existsSync(folder)){  
    fs.mkdirSync(folder)
}

app.get('/createfile', (req, res)=>{
    const currenttime = new Date();
    
    const year = currenttime.getFullYear().toString();
    const month = (currenttime.getMonth() + 1).toString();
    const date = currenttime.getDate().toString();
    const hours = currenttime.getHours().toString();
    const mins = currenttime.getMinutes().toString();
    const sec = currenttime.getSeconds().toString();

    const filename = `${year}-${month}-${date}-${hours}-${mins}-${sec}.txt`;
    const filepath = path.join(folder, filename);

    fs.writeFile(filepath, currenttime.toISOString(), (err)=>{
        if(err){
            res.status(500).send(`Error while creating a file ${err}`)
            return;
        }
        res.send(`file Created sucessfully at: ${filepath}`)
    })
});

app.get('/getfile', (req,res)=>{
    fs.readdir(folder, (err, files)=>{
        if(err){
            res.status(500).send(`Error while reading a folder ${err}`)
            return;
        }
        const textfiles = files.filter((file)=>path.extname(file) === '.txt')
        res.json(textfiles);
    })
});

app.listen(PORT, ()=>{
    console.log(`localhost running on http://localhost:${PORT}`)
});