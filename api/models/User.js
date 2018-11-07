/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: false,
      defaultsTo: 'NONAME'
    },
    account: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    telephone: {
      type: 'number',
      required: false,
    },
    products: {
      type: 'ref',
      columnType: 'array',
      required: false
    }
  },

};

