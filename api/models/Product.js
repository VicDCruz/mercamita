/**
 * Product.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,

  attributes: {
    name: {
      type: 'string',
      required: false,
      defaultsTo: 'NONAME'
    },
    views: {
      type: 'number',
      required: false,
      defaultsTo: 0
    },
    price: {
      type: 'number',
      columnType: 'float',
      required: true,
    },
    description: {
      type: 'string',
      required: false
    },
    category: {
      type: 'json',
      required: false
    },
    tag: {
      type: 'string',
      required: false
    },
    images: {
      type: 'ref',
      columnType: 'array',
      required: false
    },
    buyer: {
      type: 'string',
      required: false
    },
    seller: {
      type: 'ref',
      columnType: 'string',
      required: true
    }
  },

  areValidParameters: (keys) => {
    if (!keys) {
      return false;
    }
    for (const key in Product.attributes) {
      if (Product.attributes.hasOwnProperty(key) 
          && Product.attributes[key].required && !keys.includes(key)) {
        return false;
      }
    }
    return true;
  }

};

