import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PostList } from "@/components/post-list";
import { getPosts } from "@/lib/posts";

export default async function DashboardPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">記事投稿</h1>
        <Link href="/dashboard/new">
          <Button>新しい投稿</Button>
        </Link>
      </div>
      <PostList posts={posts} />
    </div>
  );
}
