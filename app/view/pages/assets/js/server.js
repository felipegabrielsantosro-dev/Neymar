import express from "express";
import Print from "./app/mixin/Print.js";

const app = express();
app.use(express.json());

app.post("/gerar-pdf", async (req, res) => {
    const { html } = req.body;

    await Print.create()
        .stringHtml(html)
        .print("cliente.pdf");

    res.send({ ok: true });
});

app.listen(3000);