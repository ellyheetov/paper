import React, { useState } from 'react';
import styles from '../css/Sidebar.module.css';

interface NavigationItem {
  name: string;
  icon?: string; // 아이콘 URL
  count?: number; // 게시글 개수
}

interface SidebarNavigationProps {
  items: NavigationItem[];
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<string>(items[0]?.name || '');

  const handleClick = (itemName: string) => {
    setSelectedItem(itemName);
  };

  return (
    <div className={styles.sidebar}>
      <div class="container">
        <h1>ellyheetov</h1>
        <p>Welcome to my playground!</p>
      </div>

      {items.map((item) => {
        const isSelected = selectedItem === item.name;
        return (
          <div
            key={item.name}
            onClick={() => handleClick(item.name)}
            className={`${styles.navItem} ${isSelected ? styles.selected : ''}`}
          >
            {item.icon && (
              <span className={styles.icon}> {item.icon} </span>
            )}

            <span className={styles.text}>{item.name}</span>
            {item.count && item.count > 0 && (
              <span className={styles.count}>{item.count}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SidebarNavigation;