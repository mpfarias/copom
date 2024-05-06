const express = require("express")
const db = require("../db/models")
const router = express.Router();

router.post("/", async (req, res) => {
    var data = req.body;
    await db.copom.create(data).then((dataMessage) => {
        return res.json({
            error: false,
            message: "Dados cadastrados com sucesso.",
            data: dataMessage
        });
    }).catch((err) => {
        return res.status(400).json({
            error: false,
            message: "Erro: dados não foram enviados",
        });
    });
});

module.exports = router