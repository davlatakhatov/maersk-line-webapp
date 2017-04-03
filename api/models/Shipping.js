/**
 * Shipping.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  // it takes the objects that have been saved and it compares against the db schema 
  // and only saving those attributes that exist in this file
  schema: true, // The schema. We can validate a data

  attributes: {

  	cargo: {
  		type: 'string',
  		required: true
  	},  	
  	source: {
  		type: 'string',
  		required: true
  	},
  	destination: {
  		type: 'string',
  		required: true
  	},
  	date: {
  		type: 'string',
  		required: true
  	},  	
  	receiver: {
  		type: 'string',
  		required: true
  	},
  	receiverContact: {
  		type: 'string',
  		required: true,
  		unique: true
  	},
    goods: {
      type: 'string',
      required: true
    },
    containers: {
      type: 'string',
      required: true
    },

    // toJSON: function(){
    //   var obj = this.toObject();
    //   delete obj._csrf;
    //   return obj;
    // }

  }
};

