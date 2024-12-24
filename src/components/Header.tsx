import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from '../css/Header.module.css';
import Heading from '@theme/Heading';

const Header = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <h1>Welcome to my playground!</h1>
        <p>This is a space to document my journey in development, books I love, and reflections on my life.</p>
      </div>
    </section>
  );
};

export default Header;