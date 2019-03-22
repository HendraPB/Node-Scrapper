'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromoSchema = new Schema({
	category: String,
	product: {
	    type: [{
		  	title: String,
		  	date: String,
		  	banner: String
	  	}]
  	}
});

module.exports = mongoose.model('Promo', PromoSchema);