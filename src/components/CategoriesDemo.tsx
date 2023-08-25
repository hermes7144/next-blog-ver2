import Link from 'next/link';

type Props = {
  categories: string[];
};

export default function CategoriesDemo({ categories }: Props) {
  return (
    <section className='text-center p-4'>
      <h2 className='text-lg font-bold border-b border-sky-500 mb-2'>Category</h2>
      <ul>
        {categories.map((category) => (
          <li className={`cursor-pointer hover:text-sky-500`} key={category}>
            <Link href={{ pathname: 'posts', query: { category: category } }}>{category}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
