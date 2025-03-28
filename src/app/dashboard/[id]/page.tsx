import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPostById } from "@/lib/posts";

interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostById(params.id);

  if (!post) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">投稿が見つかりません</h1>
        <Link href="/dashboard">
          <Button>ダッシュボードに戻る</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">投稿詳細</h1>
        <Link href="/dashboard">
          <Button variant="outline">戻る</Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {new Date(post.created_at).toLocaleDateString("ja-JP")}
          </p>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-wrap">{post.content}</div>
        </CardContent>
      </Card>
    </div>
  );
}
