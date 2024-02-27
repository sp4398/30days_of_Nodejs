const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Category = mongoose.model('Category', categorySchema);
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});
const ProductWithCategory = mongoose.model('ProductWithCategory', productSchema);

async function getProductsPopulatedWithCategory() {
  try {
    const products = await ProductWithCategory.find().populate('category').exec();
    
    return products;
  } catch (error) {
    console.error('Error fetching products with category details:', error);
    throw error;
  }
}


const category1 = new Category({ name: 'Electronics', description: 'Electronic devices' });
const category2 = new Category({ name: 'Clothing', description: 'Apparel and clothing items' });

category1.save();
category2.save();

const product1 = new ProductWithCategory({ name: 'Laptop', price: 1200, category: category1._id });
const product2 = new ProductWithCategory({ name: 'T-shirt', price: 25, category: category2._id });

product1.save();
product2.save();

getProductsPopulatedWithCategory().then((result) => {
  console.log(result);
}).catch((error) => {
  console.error('Test case failed:', error);
});
