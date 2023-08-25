import FeaturedPosts from '@/components/FeaturedPosts';
import Hero from '../components/Hero';
import CarouselPosts from '@/components/CarouselPosts';
import { Metadata } from 'next';

import { getAllPosts } from '@/service/posts';
import CategoriesDemo from '@/components/CategoriesDemo';

const ALL_POSTS = 'All Posts';

export const metadata: Metadata = {
  title: 'Kichan의 블로그',
  description: '풀스택 개발자 조기찬의 블로그',
};

export default async function Home() {
  const posts = await getAllPosts();
  const categories = [...new Set(posts.map((post) => post.category))];

  return (
    <>
      <Hero />
      <div className='flex'>
        <div>
          <FeaturedPosts />
        </div>
        <CategoriesDemo categories={[ALL_POSTS, ...categories]} />
      </div>
      <CarouselPosts />
    </>
  );
}

