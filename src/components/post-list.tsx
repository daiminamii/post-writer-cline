import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "@/lib/posts";

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">投稿がありません</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link key={post.id} href={`/dashboard/${post.id}`}>
          <Card className="h-full hover:bg-muted/50 transition-colors">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {new Date(post.created_at).toLocaleDateString("ja-JP")}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
