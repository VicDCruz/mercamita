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

