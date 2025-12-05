import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const dbName = 'aniflux';
const collectionName = 'products';

/**
 * Get all products
 * @param {Object} filters - Optional filters (category, etc.)
 * @returns {Promise<Array>} Array of products
 */
export async function getProducts(filters = {}) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const products = await db.collection(collectionName).find(filters).toArray();
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
}

/**
 * Get product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object|null>} Product object or null
 */
export async function getProductById(id) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const product = await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
    return product;
  } catch (error) {
    console.error('Error getting product by ID:', error);
    throw error;
  }
}

/**
 * Create a new product
 * @param {Object} productData - Product data
 * @returns {Promise<Object>} Insert result
 */
export async function createProduct(productData) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    
    const result = await db.collection(collectionName).insertOne({
      name: productData.name,
      description: productData.description || '',
      price: productData.price,
      imageUrl: productData.imageUrl || '',
      stock: productData.stock || 0,
      category: productData.category || '',
      createdAt: new Date(),
    });
    
    return result;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

/**
 * Update product
 * @param {string} id - Product ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} Update result
 */
export async function updateProduct(id, updateData) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    
    const result = await db.collection(collectionName).updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    
    return result;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

/**
 * Delete product
 * @param {string} id - Product ID
 * @returns {Promise<Object>} Delete result
 */
export async function deleteProduct(id) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}
