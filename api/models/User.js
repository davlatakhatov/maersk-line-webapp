/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  // it takes the objects that have been saved and it compares against the db schema 
  // and only saving those attributes that exist in this file
  schema: true, // The schema. We can validate a data


  attributes: {

  	name: {
  		type: 'string',
  		required: true
  	},
    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true 
    },
    online: {
      type: 'boolean',
      defaultsTo: false
    },
    admin: {
       type: 'boolean',
       defaultsTo: false
     },
  	company: {
      type: 'string',
      required: true
    },  	    
  	encryptedPassword: {
  		type: 'string'
  	}

    // toJSON: function(){
    //   var obj = this.toObject();
    //   delete obj.password;
    //   delete obj.confirmation;
    //   delete obj.encryptedPassword;
    //   delete obj._csrf;
    //   return obj;
    // }    
  },


  beforeValidate: function (values, next) {
    console.log(values);
    if (typeof values.admin !== 'undefined') {
      if (values.admin === 'unchecked') {
        values.admin = false;
      } else  if (values.admin[1] === 'on') {
        values.admin = true;
      }
    }
     next();
  },

// Important note:
// Because waterline lifecycle callback names have changed 
// beforeValidation is now beforeValidate, and afterValidation is now afterValidate 
// http://stackoverflow.com/a/22480812/6290526﻿
  beforeCreate: function (values, next){

    // This checks to make sure the password and password confirmation match before creating record
    if (!values.password || values.password != values.confirmation) {
      return next({err: ["Password doesn\'t match password "]});
    }

    require('bcrypt').hash(values.password, 8, function passwordEncrypted(err, encryptedPassword) {
      if(err) return next(err);
      values.encryptedPassword = encryptedPassword;
      // values.online = true;
      next()
    });
  }
};





