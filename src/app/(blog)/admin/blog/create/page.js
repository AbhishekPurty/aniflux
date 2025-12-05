import Card from '@/components/ui/Card';
import BlogPostForm from '@/components/blog/BlogPostForm';

export const metadata = {
  title: 'Create Blog Post - Aniflux',
  description: 'Create a new blog post',
};

export default function CreateBlogPostPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-white mb-8 font-heading">Create New Blog Post</h1>
      <Card variant="gunmetal">
        <BlogPostForm />
      </Card>
    </div>
  );
}
