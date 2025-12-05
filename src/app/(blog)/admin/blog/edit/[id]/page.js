import { notFound } from 'next/navigation';
import Card from '@/components/ui/Card';
import BlogPostForm from '@/components/blog/BlogPostForm';

export const metadata = {
  title: 'Edit Blog Post - Aniflux',
  description: 'Edit blog post',
};

async function getBlogPost(id) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blog/${id}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return null;
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export default async function EditBlogPostPage({ params }) {
  const post = await getBlogPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Blog Post</h1>
      <Card>
        <BlogPostForm initialData={post} isEditing={true} />
      </Card>
    </div>
  );
}

