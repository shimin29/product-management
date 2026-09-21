const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.json(products);
};

exports.getProductById =  async (req, res) => {
    const product =  await Product.find({ _id: req.params.id });
    res.json(product);
};
