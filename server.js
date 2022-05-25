const express = require('express')
const db = require("./db");
const app = express()
const connection = db.initDB()
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require("fs");
const multer = require('multer');

const storage = multer.diskStorage(
    {
        destination: 'public/startupFiles',
        filename: function (req, file, cb) {
            cb(null, req.body.name + " - " + req.body.phone + " - " + file.originalname)
        }
    }
);

const upload = multer({storage: storage});


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://185.110.189.42:3005',
    credentials: true
}));

db.createTables(connection)


app.post('/main-form', async (req, res) => {
    let info = req.body;
    db.addMain(connection, info).then(result => {
        res.setHeader('Access-Control-Allow-Origin', 'http://185.110.189.42:3005');
        res.status(200).send(result);
    }).catch(e => {
        console.log(e)
        res.status(400).send(e);
    });
})

app.post('/investor-form', async (req, res) => {
    let info = req.body;
    db.addInvestor(connection, info).then(result => {
        res.setHeader('Access-Control-Allow-Origin', 'http://185.110.189.42:3005');
        res.status(200).send(result);
    }).catch(e => {
        console.log(e)
        res.status(400).send(e);
    });
})


app.post('/partnership-form', async (req, res) => {
    let info = req.body;
    db.addPartnership(connection, info).then(result => {
        res.setHeader('Access-Control-Allow-Origin', 'http://185.110.189.42:3005');
        res.status(200).send(result);
    }).catch(e => {
        console.log(e)
        res.status(400).send(e);
    });
})


// Pro tip: upload.single('doc') and input name = "doc" and formData.append("doc", selectedFile);
app.post('/startup-form', upload.single('doc'), function (req, res) {
    let info = req.body;
    info.path = req.file.path

    db.addStartup(connection, info, req.file.path).then(result => {
        res.setHeader('Access-Control-Allow-Origin', 'http://185.110.189.42:3005');
        res.status(200).send(result);
    }).catch(e => {
        console.log(e)
        res.status(400).send(e);
    });
});

app.get('/get-info', async (req, res) => {
    console.log(req.query)
    db.getInfo(connection, req.query.table).then(result => {
        res.setHeader('Access-Control-Allow-Origin', 'http://185.110.189.42:3005');
        res.status(200).send(result);
    }).catch(e => {
        console.log(e)
        res.status(400).send(e);
    });
})


app.listen(5005, () => {
    console.log("Server started!");
});


