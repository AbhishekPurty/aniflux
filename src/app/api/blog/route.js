import { NextResponse } from 'next/server';
import { getBlogPosts, createBlogPost } from '@/lib/db/blog';
import { getSession, isBlogWriter } from '@/lib/auth';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status') || 'published';

    const filters = {};
    if (category) {
      filters.category = category;
    }

    // Only show published posts to public, or all posts to authenticated writers/admins
    const session = await getSession();
    const showAll = session && (await isBlogWriter());
    const postStatus = showAll ? status : 'published';

    const posts = await getBlogPosts(postStatus, filters);
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('Error getting blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is blog writer or admin
    const canWrite = await isBlogWriter();
    if (!canWrite) {
      return NextResponse.json(
        { error: 'Unauthorized - Blog writer or admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, slug, content, excerpt, status, featuredImage, category, tags } = body;

    // Validation
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required' },
        { status: 400 }
      );
    }

    const result = await createBlogPost({
      title,
      slug,
      content,
      excerpt,
      status: status || 'draft',
      featuredImage,
      category,
      tags: tags || [],
      authorId: session.user.id,
    });

    return NextResponse.json(
      {
        message: 'Blog post created successfully',
        postId: result.insertedId.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

