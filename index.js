const server = require("./api/server.js");
const db = require("./data/dbConfig");
const knex = require("knex");

const PORT = process.env.PORT || 5000;

server.get("/accounts", (req, res) => {
  db.select("*")
    .from("accounts")
    .then((accounts) => res.status(200).json(accounts))
    .catch((err) => res.status(500).json({ message: "An error occurred" }));
});

server.post("/accounts", (req, res) => {
  if (req.body.name && req.body.budget) {
    db.insert(req.body)
      .into("accounts")
      .then((account) => res.status(200).json(account))
      .catch((err) => res.status(500).json({ message: "An error occurred." }));
  } else {
    res.status(400).json({ message: "Must include a name and a budget." });
  }
});

server.put("/accounts/:name", (req, res) => {
  if (req.body) {
    db("accounts")
      .where({ name: req.params.name })
      .update({
        name: req.body.name,
        budget: req.body.budget,
      })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json({ error: err }));
  }
});

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
