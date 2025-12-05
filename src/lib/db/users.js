import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const dbName = 'aniflux';
const collectionName = 'users';

/**
 * Create a new user
 * @param {Object} userData - User data (email, password, role)
 * @returns {Promise<Object>} Insert result
 */
export async function createUser(userData) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    
    const result = await db.collection(collectionName).insertOne({
      email: userData.email,
      password: userData.password, // Should be hashed before calling this function
      role: userData.role || 'customer',
      createdAt: new Date(),
    });
    
    return result;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

/**
 * Find user by email
 * @param {string} email - User email
 * @returns {Promise<Object|null>} User object or null
 */
export async function findUserByEmail(email) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const user = await db.collection(collectionName).findOne({ email });
    return user;
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
}

/**
 * Find user by ID
 * @param {string} id - User ID
 * @returns {Promise<Object|null>} User object or null
 */
export async function findUserById(id) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const user = await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
    return user;
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw error;
  }
}

/**
 * Update user
 * @param {string} id - User ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} Update result
 */
export async function updateUser(id, updateData) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    
    const result = await db.collection(collectionName).updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    
    return result;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}
