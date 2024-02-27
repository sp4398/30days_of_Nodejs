const mongoose = require('mongoose');
const Product = require('./models/Product'); 


function createProductNameIndex() {
  const productModel = mongoose.model('Product', Product);

  productModel.createIndex({ name: 1 }, (err) => {
    if (err) {
      console.error('Error creating index:', err);
    } else {
      console.log('Index on "name" field created successfully');
    }
  });
}

createProductNameIndex();
