/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async (req, res) => {
    output = {};
    newestProducts = await Product.find({
      sort: 'createdAt DESC',
      limit: 3
    });
    mostVisitedProducts = await Product.find({
      sort: 'views',
      limit: 3
    });
    output.newestProducts = newestProducts;
    output.mostVisitedProducts = mostVisitedProducts;
    return res.view('product/mainIndex', output);
  },
  create: async (req, res) => {
    var output = {
      status: 200,
      description: "OK"
    };
    let parameters = req.allParams();
    let keys = Object.keys(parameters);
    if (!Product.areValidParameters(keys)) {
      output.status = 500;
      output.description = "Internal Server Error";
      return res.json(output);
    }
    newProduct = await Product.create(parameters).fetch();
    console.log(newProduct);
    
    return res.json(output);
  },

  read: async (req, res) => {
    let output = {};
    let parameters = req.allParams();
    let product = await Product.findOne({id: parameters.id});
    let seller = await User.find({
      where: {id: product.seller},
      select: [
        'id',
        'name'
      ],
      limit: 1
    });
    output.product = product;
    output.seller = seller[0];
    Product.update({id: product.id})
      .set({views: product.views + 1})
      .exec((err, res) => {});
    return res.view('product/read', output);
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

