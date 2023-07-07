import Hero from '@/components/Hero';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About me',
  description: 'Kichan 커리어 소개',
};

const TITLE_CLASS = 'text-2xl font-bold text-gray-800 my-2';
export default function AboutPage() {
  return (
    <>
      <Hero />
      <section className='bg-gray-100 m-8 p-8 shadow-lg text-center'>
        <h2 className={TITLE_CLASS}>Who Am I?</h2>
        <p>
          개발을 사랑하는 풀스택 개발자 <br />
          사람과 디자인을~~~~
        </p>
        <h2 className={TITLE_CLASS}>Career</h2>
        <p>
          구글 <br />
          페이스북 <br />
          카카오
        </p>
        <h2 className={TITLE_CLASS}>Skills</h2>
        <p>
          React,Node <br />
          Git, Clean Code <br />
          VS Code, InteliJ, MongoDB
        </p>
      </section>
    </>
  );
}
