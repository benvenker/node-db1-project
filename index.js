const server = require("./api/server.js");
const db = require("./data/dbConfig");
const knex = require("knex");

const PORT = process.env.PORT || 5000;

server.get("/accounts", (req, res) => {
  db.select("*")
    .from("accounts")
    .then((accounts) => res.status(200).json(accounts));
});

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
