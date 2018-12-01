module.exports = {


  friendlyName: 'Mailer',


  description: 'To send mails.',


  inputs: {
    email: {
      type: 'string',
      required: true,
      allowNull: false
    },
    name: {
      type: 'string',
      required: true,
      allowNull: false
    },
    id: {
      type: 'string',
      required: true,
      allowNull: false
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    sails.hooks.email.send(
      "verify",
      {
        recipientName: inputs.name,
        senderName: "Do Not Reply Mercamita",
        id: inputs.id
      },
      {
        to: inputs.email,
        subject: "Bienvenido a Mercamita"
      },
      function(err) {
        console.log(err || "It worked!");
        if (err) {
          return exits.error(false);
        }
      }
    )
    console.log("Nuevo correo creado");
    
    return exits.success(true);
  }


};

