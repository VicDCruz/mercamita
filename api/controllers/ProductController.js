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
      limit: 3,
      where: {status: 0}
    });
    mostVisitedProducts = await Product.find({
      sort: 'views DESC',
      limit: 3
    });
    output.newestProducts = newestProducts;
    output.mostVisitedProducts = mostVisitedProducts;
    return res.view('product/mainIndex', output);
  },
  create: async (req, res) => {
    var output = {
      status: 200,
      description: "OK",
      id:0
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
    output.id = newProduct.id;
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
      .set({views: ((product.views) ? product.views : 0) + 1})
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
  },
  uploadAvatar: (req,res) => {

    var imgs = req.param('img');
    if(imgs==''){
      imgs = [];
    }

    //console.log(req.file('avatar'))
    var pathImg = 'assets/images/products'
    var nameImg =req.session.user.id + 'products'+(imgs.length+1)+'.jpg'
    
    var output = {
      status: 200,
      description: "OK"
    };

    req.file('imgP').upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10000000,
      dirname: require('path').resolve(sails.config.appPath, pathImg),
      saveAs: nameImg
    },async function whenDone(err, uploadedFiles) {
      if (err) {
        return res.serverError(err);
      }

      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length === 0){
        return res.badRequest('No file was uploaded');
      }

      // Get the base URL for our deployed application from our custom config
      // (e.g. this might be "http://foobar.example.com:1339" or "https://example.com")
      var baseUrl = sails.config.custom.baseUrl;
      /* sails.log(req.session.user.id) */
      // Save the "fd" and the url where the avatar for a user can be accessed
      console.log(req.param('p'))
      console.log(req.param('img'))
      
      imgs.push(nameImg)
      await Product.update(req.param('p'), {
        images: imgs
      });
      console.log(req.param('p'))
      //req.session.user.profile = nameImg;
      if (err) return res.serverError(err); 
      //return res.view('user/profile');
      //$window.alert('Producto publicado exitosamente');
      return res.view('user/profile');
      //return res.json(output)
    });
    
    
  }
};

