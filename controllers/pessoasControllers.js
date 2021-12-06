const firebase = require("firebase");
const config = require("../config"); 

const app = firebase.initializeApp(config.firebaseConfig);
const db = firebase.firestore(); 

const addPessoa = async (req, res) => {
    try {
        const data = req.body;
        await db.collection("pessoas").doc().set(data);
        res.send("Dados gravados com sucesso");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addPessoa,
}