import SidebarNavigation, { type NavigationItem } from '../Layout/Sidebar';
import { SidebarProvider } from './Sidebar/SidebarContext'; 
import { HomeIcon, BeakerIcon, BookOpenIcon, CalendarIcon } from '@heroicons/react/24/outline';
import LayoutOriginal from '@theme-original/Layout';
import { devposts } from '../../data/devposts';
import { blogposts } from '../../data/blogposts';
import { bookreviews } from '../../data/bookreviews';
import { NAVIGATION_PATHS } from '@site/src/constants/path';

const navigationItems: NavigationItem[] = [
  { name: 'Home', icon: <HomeIcon className="size-5 text-gray-500" />, path: NAVIGATION_PATHS.HOME },
  { name: 'DevLog', icon: <BeakerIcon className="size-5 text-gray-500" />, count: devposts.length, path: NAVIGATION_PATHS.DOCS.DEVLOG },
  { name: 'Books', icon: <BookOpenIcon className="size-5 text-gray-500" />, count: bookreviews.length, path: NAVIGATION_PATHS.DOCS.BOOKS },
  { name: 'Blog', icon: <CalendarIcon className="size-5 text-gray-500" />, count: blogposts.length, path: NAVIGATION_PATHS.BLOG },
]

export default function Layout(props) {
  return (
    <SidebarProvider>
      <div style={{ display: 'flex' }}>
        {/* Sidebar Navigation */}
        <SidebarNavigation items={navigationItems} />

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          <LayoutOriginal {...props} />
        </div>
      </div>
    </SidebarProvider>
  );
}