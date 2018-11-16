/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async (req, res) => {
    products = await Product.find();
    return res.view('listado', {products: products});
  },
  create: (req, res) => {
    var output = {
      status: 200,
      description: "OK"
    };
    let keys = Object.keys(Product.attributes);
    for (const key in req.allParams()) {
      if (!keys.includes(key)) {
        output.status = 500;
        output.description = "Internal Server Error";
        return res.json(output);
      }
    }
    newProduct = Product.create(req.allParams()).fetch();
    console.log(newProduct);
    return res.json(output);
  },

  read: async (req, res) => {
    let parameters = req.allParams();
    let product = await Product.findOne({id: parameters.id});
    Product.update({id: product.id})
      .set({views: product.views + 1})
      .exec((err, res) => {});
    return res.view('product/read');
  },

  update: (req, res) => {
    var output = {
      status: 200,
      description: "OK"
    };
  },

  delete: (req, res) => {
    var output = {
      status: 200,
      description: "OK"
    };
    var id = req.param(id);
    if (!id) {
      output.status = 404;
      output.description = "Not found";
    }
    Product.destroy({id: id}).exec((err) => {
      if (err) {
        output.status = 500;
        output.description = "Internal Server Error";
        return res.json(output);
      }
      return res.json(output);
    });
  },
};

