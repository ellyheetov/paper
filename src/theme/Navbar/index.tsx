import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocation} from '@docusaurus/router';
import {useColorMode} from '@docusaurus/theme-common';
import ColorModeToggle from '@theme/ColorModeToggle';
import styles from './styles.module.css';

type Section = {id: string; label: string};

// 떠 있는 유리 툴바: 왼쪽 이름, 가운데 세그먼트 탭(섹션), 오른쪽 다크 모드 토글
// 홈에서는 즐겨찾기가 같은 링크를 보여 주니 탭을 숨김
export default function Navbar() {
  const {baseUrl, customFields} = useDocusaurusContext().siteConfig;
  const sections = customFields.sections as Section[];
  const isHome = useLocation().pathname.replace(/\/$/, '') === baseUrl.replace(/\/$/, '');
  const {colorMode, setColorMode} = useColorMode();

  return (
    // 'navbar' 클래스: 목차 하이라이트(useTOCHighlight)가 document.querySelector('.navbar')로 툴바 높이를 읽음
    <nav className={`navbar ${styles.toolbar}`}>
      <Link to="/" className={styles.brand} aria-label="홈">
        <img src="https://github.com/ellyheetov.png" alt="" className={styles.avatar} />
        <span className={styles.name}>ellyheetov</span>
      </Link>
      {!isHome && (
        <div className={styles.segments}>
          {sections.map(({id, label}) => (
            <Link key={id} to={`/${id}`} isNavLink className={styles.segment} activeClassName={styles.active}>
              {label}
            </Link>
          ))}
        </div>
      )}
      <ColorModeToggle className={styles.toggle} value={colorMode} onChange={setColorMode} />
    </nav>
  );
}
