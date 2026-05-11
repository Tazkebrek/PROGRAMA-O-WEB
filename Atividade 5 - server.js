const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

let feedbacks = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/feedbacks/enviar", (req, res) => {

    const { nome, comentario } = req.body;

    feedbacks.push({
        id: Date.now(),
        nome,
        comentario
    });

    res.redirect("/feedbacks/lista");
});

app.get("/feedbacks/lista", (req, res) => {

    let html = fs.readFileSync(
        path.join(__dirname, "views", "lista.html"),
        "utf-8"
    );

    let lista = "";

    feedbacks.forEach(feedback => {

        lista += `
            <div style="border:1px solid black; padding:10px; margin:10px;">
                <h3>${feedback.nome}</h3>
                <p>${feedback.comentario}</p>

                <form action="/feedbacks/remover" method="POST">
                    <input type="hidden" name="id" value="${feedback.id}">
                    <button type="submit">Remover</button>
                </form>
            </div>
        `;
    });

    html = html.replace("{{feedbacks}}", lista);

    res.send(html);
});

app.post("/feedbacks/remover", (req, res) => {

    const { id } = req.body;

    feedbacks = feedbacks.filter(
        feedback => feedback.id != id
    );

    res.redirect("/feedbacks/lista");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
