"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createPost, updatePost, Post } from "@/lib/posts";

interface PostFormProps {
  post?: Post;
  isEditing?: boolean;
}

export function PostForm({ post, isEditing = false }: PostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isEditing && post) {
        await updatePost(post.id, { title, content });
      } else {
        // 実際のアプリケーションでは、ログインしているユーザーのIDを使用します
        await createPost({ title, content, user_id: "user-1" });
      }
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "投稿を編集" : "新しい投稿"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              タイトル
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="投稿のタイトルを入力"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              内容
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="投稿の内容を入力"
              className="w-full min-h-[200px] p-2 border rounded-md"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            キャンセル
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "送信中..." : isEditing ? "更新" : "投稿"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
