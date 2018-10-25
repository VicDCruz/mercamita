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
        return res.json(output);
      }
      return res.json(output);
    });
  },
};

