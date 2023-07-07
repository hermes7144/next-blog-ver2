import { metadata } from './../app/layout';
import { readFile } from 'fs/promises';
import path from 'path';
import { promises as fs } from 'fs';
import { cache } from 'react';

export type Post = {
  title: string;
  description: string;
  date: string;
  category: string;
  path: string;
  featured: boolean;
};

export type PostData = Post & { content: string; next: Post | null; prev: Post | null };

export function getFeaturedPosts(): Promise<Post[]> {
  return getAllPosts().then((posts) => posts.filter((post) => post.featured));
}

export function getNonFeaturedAllPosts(): Promise<Post[]> {
  return getAllPosts().then((posts) => posts.filter((post) => !post.featured));
}

export const getAllPosts = cache(async () => {
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  return readFile(filePath, 'utf-8')
    .then<Post[]>(JSON.parse)
    .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)));
});

export async function getPostData(fileName: string): Promise<PostData> {
  const filePath = path.join(process.cwd(), 'data', 'posts', `${fileName}.md`);
  const posts = await getAllPosts();
  const post = posts.find((post) => post.path === fileName);

  if (!post) throw new Error(`${fileName}에 해당하는 포스트를 찾을 수 없음`);

  const index = posts.indexOf(post);
  const next = index > 0 ? posts[index - 1] : null;
  const prev = index < posts.length ? posts[index + 1] : null;

  if (!metadata) throw new Error(`${fileName}에 해당하는 포스트를 찾을 수 없음`);
  const content = await readFile(filePath, 'utf-8');
  return { ...post, content, next, prev };
}
