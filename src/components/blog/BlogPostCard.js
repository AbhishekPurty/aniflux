'use client';

import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

export default function BlogPostCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="bg-anime-gunmetal rounded-lg shadow-md overflow-hidden hover:shadow-neon-orange transition-all duration-200 cursor-pointer border border-anime-gunmetal">
        {post.featuredImage && (
          <div className="relative h-48 w-full bg-black">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-200 hover:scale-105"
            />
          </div>
        )}
        
        <div className="p-6">
          {post.category && (
            <span className="inline-block bg-anime-orange text-black text-xs font-medium px-2.5 py-0.5 rounded-full mb-2 font-heading">
              {post.category}
            </span>
          )}
          
          <h2 className="text-xl font-bold text-white mb-2 hover:text-anime-orange line-clamp-2 font-heading">
            {post.title}
          </h2>
          
          {post.excerpt && (
            <p className="text-gray-300 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>
              {post.publishedAt
                ? format(new Date(post.publishedAt), 'MMM d, yyyy')
                : format(new Date(post.createdAt), 'MMM d, yyyy')}
            </span>
            <span className="text-anime-cyan hover:text-anime-orange font-medium transition-colors">
              Read more →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
