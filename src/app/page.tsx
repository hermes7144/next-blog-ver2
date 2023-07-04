import FeaturedPosts from '@/components/FeaturedPosts';
import Hero from '../components/Hero';
import CarouselPosts from '@/components/CarouselPosts';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedPosts />
      <CarouselPosts />
    </>
  );
}

