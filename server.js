// Express: usado para criar e configurar o servidor
const express = require("express");
const server = express();

const db = require("./db");

// Config. arq. estáticos(css, scripts, imgs, ...)
server.use(express.static("public"));

// Habilitar uso do req.body
server.use(express.urlencoded({ extended: true }));

// Config. nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
    express: server,
    noCache: true,
});

// Rotas
server.get("/", function(req, res) {
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if(err) {
            console.log(err);
            return res.send("Erro no banco de dados!");
        }

        const reversedIdeas = [...rows].reverse();

        let lastIdeas = [];
        for(let idea of reversedIdeas) {
            if(lastIdeas.length < 3) {
                lastIdeas.push(idea);
            };
        };

        return res.render("index.html", { ideas: lastIdeas });
    });
    
});

server.get("/ideas", function(req, res) {
    res.query 

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if(err) {
            console.log(err);
            return res.send("Erro no banco de dados!");
        };

        const reversedIdeas = [...rows].reverse();
        return res.render("ideas.html", { ideas: reversedIdeas });
    });

});

server.post("/", function(req, res) {
    //Inserir dados na tabela
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link 
        ) VALUES(?,?,?,?,?);
    `;
    
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ];

    db.run(query, values, function(err) {
        if(err) {
            console.log(err);
            return res.send("Erro no banco de dados!");
        };
        
        return res.redirect("/ideas");
    });

});
// Servidor ligado na porta 3000
server.listen(3000);