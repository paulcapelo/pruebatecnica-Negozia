const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectId;
const cors = require("cors");

// Connecting to MongoDB
var db = "mongodb+srv://admin:admin@cluster0.g9q9gam.mongodb.net/test";
const database = "Pruebas";

MongoClient.connect(db, (err, client) => {
  if (err) return console.log(err);
  
  db = client.db(database);
  app.listen(5000, () => {
    console.log("listening on 5000");
  });
});

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// // folder structure
// app.use(express.static('public'))

// GET
app.get("/api/users", (req, res) => {
  db.collection("user")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.status(202);
      res.json(result);
    });
});
app.get("/api/roles", (req, res) => {
  db.collection("roles")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.status(202);
      res.json(result);
    });
});

// POST
app.post("/api/user", async (req, res) => {
  
  db.collection("user")
    .find({ password: `${req.body.password}`, email: req.body.email })
    .toArray((err, result) => {
      
      if (err) return res.status(404).json({ err: "Usuario incorrecto" });
      if (result.length === 0)
        return res.status(403).json({ err: "Usuario incorrecto" });
      res.status(200).json(result[0]);
    });
});

// PUT
app.put("/api/user", async (req, res) => {
  db.collection("user").insertOne(
    {
      name: req.body.name,
      rol: req.body.rol,
      password: req.body.password,
      email: req.body.email,
    },
    (err, result) => {
      if (err) return res.send(err);

      res.send({ resp: true, result });
    }
  );
});
//PATCH
app.patch("/api/user", async (req, res) => {
  const id = ObjectID(req.body._id);

  db.collection("user").findOneAndUpdate(
    { _id: id },
    {
      $set: {
        name: req.body.name,
        rol: req.body.rol,
        password: req.body.password,
        email: req.body.email,
      },
    },
    {
      sort: { _id: -1 },
      upsert: false,
    },
    (err, result) => {
      if (err) return res.send(err);
      if (result.value === null)
        return res
          .status(404)
          .json({ err: true, mensaje: "No existe el usuario" });

      res.send({ resp: true, result });
    }
  );
});

// DELETE
app.delete("/api/user", async (req, res) => {
  const id = ObjectID(req.body._id);

  const item = await db.collection("user").find({ _id: id }).toArray();
  
  if (item.length === 0) {
    return res.status(404).json({ err: true, mensaje: "No existe el usuario" });
  }
  db.collection("user").findOneAndDelete(
    { _id: id },
    (err, result) => {
      if (err) return res.send(500, err);
      res.send({ resp: true, message: "Registro eliminado" });
    }
  );
});
