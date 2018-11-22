/**
 * Review.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    comment: {
      type: 'string',
      defaultsTo: 'NO COMMENTARY'
    },
    numStars: {
      type: 'number',
      columnType: 'float',
      defaultsTo: 5.0
    },
    id_reviewer: {
      type: 'string',
      required: true
    }
  },

  areValidParameters: (keys) => {
    if (!keys) {
      return false;
    }
    for (const key in Review.attributes) {
      if (Review.attributes.hasOwnProperty(key) 
          && Review.attributes[key].required && !keys.includes(key)) {
        return false;
      }
    }
    return true;
  }

};

