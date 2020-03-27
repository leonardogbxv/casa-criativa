// express: usado para criar e configurar o servidor
const express = require("express");
const server = express();

const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Cursos de Programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, soluta earum quae molestias accusantium",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercícios",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, soluta earum quae molestias accusantium",
        url: "https://belezaesaude.com/exercicios-fisicos/"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Mentalidade",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, soluta earum quae molestias accusantium",
        url: "https://www.personare.com.br/meditacao"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "Karaokê",
        category: "Diversão em Família",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, soluta earum quae molestias accusantium",
        url: "https://www.versao-karaoke.com/"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
        title: "Pintura",
        category: "Criatividade",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, soluta earum quae molestias accusantium",
        url: "https://www.pixiv.net/en/"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729048.svg",
        title: "Recortes",
        category: "Criatividade",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, soluta earum quae molestias accusantium",
        url: "http://adoropapel.com.br/2017/11/graca-da-arte-em-recortes-de-papel/"
    },
];


// config. arq. estáticos(css, scripts, imgs, ...)
server.use(express.static("public"));

//config. nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
    express: server,
    noCache: true,
});

// rota "/" criada
// capturar pedido do usuário para responder
server.get("/", function(req, res) {
    // regra de negócio
    const reversedIdeas = [...ideas].reverse();
    
    let lastIdeas = [];
    for(let idea of reversedIdeas) {
        if(lastIdeas.length < 2) {
            lastIdeas.push(idea);
        }
    };

    return res.render("index.html", { ideas: lastIdeas });
});

server.get("/ideas", function(req, res) {

    const reversedIdeas = [...ideas].reverse();

    return res.render("ideas.html", { ideas: reversedIdeas });
});

// servidor ligado na porta 3000
server.listen(3000);