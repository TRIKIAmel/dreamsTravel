const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("voyages.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080;

// Middleware pour empêcher la suppression et la modification
server.use((req, res, next) => {
  if (req.method === "DELETE" || req.method === "PUT" || req.method === "PATCH") {
    // Si la méthode de requête est DELETE, PUT ou PATCH, renvoyer une erreur
    return res.status(403).json({ message: "Opération interdite" });
  }
  // Si la méthode de requête n'est pas DELETE, PUT ou PATCH, passer au middleware suivant
  next();
});

server.use(middlewares);
server.use(router);

server.listen(port);
