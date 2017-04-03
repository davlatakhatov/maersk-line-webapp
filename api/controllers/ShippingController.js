/**
 * ShippingController
 *
 * @description :: Server-side logic for managing shippings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 
// sails generate api shipping
module.exports = {
	
	'new': function (req, res) {
		res.view();
	},

	create: function (req, res, next) {

		// create a shipping with the params sent from
		// the book-a-shipping from -> new.ejs
		Shipping.create( req.params.all(), function shippingCreated (err, shipping){

			if (err) {
	        console.log(err);
	        req.session.flash = {
	          err: err
	        }

	        // If error redirect back to book-a-shipping from 
	        return res.redirect('/shipping/new');
	      }

	        // Log shipping in
	        req.session.authenticated = true;
	        req.session.shipping = shipping;
		      

		      res.redirect('/shipping/show/'+shipping.id);
		});
	},

// render the profile view (e.g. /views/show.ejs)
  show: function (req, res, next) {
    Shipping.findOne(req.param('id'), function foundShipping (err, shipping) {
      if (err) return next(err);
      if (!shipping) return next();
      res.view({
        shipping: shipping
      });
    });
  },

  index: function (req, res, next) {

    // Get an array of all shippings in the Shipping collection(e.g. table)
    Shipping.find(function foundShippings (err, shippings) {
      if (err) return next(err);
      // pass the array down to the /views/index.ejs page
      res.view({
        shippings: shippings
      });
    });
  },

  // render the edit view (e.g. /views/edit.ejs)
  edit: function (req, res, next) {

    // Find the shipping from the id passed in via params
    Shipping.findOne(req.param('id'), function foundShipping (err, shipping) {
      if (err) return next(err);
      if (!shipping) return next('Shipping doesn\'t exist.');
      
      res.view({
        shipping: shipping
      });
    });
  },

  // process the info from edit view
  update: function (req, res, next) {
    Shipping.update(req.param('id'), req.params.all(), function shippingUpdated (err) {
      if (err) {
        return res.redirect('/shipping/edit/' + req.param('id'));
      }

      res.redirect('/shipping/show/' + req.param('id'));
    });
  },

  destroy: function (req, res, next) {

    Shipping.findOne(req.param('id'), function foundShipping (err, shipping) {
      if (err) return next(err);

      if (!shipping) return next('Shipping doesn\'t exist.');

      Shipping.destroy(req.param('id'), function shippingDestroyed(err) {
        if (err) return next(err);

      });

      res.redirect('/shipping');  
      
    });
  }

};

