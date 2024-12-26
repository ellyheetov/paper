import SidebarNavigation, { type NavigationItem } from '../Layout/Sidebar';
import { HomeIcon, BeakerIcon, BookOpenIcon, CalendarIcon, Bars3Icon } from '@heroicons/react/24/outline';
import LayoutOriginal from '@theme-original/Layout';
import { devposts } from '../../data/devposts';
import { blogposts } from '../../data/blogposts';
import { bookreviews } from '../../data/bookreviews';

export default function Layout(props) {
  const navigationItems: NavigationItem[] = [
    { name: 'Home', icon: <HomeIcon className="size-5 text-gray-500" />, path: '/treasure' },
    { name: 'DevLog', icon: <BeakerIcon className="size-5 text-gray-500" />, count: devposts.length, path: '/treasure/docs/devlog/intro' },
    { name: 'Books', icon: <BookOpenIcon className="size-5 text-gray-500" />, count: bookreviews.length, path: '/treasure/docs/books/intro' },
    { name: 'Blog', icon: <CalendarIcon className="size-5 text-gray-500" />, count: blogposts.length, path: '/treasure/blog' },
  ]

  return (
    <div style={{ display: 'flex' }}>
      <SidebarNavigation items={navigationItems} />

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: '250px' }}>
        <LayoutOriginal {...props} />
      </div>
    </div>
  );
}