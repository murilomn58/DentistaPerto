import postsData from "@/../data/blog/posts.json";
import type { BlogPost } from "@/types";

const posts: BlogPost[] = postsData as BlogPost[];

export function getAllPosts(): BlogPost[] {
  return posts.sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
