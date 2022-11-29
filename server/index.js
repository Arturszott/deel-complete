import express from "express";
import cors from "cors";
import data from './data.json' assert {type: 'json'};

const app = express();

app.use(cors())

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/search", (req, res, next) => {
    const phrase = req.query.phrase;
    const filteredData = phrase ? data.filter((item => item.name.toLowerCase().includes(phrase.toLowerCase()))) : data;
    

    // simulate latency
    setTimeout(() => {
        res.json(filteredData);
    }, 300)
    
});