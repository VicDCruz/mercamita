/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async (req, res) => {
    var output = {
      status: 200,
      description: "OK"
    };
    let keys = Object.keys(User.attributes);
    for (const key in req.allParams()) {
      if (!keys.includes(key)) {
        output.status = 500;
        output.description = "Internal Server Error";
        return res.json(output);
      }
    }
    newUser = await User.create(req.allParams()).fetch();
    console.log(newUser);
    return res.json(output);
  },

  read: (req, res) => {
    var id = req.param('id');
    console.log(id);
    User.findOne({id: id}).exec((err, user) => {
      if(err) throw err;
      return res.json(user);
    })
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
    User.destroy({id: id}).exec((err) => {
      if (err) {
        output.status = 500;
        output.description = "Internal Server Error";
      }
      return res.json(output);
    });
  },

  verify: (req, res) => {
    var account = req.param('account');
    var password = req.param('password');
    var output = {
      status: 200,
      description: "OK"
    };
    if (!account) {
      output.status = 404;
      output.description = "Not found";
      return res.json(output);
    }
    User.findOne({
      account: account,
      password: password
    }).exec((err, user) => {
      if (err || !user) {
        output.status = 500;
        output.description = "Internal Server Error";
      }
      req.session.user = user;
      return res.json(output);
    });
  },
  logout: (req, res) => {
    req.session.user = null;
    return res.ok();
  },
  uploadImg: (req,res) => {
    User.findOne(req.param('id')).exec(function (err, user){
      if (err) return res.serverError(err);
      if (!user) return res.notFound();
      

      return res.json(req.Object)
    })
  },
  uploadAvatar: (req,res) => {
    var output = {
      status: 200,
      description: "OK"
    };
    var pathImg = 'assets/images/users'
    if(req.param('tipo') == 'prods'){
      pathImg = 'assets/images/products'
    }
    var nameImg =req.session.user.id + req.param('tipo')+'.jpg'
    req.file('avatar').upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10000000,
      dirname: require('path').resolve(sails.config.appPath, pathImg),
      saveAs: nameImg
    },function whenDone(err, uploadedFiles) {
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
      sails.log(req.session.user.id)
      // Save the "fd" and the url where the avatar for a user can be accessed
      User.update(req.session.user.id, {

        // Generate a unique URL where the avatar can be downloaded.
        avatarUrl: require('util').format('%s/user/avatar/%s', baseUrl, req.session.user.id),

        // Grab the first file and use it's `fd` (file descriptor)
        avatarFd: uploadedFiles[0].fd
      })
      .exec(function (err){
        if (err) return res.serverError(err);
        
      });
  });
},

};

