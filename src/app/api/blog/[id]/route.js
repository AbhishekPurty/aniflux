import { NextResponse } from 'next/server';
import { updateBlogPost, deleteBlogPost, getBlogPostById, getBlogPostBySlug } from '@/lib/db/blog';
import { getSession, isBlogWriter, isAdmin } from '@/lib/auth';
import { ObjectId } from 'mongodb';

// Helper to check if string is a valid MongoDB ObjectId
function isValidObjectId(id) {
  return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    // If it's a valid ObjectId, treat as ID, otherwise treat as slug
    if (isValidObjectId(id)) {
      const post = await getBlogPostById(id);
      if (!post) {
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(post, { status: 200 });
    } else {
      // Treat as slug
      const post = await getBlogPostBySlug(id);
      if (!post) {
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(post, { status: 200 });
    }
  } catch (error) {
    console.error('Error getting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
    
    // PUT only works with IDs, not slugs
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid post ID' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Get the existing post to check ownership
    const existingPost = await getBlogPostById(id);

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Check if user is the author or admin
    const isAuthor = existingPost.authorId.toString() === session.user.id;
    const admin = await isAdmin();
    
    if (!isAuthor && !admin) {
      return NextResponse.json(
        { error: 'Unauthorized - You can only edit your own posts' },
        { status: 403 }
      );
    }

    // Check if user has permission to write
    const canWrite = await isBlogWriter();
    if (!canWrite) {
      return NextResponse.json(
        { error: 'Unauthorized - Blog writer or admin access required' },
        { status: 403 }
      );
    }

    const result = await updateBlogPost(id, body);

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Blog post updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;

    // DELETE only works with IDs, not slugs
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid post ID' },
        { status: 400 }
      );
    }

    // Get the existing post to check ownership
    const existingPost = await getBlogPostById(id);

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Check if user is the author or admin
    const isAuthor = existingPost.authorId.toString() === session.user.id;
    const admin = await isAdmin();
    
    if (!isAuthor && !admin) {
      return NextResponse.json(
        { error: 'Unauthorized - You can only delete your own posts' },
        { status: 403 }
      );
    }

    const result = await deleteBlogPost(id);

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Blog post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
