const initDB = () => {
    const mysql = require('mysql')
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'admin_de',
        password: 'YY9grgUUM]6BWud0',
        database: 'admin_de'
    })
    connection.connect()
    console.log("connection to db established")
    return connection
}
const createTables = (connection) => {
    let mainForm = `CREATE TABLE IF NOT EXISTS Main(
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        name VARCHAR(255),
                        workArea VARCHAR(255),
                        phone CHAR(11) UNIQUE,
                        email VARCHAR(255)
                        );`

    let investorForm = `CREATE TABLE IF NOT EXISTS Investor(
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        name VARCHAR(255),
                        business VARCHAR(255),
                        experience VARCHAR(255),
                        phone CHAR(11) UNIQUE
                        );`

    let partnershipForm = `CREATE TABLE IF NOT EXISTS Partnership(
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        name VARCHAR(255),
                        business VARCHAR(255),
                        position VARCHAR(255),
                        kind VARCHAR(255),
                        phone CHAR(11) UNIQUE
                        );`

    let startupForm = `CREATE TABLE IF NOT EXISTS Startup(
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        name VARCHAR(255),
                        startup VARCHAR(255),
                        workArea VARCHAR(255),
                        fileAddress VARCHAR(500),
                        phone CHAR(11) UNIQUE
                        );`

    let tables = [mainForm, investorForm, partnershipForm, startupForm]

    tables.forEach((table, index) => {
        connection.query(table, (err) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log(`${index}) Table created successfully.`)
            }
        });
    })


}
const addMain = (connection, info) => {
    let query = `INSERT INTO Main (name, workArea, phone, email) VALUES ("${info.name}", "${info.workArea}", "${info.phone}", "${info.email}");`
    return new Promise((resolve, reject) => {
        connection.query(query, (error) => {
            if (error)
                return reject(error.message);
            return resolve("Info successfully added to Main table.");
        });
    })
}

const addInvestor = (connection, info) => {
    let query = `INSERT INTO Investor (name, business, experience ,phone) VALUES ("${info.name}",  "${info.business}", "${info.experience}", "${info.phone}");`
    return new Promise((resolve, reject) => {
        connection.query(query, (error) => {
            if (error)
                return reject(error.message);
            return resolve("Info successfully added to Investor table.");
        });
    })
}

const addPartnership = (connection, info) => {
    console.log(`${info.position}`)
    let query = `INSERT INTO Partnership (name, business , position, kind, phone) VALUES ("${info.name}",  "${info.business}", "${info.position}", "${info.kind}", "${info.phone}");`
    return new Promise((resolve, reject) => {
        connection.query(query, (error) => {
            if (error)
                return reject(error.message);
            return resolve("Info successfully added to Partnership table.");
        });
    })
}

const addStartup = (connection, info, fileAddress) => {
    let query = `INSERT INTO Startup (name, startup , workArea, fileAddress, phone) VALUES ("${info.name}",  "${info.startup}", "${info.workArea}", "${fileAddress}", "${info.phone}");`
    return new Promise((resolve, reject) => {
        connection.query(query, (error) => {
            if (error)
                return reject(error.message);
            return resolve("Info successfully added to Startup table.");
        });
    })
}

const getInfo = (connection, table) => {
    let query = `SELECT * FROM ${table}`
    return new Promise((resolve, reject) => {
        connection.query(query, (error, result) => {
            if (error)
                return reject(error.message);
            return resolve(result);
        });
    })
}


exports.initDB = initDB;
exports.createTables = createTables;
exports.addMain = addMain;
exports.addInvestor = addInvestor;
exports.addPartnership = addPartnership;
exports.addStartup = addStartup;
exports.getInfo = getInfo;