'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function BlogEditor({ content = '', onChange }) {
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: content,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none min-h-[400px] p-4 focus:outline-none',
      },
    },
  });

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
        
        if (editor) {
          editor.chain().focus().setImage({ src: data.url }).run();
        }
      } catch (error) {
        console.error('Image upload error:', error);
        alert('Failed to upload image');
      } finally {
        setIsUploading(false);
      }
    };

    input.click();
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-300 rounded-lg">
      <div className="border-b border-gray-300 p-2 flex gap-2 flex-wrap">
        <Button
          type="button"
          variant={editor.isActive('bold') ? 'primary' : 'outline'}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="text-sm"
        >
          Bold
        </Button>
        <Button
          type="button"
          variant={editor.isActive('italic') ? 'primary' : 'outline'}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="text-sm"
        >
          Italic
        </Button>
        <Button
          type="button"
          variant={editor.isActive('heading', { level: 1 }) ? 'primary' : 'outline'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className="text-sm"
        >
          H1
        </Button>
        <Button
          type="button"
          variant={editor.isActive('heading', { level: 2 }) ? 'primary' : 'outline'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className="text-sm"
        >
          H2
        </Button>
        <Button
          type="button"
          variant={editor.isActive('bulletList') ? 'primary' : 'outline'}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="text-sm"
        >
          List
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleImageUpload}
          disabled={isUploading}
          className="text-sm"
        >
          {isUploading ? 'Uploading...' : 'Image'}
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

