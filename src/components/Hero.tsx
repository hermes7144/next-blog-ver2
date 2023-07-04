import profile from '../../public/images/profile.jpg';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className='text-center'>
      <Image className='rounded-full mx-auto' src={profile} alt='profile' width={200} height={200} priority />
      <h2 className='text-3xl font-bold mt-2'>Hi, i`m Kichan</h2>
      <h3 className='text-xl font-semibold'>Full-stack engineer</h3>
      <p>Next.js를 열심히 공부중</p>
      <button className='bg-yellow-500 font-bold rounded-xl py-1 px-4 mt-2'>Contact me</button>
    </section>
  );
}
