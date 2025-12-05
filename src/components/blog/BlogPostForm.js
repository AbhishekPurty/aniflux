'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import BlogEditor from './BlogEditor';

const blogPostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  excerpt: z.string().optional(),
  category: z.string().optional(),
  tags: z.string().optional(),
  status: z.enum(['draft', 'published']),
});

export default function BlogPostForm({ initialData, isEditing = false }) {
  const router = useRouter();
  const [content, setContent] = useState(initialData?.content || '');
  const [featuredImage, setFeaturedImage] = useState(initialData?.featuredImage || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(blogPostSchema),
    defaultValues: initialData || {
      title: '',
      slug: '',
      excerpt: '',
      category: '',
      tags: '',
      status: 'draft',
    },
  });

  // Auto-generate slug from title
  const title = watch('title');
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setValue('title', newTitle);
    if (!isEditing) {
      const slug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setValue('slug', slug);
    }
  };

  const handleImageUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'blog');

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          throw new Error('Upload failed');
        }

        const data = await res.json();
        setFeaturedImage(data.url);
        toast.success('Image uploaded successfully!');
      } catch (error) {
        console.error('Image upload error:', error);
        toast.error('Failed to upload image');
      } finally {
        setIsUploading(false);
      }
    };

    input.click();
  };

  const onSubmit = async (data) => {
    if (!content || content.trim() === '') {
      toast.error('Content is required');
      return;
    }

    setIsLoading(true);
    try {
      const tagsArray = data.tags
        ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : [];

      const payload = {
        ...data,
        content,
        featuredImage,
        tags: tagsArray,
      };

      const url = isEditing
        ? `/api/blog/${initialData._id}`
        : '/api/blog';
      
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to save post');
      }

      toast.success(isEditing ? 'Post updated successfully!' : 'Post created successfully!');
      router.push('/admin/blog');
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Title"
        name="title"
        required
        error={errors.title?.message}
        {...register('title')}
        onChange={handleTitleChange}
      />

      <Input
        label="Slug"
        name="slug"
        required
        error={errors.slug?.message}
        disabled={isEditing}
        {...register('slug')}
        placeholder="auto-generated-from-title"
      />

      <Input
        label="Excerpt"
        name="excerpt"
        error={errors.excerpt?.message}
        {...register('excerpt')}
        placeholder="Brief description of the post"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Category"
          name="category"
          error={errors.category?.message}
          {...register('category')}
        />

        <Input
          label="Tags (comma-separated)"
          name="tags"
          error={errors.tags?.message}
          {...register('tags')}
          placeholder="tag1, tag2, tag3"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2 font-heading">
          Featured Image
        </label>
        {featuredImage && (
          <div className="mb-2">
            <img src={featuredImage} alt="Featured" className="h-32 w-auto rounded" />
          </div>
        )}
        <Button
          type="button"
          variant="outline"
          onClick={handleImageUpload}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : featuredImage ? 'Change Image' : 'Upload Image'}
        </Button>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2 font-heading">
          Content <span className="text-red-500">*</span>
        </label>
        <BlogEditor content={content} onChange={setContent} />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2 font-heading">
          Status
        </label>
        <select
          {...register('status')}
          className="w-full px-4 py-2 border border-anime-gunmetal rounded-lg bg-anime-gunmetal text-white focus:outline-none focus:ring-2 focus:ring-anime-cyan"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

