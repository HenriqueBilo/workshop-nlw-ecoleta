const express = require("express")
const server = express()

// Pegar o banco de dados
const db = require("./database/db.js")

// configurar pasta publica
server.use(express.static("public"))

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true //Sem cache
})

// configurar caminhos da minha aplicação
// página inicial
// req: Requisição
// res: Resposta
server.get("/", function (req, res) {
    return res.render("index.html", { title: "Um titulo" }) //__dirname é o diretório  
})

server.get("/create-point", function (req, res) {
    return res.render("create-point.html") //__dirname é o diretório  
})

server.post("/savepoint", (req, res) => {
    // req.query : Query Strings da nossa url

    // req.body : O corpo do nosso formulário

    // inserir dados no banco de dados
    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (
        ?,?,?,?,?,?,?
    );
`
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this) //this referencia a resposta do run

        return res.render("create-point.html", { saved: true})
    }

    db.run(query, values, afterInsertData)
})

server.get("/search", function (req, res) {
    // Pegar os dados do banco de dados

    const search = req.query.search

    // Pesquisa vazia
    if(search == ""){
        return res.render("search-results.html", { total: 0 })
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        // Mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total }) //__dirname é o diretório  
    })
})

// ligar o servidor
server.listen(3000)