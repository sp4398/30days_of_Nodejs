const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number
});

const Product = mongoose.model('Product', productSchema);
async function createProduct(product) {
  try {
    const newProduct = new Product(product);
    await newProduct.save();
    console.log('Product created successfully:', newProduct);
  } catch (error) {
    console.error('Error creating product:', error.message);
  }
}


async function getAllProducts() {
  try {
    const products = await Product.find();
    console.log('All Products:', products);
    return products;
  } catch (error) {
    console.error('Error retrieving products:', error.message);
    return [];
  }
}

async function updateProduct(productId, updatedProduct) {
  try {
    const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
    console.log('Product updated successfully:', product);
  } catch (error) {
    console.error('Error updating product:', error.message);
  }
}

async function deleteProduct(productId) {
  try {
    await Product.findByIdAndDelete(productId);
    console.log('Product deleted successfully');
  } catch (error) {
    console.error('Error deleting product:', error.message);
  }
}

mongoose.connect('mongodb://localhost:27017/my_database');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');

const newProduct = { name: 'Example Product', price: 29.99, quantity: 100 };
createProduct(newProduct)
  .then(() => getAllProducts())
  .then(products => {
    if (products.length > 0) {
      const productIdToUpdate = products[0]._id;
      const updatedProduct = { price: 39.99 };
      return updateProduct(productIdToUpdate, updatedProduct);
    }
  })
  .then(() => getAllProducts())
  .then(products => {
    if (products.length > 0) {
      const productIdToDelete = products[0]._id;
      return deleteProduct(productIdToDelete);
    }
  })
  .then(() => getAllProducts());
})
