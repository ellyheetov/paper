import Layout from '@theme/Layout';
import styles from './index.module.css';
import { devposts } from '../data/devposts';
import { blogposts } from '../data/blogposts';
import { bookreviews } from '../data/bookreviews';
import PostCardList from '../components/PostCardList';
import BookCardList from '../components/BookCardList';

export default function Home(): JSX.Element {
  return (
    <Layout>
      {/* 메인 컨텐츠 */}
      <main className={styles.content}>
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Dev Posts</h1>
        <PostCardList posts={devposts.reverse()} />
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Book Reviews</h1>
        <BookCardList posts={bookreviews.reverse()} />
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Blog Posts</h1>
        <PostCardList posts={blogposts.reverse()} />
      </main>
    </Layout>
  )
}