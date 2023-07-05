import { getFeaturedAllPosts } from '@/service/posts';
import PostGrid from './PostGrid';

export default async function FeaturedPosts() {
  const posts = await getFeaturedAllPosts();

  return (
    <section className='my-4'>
      <h2 className='text-2xl font-bold my-2'>Featured Posts</h2>

      <PostGrid posts={posts} />
    </section>
  );
}
