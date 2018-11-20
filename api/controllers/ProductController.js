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

  read: (req, res) => {

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
  verify: (req,res) => {
    console.log(req.param('id'));
    var id = req.param('id');
    var output = {
      status: 200,
      description: "OK"
    };
    var prod = Product.findOne({
      _id: id
    }).exec((err, product) => {
      if (err || !product) {
        output.status = 500;
        output.description = "Internal Server Error";
      }
      
      return res.json(prod);
    });
  }
};

