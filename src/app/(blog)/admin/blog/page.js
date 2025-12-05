'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { format } from 'date-fns';

export default function BlogDashboardPage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog?status=all');
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      } else if (res.status === 401) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-anime-cyan text-black';
      case 'draft':
        return 'bg-anime-yellow text-black';
      default:
        return 'bg-anime-gunmetal text-gray-300';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white font-heading">Blog Dashboard</h1>
        <Link href="/admin/blog/create">
          <Button variant="primary">Create New Post</Button>
        </Link>
      </div>
      
      {posts.length === 0 ? (
        <Card variant="gunmetal">
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">You haven't created any blog posts yet.</p>
            <Link href="/admin/blog/create">
              <Button variant="primary">Create Your First Post</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post._id} variant="gunmetal">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-white font-heading">{post.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>
                      {post.publishedAt
                        ? format(new Date(post.publishedAt), 'MMM d, yyyy')
                        : format(new Date(post.createdAt), 'MMM d, yyyy')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium font-heading ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                    {post.category && (
                      <span className="text-anime-cyan">{post.category}</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/blog/edit/${post._id}`}>
                    <Button variant="outline" className="text-sm">Edit</Button>
                  </Link>
                  {post.status === 'published' && (
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="secondary" className="text-sm">View</Button>
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
