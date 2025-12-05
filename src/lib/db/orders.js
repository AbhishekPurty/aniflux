import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const dbName = 'aniflux';
const collectionName = 'orders';

/**
 * Create a new order
 * @param {Object} orderData - Order data (userId, items, total, etc.)
 * @returns {Promise<Object>} Insert result
 */
export async function createOrder(orderData) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    
    const result = await db.collection(collectionName).insertOne({
      userId: new ObjectId(orderData.userId),
      items: orderData.items.map(item => ({
        productId: new ObjectId(item.productId),
        quantity: item.quantity,
        price: item.price,
      })),
      total: orderData.total,
      status: orderData.status || 'pending',
      stripePaymentIntentId: orderData.stripePaymentIntentId || '',
      createdAt: new Date(),
    });
    
    return result;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

/**
 * Get all orders for a user
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of orders
 */
export async function getUserOrders(userId) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const orders = await db.collection(collectionName)
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray();
    return orders;
  } catch (error) {
    console.error('Error getting user orders:', error);
    throw error;
  }
}

/**
 * Get order by ID
 * @param {string} id - Order ID
 * @returns {Promise<Object|null>} Order object or null
 */
export async function getOrderById(id) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const order = await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
    return order;
  } catch (error) {
    console.error('Error getting order by ID:', error);
    throw error;
  }
}

/**
 * Update order status
 * @param {string} id - Order ID
 * @param {string} status - New status
 * @returns {Promise<Object>} Update result
 */
export async function updateOrderStatus(id, status) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    
    const result = await db.collection(collectionName).updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );
    
    return result;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}
