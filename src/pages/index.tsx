import SidebarNavigation from '../components/Sidebar';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { HomeIcon, BeakerIcon, BookOpenIcon, CalendarIcon, Bars3Icon } from '@heroicons/react/24/outline';
import PostCardList from '../components/PostCardList';
import BookCardList from '../components/BookCardList';
import styles from './index.module.css';
import { devposts } from '../data/devposts';
import { blogposts } from '../data/blogposts';
import { bookreviews } from '../data/bookreviews';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const navigationItems = [
    { name: 'Home', icon: <HomeIcon className="size-5 text-gray-500" /> },
    { name: 'DevLog', icon: <BeakerIcon className="size-5 text-gray-500" />, count: devposts.length },
    { name: 'Books', icon: <BookOpenIcon className="size-5 text-gray-500" />, count: bookreviews.length },
    { name: 'Blog', icon: <CalendarIcon className="size-5 text-gray-500" />, count: blogposts.length },
  ]

  return (
    <div style={{ display: 'flex' }}>
      {/* 좌측 내비게이션 */}
      <SidebarNavigation items={navigationItems} />

      {/* 메인 컨텐츠 */}
      <main className={styles.content}>
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Dev Posts</h1>
        <PostCardList posts={devposts.reverse()} />
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Book Reviews</h1>
        <BookCardList posts={bookreviews.reverse()} />
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Blog Posts</h1>
        <PostCardList posts={blogposts.reverse()} />
      </main>
    </div>
  );
}