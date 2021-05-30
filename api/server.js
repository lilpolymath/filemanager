const express = require("express");
const mongo = require("mongodb").MongoClient;
const cors = require('cors')

const app = express();
app.use(cors())

const url = `mongodb://${process.env.MONGODB_USERNAME}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@${process.env.MONGODB_HOST}:27017/${process.env.MONGODB_DATABASE}`;

function startWithRetry() {
  mongo.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 1000,
    socketTimeoutMS: 1000
  }, (err, client) => {
    if (err) {
      console.error(`Error connecting, retrying in 1 sec: ${err}`);
      setTimeout(startWithRetry, 1000);
      return;
    }

    const db = client.db(process.env.MONGODB_DATABASE);

    app.listen(8080, () => {
      app.get("/api/healthz", (req, res, next) => {
        res.sendStatus(200)
        return;
      });

      app.get("/api/files", (req, res, next) => {
        console.log(`GET /api/files`)
        db.collection('files').find().toArray((err, results) => {
          if (err) {
            console.log(`failed to query services: ${err}`);
            res.json([]);
            return;
          }
          res.json(results);
        });
      });

      console.log("Server running on port 8080.");
    });
  });
};

startWithRetry();