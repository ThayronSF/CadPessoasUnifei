const express = require("express");

const {
    addPessoa,
} = require("../controllers/pessoasControllers");

const router = express.Router();

router.post("/pessoa", addPessoa); 

module.exports = {
    routes: router,
}