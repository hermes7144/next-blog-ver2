import { getPostData } from '@/service/posts';
import PostsPage from '../page';
import MarkdownViewer from '@/components/MarkdownViewer';

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params: { slug } }: Props) {
  const post = await getPostData(slug);

  return (
    <>
      {post.title}
      <MarkdownViewer content={post.content} />
    </>
  );
}
