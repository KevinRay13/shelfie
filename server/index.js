require("dotenv").config();
const { json } = require("body-parser");
const express = require("express");
const massive = require("massive");
const app = express();
const controller = require("./controller");
const cors = require("cors");
app.use(cors());
app.use(json());

const port = 3030;

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);

    // dbInstance
    //   .create_table()
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(error => console.log(error));
  })
  .catch(error => console.log(error));

app.post("/api/product", controller.create);
app.get("/api/inventory", controller.getInv);
// app.get( '/api/products/:id', products_controller.getOne );
// app.put( '/api/products/:id', products_controller.update );
app.delete("/api/product/:id", controller.delete);

app.listen(port, () => console.log(`Listening on ${port}`));
