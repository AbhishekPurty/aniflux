import BlogPostList from '@/components/blog/BlogPostList';

export const metadata = {
  title: 'Blog - Aniflux',
  description: 'Read our latest blog posts',
};

async function getBlogPosts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blog?status=published`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return [];
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 font-heading">Our Blog</h1>
        <p className="text-gray-400">Latest articles and updates</p>
      </div>
      
      <BlogPostList posts={posts} />
    </div>
  );
}
