const express = require("express");
const PORT = 3002;
const app = express();

const data = require("./data.json");

app.use(express.json());

function findArticleById(id) {
  return data.find((article) => article.id === +id);
}

function findArticleIndex(id) {
  return data.findIndex((article) => article.id === +id);
}

app.get("/", (req, res) => {
  console.log("L'application fonctionne");
  res.send("L'application fonctionne");
});

/*app.get("/articles", (req, res) => {
  res.send(data);
});*/

app.get("/articles/:id", (req, res) => {
  const { id } = req.params;
  const article = findArticleById(id);
  if (article) {
    return res.send(article);
  }

  res.status(404).send(`L'article avec l'id : ${id} n'existe pas`);
});

app.post("/articles", (req, res) => {
  const newArticle = req.body;

  data.push(newArticle);

  res.status(201).send(data[data.length - 1]);
});

app.put("/articles/:id", (req, res) => {
  const article = req.body;
  const { id } = req.params;
  const articleIndex = findArticleIndex(id);
  if (articleIndex < 0) {
    data.push(article);
    return res.status(201).send(data[data.length - 1]);
  } else {
    data[articleIndex] = article;
    return res.status(200).send(data[articleIndex]);
  }
});

app.delete("/articles/:id", (req, res) => {
  const { id } = req.params;
  const articleIndex = findArticleIndex(id);
  const article = findArticleById(id);
  if (articleIndex < 0) {
    res.status(404).send(`L'article avec l'id ${id} n'existe pas`);
  } else {
    data.splice(articleIndex, 1);
    res.status(202).send(article);
  }
});


//Modification partielle d'un article
app.patch("/articles/:id", (req, res) =>{
  const newTitleOfAnArticle = req.body.title;
  const {id} = req.params;
  const articleIndex = findArticleIndex(id);

  if(articleIndex < 0){
    res.status(404).send(`Erreur car l'article avec l'id ${id} n'existe pas.`)
  }else{

    data[articleIndex].title = newTitleOfAnArticle;
    res.send(data);
  }
})



//Listing limité des articles
app.get("/articles", (req, res) =>{
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 5;

  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  const pageArticles = data.slice(startIndex, endIndex);
  res.send(pageArticles);
})


//Suppression de plusieurs articles avec une seule requete 
app.delete("articles/:id", (req, res) =>{
  i
})



app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});
