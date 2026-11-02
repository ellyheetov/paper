import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Calendar, {type Section as CalendarSection} from '../components/Calendar';
import styles from './index.module.css';

type Section = CalendarSection & {icon: string};

// Safari 시작 페이지의 '즐겨찾기': 섹션 목록(docusaurus.config.ts) + GitHub
export default function Home() {
  const sections = useDocusaurusContext().siteConfig.customFields.sections as Section[];
  const favorites = [
    ...sections.map(({id, label, icon}) => ({label, to: `/${id}`, icon: <>{icon}</>})),
    {label: 'GitHub', to: 'https://github.com/ellyheetov', icon: <img src="https://github.com/ellyheetov.png" alt="" />},
  ];

  return (
    <Layout>
      <main className={`container ${styles.start}`}>
        <h1>Hi, There 👋🏻</h1>
        <p className={styles.tagline}>뉴스, 영어, 경제, 개발 공부와 읽은 책을 기록하는 공간</p>
        <h2>즐겨찾기</h2>
        <div className={styles.favorites}>
          {favorites.map(({label, to, icon}) => (
            <Link key={label} to={to} className={styles.tile}>
              <span className={styles.icon}>{icon}</span>
              {label}
            </Link>
          ))}
        </div>
        <h2 className={styles.spaced}>기록</h2>
        <div className={styles.calendarSlot}>
          <BrowserOnly>{() => <Calendar sections={sections} />}</BrowserOnly>
        </div>
      </main>
    </Layout>
  );
}
