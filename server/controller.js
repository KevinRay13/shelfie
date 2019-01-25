module.exports = {
  create: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { product, price, img } = req.body;

    dbInstance
      .create_product([id, product, price, img])
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({ errorMessage: "ruh roh" });
        console.log(err);
      });
  },

  getInv: (req, res, next) => {
    const dbInstance = req.app.get("db");

    dbInstance
      .get_inventory()
      .then(products => res.status(200).send(products))
      .catch(err => {
        res.status(500).send({ errorMessage: "ruh roh" });
        console.log(err);
      });
  },
  delete: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const params = req;

    dbInstance
      .delete_product([params.id])
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({ errorMessage: "ruh roh" });
        console.log(err);
      });
  }
};
