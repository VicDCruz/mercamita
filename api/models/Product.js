/**
 * Product.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      defaultsTo: 'NONAME'
    },
    views: {
      type: 'number',
      required: true,
      defaultsTo: 0
    },
    price: {
      type: 'number',
      columnType: 'float',
      required: true,
      defaultsTo: -1
    },
    description: {
      type: 'string',
      required: false
    },
    category: {
      type: 'json',
      required: false
    },
    image: {
      type: 'string',
      required: false
    },
    buyer: {
      type: 'string',
      required: false
    },
    seller: {
      type: 'string',
      required: true
    }
  },

};

