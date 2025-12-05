'use client';

import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

export default function BlogPostCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        {post.featuredImage && (
          <div className="relative h-48 w-full">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <div className="p-6">
          {post.category && (
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
              {post.category}
            </span>
          )}
          
          <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 line-clamp-2">
            {post.title}
          </h2>
          
          {post.excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              {post.publishedAt
                ? format(new Date(post.publishedAt), 'MMM d, yyyy')
                : format(new Date(post.createdAt), 'MMM d, yyyy')}
            </span>
            <span className="text-blue-600 hover:text-blue-800 font-medium">
              Read more →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

