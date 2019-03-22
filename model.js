'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromoSchema = new Schema({
  title: String,
  date: String,
  banner: String
});

module.exports = mongoose.model('Promo', PromoSchema);