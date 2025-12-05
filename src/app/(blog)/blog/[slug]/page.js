import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';

export const metadata = {
  title: 'Blog Post - Aniflux',
  description: 'Read our blog post',
};

async function getBlogPost(slug) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blog/${slug}`, {
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

export default async function BlogPostPage({ params }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/blog" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
        ← Back to Blog
      </Link>
      
      <article>
        {post.featuredImage && (
          <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <header className="mb-8">
          {post.category && (
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
          )}
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>
              {post.publishedAt
                ? format(new Date(post.publishedAt), 'MMMM d, yyyy')
                : format(new Date(post.createdAt), 'MMMM d, yyyy')}
            </span>
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2">
                {post.tags.map((tag, index) => (
                  <span key={index} className="text-blue-600">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>
        
        {post.excerpt && (
          <p className="text-xl text-gray-700 mb-8 italic">{post.excerpt}</p>
        )}
        
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}

