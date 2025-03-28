import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPosts } from "@/lib/posts";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">ブログ</h1>

      {posts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">まだ投稿がありません</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="h-full">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {new Date(post.created_at).toLocaleDateString("ja-JP")}
                </p>
                <p className="line-clamp-3">{post.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
