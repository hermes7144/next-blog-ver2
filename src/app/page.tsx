import FeaturedPosts from '@/components/FeaturedPosts';
import Hero from '../components/Hero';
import CarouselPosts from '@/components/CarouselPosts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kichan의 블로그',
  description: '풀스택 개발자 조기찬의 블로그',
};

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedPosts />
      <CarouselPosts />
    </>
  );
}

