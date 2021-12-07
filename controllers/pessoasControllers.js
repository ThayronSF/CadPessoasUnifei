const firebase = require("firebase");
const config = require("../config"); 

const app = firebase.initializeApp(config.firebaseConfig);
const db = firebase.firestore(app); 

const addPessoa = async (req, res) => {
    try {
        const data = req.body;
        await db.collection("pessoas").doc().set(data);
        res.send("Dados gravados com sucesso");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getPessoas = async(req, res)=>{
    try{
        const pessoas= await db.collection("pessoas").get();
        const dataResp = [];
        
        if(pessoas.empty){
            res.status(404).send("Nenhum dado encontrado");
            
        }else{
            pessoas.forEach( (doc)=>{
                dataResp.push({
                    id: doc.id,
                    nome: doc.data().nome,
                    idade: doc.data().idade,
                    cpf: doc.data().cpf,
                })
            })//Fim do forEach
            res.send(dataResp);
            console.log(pessoas);
        }

    }catch(error){
        res.status(404).send(error.message)
    }
}

const getPessoa = async(req, res)=>{
    try{
        const id = req.params.id;
        const pessoa= await db.collection("pessoas").doc(id).get();
        if(!pessoa.exists){
            res.status(404).send("Nenhum registro encontrado com este codigo" + id)
        }else{
            res.send(pessoa.data());
            }
    }catch(error){
        res.status(404).send(error.message)
    }
}

const setPessoa = async(req, res)=>{
    try{
        const id = req.params.id;
        const data = req.body;
        const pessoa= await db.collection("pessoas").doc(id);
        await pessoa.uptdate(data);
        req.status(200).send(data);
    }catch(error){
        res.status(400).send(error.message)
    }
}

const delPessoa = async (req, res) => {
    try {
        const id = req.params.id;
        const pessoa = await db.collection("pessoas").doc(id).delete();
        res.status(200).send("Registro excluído");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addPessoa,
    getPessoas,
    getPessoa,
    setPessoa,
    delPessoa,
}