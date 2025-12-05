import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const dbName = 'aniflux';
const collectionName = 'blogposts';

/**
 * Get blog posts
 * @param {string} status - Filter by status ('published', 'draft', or 'all')
 * @param {Object} filters - Additional filters (category, authorId, etc.)
 * @returns {Promise<Array>} Array of blog posts
 */
export async function getBlogPosts(status = 'published', filters = {}) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    
    const query = { ...filters };
    if (status !== 'all') {
      query.status = status;
    }
    
    const posts = await db.collection(collectionName)
      .find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .toArray();
    
    return posts;
  } catch (error) {
    console.error('Error getting blog posts:', error);
    throw error;
  }
}

/**
 * Get blog post by slug
 * @param {string} slug - Blog post slug
 * @returns {Promise<Object|null>} Blog post object or null
 */
export async function getBlogPostBySlug(slug) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const post = await db.collection(collectionName).findOne({ slug, status: 'published' });
    return post;
  } catch (error) {
    console.error('Error getting blog post by slug:', error);
    throw error;
  }
}

/**
 * Create a new blog post
 * @param {Object} postData - Blog post data
 * @returns {Promise<Object>} Insert result
 */
export async function createBlogPost(postData) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    
    const result = await db.collection(collectionName).insertOne({
      title: postData.title,
      slug: postData.slug,
      content: postData.content,
      excerpt: postData.excerpt || '',
      authorId: new ObjectId(postData.authorId),
      status: postData.status || 'draft',
      featuredImage: postData.featuredImage || '',
      category: postData.category || '',
      tags: postData.tags || [],
      publishedAt: postData.status === 'published' ? new Date() : null,
      createdAt: new Date(),
    });
    
    return result;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
}

/**
 * Update blog post
 * @param {string} id - Blog post ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} Update result
 */
export async function updateBlogPost(id, updateData) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    
    // If status is being changed to 'published', set publishedAt
    const update = { ...updateData, updatedAt: new Date() };
    if (updateData.status === 'published' && !updateData.publishedAt) {
      update.publishedAt = new Date();
    }
    
    const result = await db.collection(collectionName).updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );
    
    return result;
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
}

/**
 * Delete blog post
 * @param {string} id - Blog post ID
 * @returns {Promise<Object>} Delete result
 */
export async function deleteBlogPost(id) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
}
