import { type FC, type ReactNode, useState } from 'react';
import { useHistory } from '@docusaurus/router';
import styles from './Sidebar.module.css';

export interface NavigationItem {
  name: string;
  icon?: ReactNode;
  count?: number;
  path: string;
}

interface SidebarNavigationProps {
  items: NavigationItem[];
}

const SidebarNavigation: FC<SidebarNavigationProps> = ({ items }) => {
  const history = useHistory();

  const [selectedItem, setSelectedItem] = useState(items?.[0]?.name || '');

  const handleClick = (name: string, path: string) => {
    setSelectedItem(name);
    history.push(path);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.text}>
        <h1>ellyheetov</h1>
        <p>Welcome to my playground! </p>
      </div>

      {items.map(({ count, icon, name, path }) => {
        const isSelected = selectedItem === name;
        return (
          <div
            key={name}
            onClick={() => handleClick(name, path)}
            className={`${styles.navItem} ${isSelected ? styles.selected : ''}`}
          >
            {icon && <span className={styles.icon}>{icon}</span>}
            <span className={styles.text}>{name}</span>
            {count > 0 && <span className={styles.count}>{count}</span>}
          </div>
        );
      })}
      <footer className={styles.footer}>
        <p>Powered by ellyheetov</p>
      </footer>
    </aside>
  );
};

export default SidebarNavigation;