const express = require("express");

const {
    addPessoa,
    getPessoas,
    getPessoa,
    setPessoa,
    delPessoa,
} = require("../controllers/pessoasControllers");

const router = express.Router();

router.post("/pessoa", addPessoa); 
router.get("/pessoas", getPessoas); 
router.get("/pessoa/:id", getPessoa);
router.put("/pessoa:id", setPessoa);
router.delete("/pessoa/:id", delPessoa);

module.exports = {
    routes: router,
}