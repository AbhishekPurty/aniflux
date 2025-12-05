import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';
import Card from '@/components/ui/Card';

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
      <Link href="/blog" className="text-anime-cyan hover:text-anime-orange mb-4 inline-block transition-colors">
        ← Back to Blog
      </Link>
      
      <article>
        {post.featuredImage && (
          <Card variant="gunmetal" padding="none" className="mb-8">
            <div className="relative h-96 w-full bg-black rounded-lg overflow-hidden">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          </Card>
        )}
        
        <header className="mb-8">
          {post.category && (
            <span className="inline-block bg-anime-orange text-black text-sm font-medium px-3 py-1 rounded-full mb-4 font-heading">
              {post.category}
            </span>
          )}
          
          <h1 className="text-4xl font-bold text-white mb-4 font-heading">{post.title}</h1>
          
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>
              {post.publishedAt
                ? format(new Date(post.publishedAt), 'MMMM d, yyyy')
                : format(new Date(post.createdAt), 'MMMM d, yyyy')}
            </span>
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2">
                {post.tags.map((tag, index) => (
                  <span key={index} className="text-anime-cyan">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>
        
        {post.excerpt && (
          <Card variant="gunmetal" className="mb-8">
            <p className="text-xl text-gray-300 italic">{post.excerpt}</p>
          </Card>
        )}
        
        <Card variant="white" className="prose prose-lg max-w-none">
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Card>
      </article>
    </div>
  );
}
