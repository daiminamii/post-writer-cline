import { PostForm } from "@/components/post-form";

export default function NewPostPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">新しい投稿</h1>
      <PostForm />
    </div>
  );
}
