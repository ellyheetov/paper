import React, { type FC, type ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';
import { useSidebar } from './SidebarContext';
import styles from './Sidebar.module.css';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { NAVIGATION_PATHS } from '@site/src/constants/path';

const DEFAULT_SELECTED_ITEM = 'home'

export interface NavigationItem {
  name: string;
  path: string;
  icon?: ReactNode;
  count?: number;
}

interface SidebarNavigationProps {
  items: NavigationItem[];
}

const SidebarNavigation: FC<SidebarNavigationProps> = ({ items }) => {
  const history = useHistory();
  const location = useLocation();

  const { isExpanded, toggleSidebar } = useSidebar();

  const checkIsSelected = (path: string): boolean => {
    if (path === NAVIGATION_PATHS.HOME) {
      console.log(location.pathname)
      return location.pathname === NAVIGATION_PATHS.HOME
    }
    return location.pathname.startsWith(path)
  }

  const handleClick = (name: string, path: string) => {
    history.push(path);
  };

  return (
    <aside className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed}`}>
      <section className={styles.header}>
        <div className={styles.headerText}>
          <h1>ellyheetov</h1>
        </div>

        <div className={styles.toggleButtonContainer}>
          <button onClick={toggleSidebar} className={styles.toggleButton}>
            {isExpanded ? (
              <ChevronDoubleLeftIcon className={styles.icon} />
            ) : (
              <ChevronDoubleRightIcon className={styles.icon} />
            )}
          </button>
        </div>
      </section>
      <div className={styles.headerText}>
        <p>Welcome to my playground!</p>
      </div>

      {/* 네비게이션 아이템 */}
      {items.map(({ count, icon, name, path }) => {
        const isSelected = checkIsSelected(path)
        return (
          <div
            key={name}
            onClick={() => handleClick(name, path)}
            className={`${styles.navItem} ${isSelected ? styles.selected : ''}`}
          >
            {icon && <span className={styles.icon}>{icon}</span>}
            {isExpanded && <span className={styles.text}>{name}</span>}
            {isExpanded && count > 0 && <span className={styles.count}>{count}</span>}
          </div>
        );
      })}

      {/* 사이드바 푸터 */}
      {isExpanded && (
        <footer className={styles.footer}>
          <p>Powered by ellyheetov</p>
        </footer>
      )}
    </aside>
  );
};

export default SidebarNavigation;