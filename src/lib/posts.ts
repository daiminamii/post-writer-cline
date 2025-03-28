import { supabase } from "./supabase";

export type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
};

// ダミーデータ（開発用）
const dummyPosts: Post[] = [
  {
    id: "1",
    title: "はじめての投稿",
    content: "これは最初のブログ投稿です。ここに内容が入ります。",
    created_at: new Date().toISOString(),
    user_id: "user-1",
  },
  {
    id: "2",
    title: "Next.jsについて",
    content:
      "Next.jsは素晴らしいReactフレームワークです。サーバーサイドレンダリングやAPIルートなど、多くの機能を提供しています。",
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1日前
    user_id: "user-1",
  },
];

export async function getPosts() {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
      // 開発用にダミーデータを返す
      return dummyPosts;
    }

    return data as Post[];
  } catch (error) {
    console.error("Error fetching posts:", error);
    // 開発用にダミーデータを返す
    return dummyPosts;
  }
}

export async function getPostById(id: string) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching post:", error);
      // 開発用にダミーデータを返す
      return dummyPosts.find((post) => post.id === id) || null;
    }

    return data as Post;
  } catch (error) {
    console.error("Error fetching post:", error);
    // 開発用にダミーデータを返す
    return dummyPosts.find((post) => post.id === id) || null;
  }
}

export async function createPost(post: Omit<Post, "id" | "created_at">) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .insert([post])
      .select();

    if (error) {
      console.error("Error creating post:", error);
      // 開発用にダミーデータを返す
      const newPost: Post = {
        id: (dummyPosts.length + 1).toString(),
        title: post.title,
        content: post.content,
        created_at: new Date().toISOString(),
        user_id: post.user_id,
      };
      dummyPosts.unshift(newPost);
      return newPost;
    }

    return data[0] as Post;
  } catch (error) {
    console.error("Error creating post:", error);
    // 開発用にダミーデータを返す
    const newPost: Post = {
      id: (dummyPosts.length + 1).toString(),
      title: post.title,
      content: post.content,
      created_at: new Date().toISOString(),
      user_id: post.user_id,
    };
    dummyPosts.unshift(newPost);
    return newPost;
  }
}

export async function updatePost(
  id: string,
  post: Partial<Omit<Post, "id" | "created_at">>
) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .update(post)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating post:", error);
      // 開発用にダミーデータを更新
      const postIndex = dummyPosts.findIndex((p) => p.id === id);
      if (postIndex !== -1) {
        dummyPosts[postIndex] = {
          ...dummyPosts[postIndex],
          ...post,
        };
        return dummyPosts[postIndex];
      }
      return null;
    }

    return data[0] as Post;
  } catch (error) {
    console.error("Error updating post:", error);
    // 開発用にダミーデータを更新
    const postIndex = dummyPosts.findIndex((p) => p.id === id);
    if (postIndex !== -1) {
      dummyPosts[postIndex] = {
        ...dummyPosts[postIndex],
        ...post,
      };
      return dummyPosts[postIndex];
    }
    return null;
  }
}

export async function deletePost(id: string) {
  try {
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      console.error("Error deleting post:", error);
      // 開発用にダミーデータから削除
      const postIndex = dummyPosts.findIndex((p) => p.id === id);
      if (postIndex !== -1) {
        dummyPosts.splice(postIndex, 1);
      }
      return true;
    }

    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    // 開発用にダミーデータから削除
    const postIndex = dummyPosts.findIndex((p) => p.id === id);
    if (postIndex !== -1) {
      dummyPosts.splice(postIndex, 1);
    }
    return true;
  }
}
