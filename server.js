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
        destination: (req, file, cb) => {
            const id = req.body.phone + " - " + req.body.name
            console.log(id)

            const path = `public/startupFiles/${id}`
            fs.mkdirSync(path, {recursive: true})
            return cb(null, path)
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }
);

const upload = multer({storage: storage});


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors({
    origin: '*',
}));

db.createTables(connection)


app.post('/main-form', async (req, res) => {
    let info = req.body;
    db.addMain(connection, info).then(result => {
        res.status(200).send(result);
    }).catch(e => {
        console.log(e)
        res.status(400).send(e);
    });
})

app.post('/investor-form', async (req, res) => {
    let info = req.body;
    db.addInvestor(connection, info).then(result => {
        res.status(200).send(result);
    }).catch(e => {
        console.log(e)
        res.status(400).send(e);
    });
})


app.post('/partnership-form', async (req, res) => {
    let info = req.body;
    db.addPartnership(connection, info).then(result => {
        res.status(200).send(result);
    }).catch(e => {
        console.log(e)
        res.status(400).send(e);
    });
})


// Pro tip: upload.array('docs') and input name = "docs" and formData.append("docs", selectedFile);
app.post('/startup-form', upload.array('docs'), function (req, res) {
    let info = req.body;
    let fileAddresses = ''
    req.files.map(file => {
        fileAddresses = fileAddresses.concat(file.path, ", ")
    })
    db.addStartup(connection, info, fileAddresses).then(result => {
        res.status(200).send(result);
    }).catch(e => {
        console.log(e)
        res.status(400).send(e);
    });
});

app.get('/get-info', async (req, res) => {
    console.log(req.query)
    db.getInfo(connection, req.query.table).then(result => {
        res.status(200).send(result);
    }).catch(e => {
        console.log(e)
        res.status(400).send(e);
    });
})


app.listen(5005, () => {
    console.log("Server started!");
});


