import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import type {Props} from '@theme/BlogListPage';
import styles from './styles.module.css';

const formatDate = new Intl.DateTimeFormat('ko', {dateStyle: 'long', timeZone: 'UTC'}).format;

// /blog, /books 목록: 글마다 front matter(title, description, image, authors, date)로 카드 렌더
export default function BlogListPage({metadata, items}: Props) {
  return (
    <Layout title={metadata.blogTitle} description={metadata.blogDescription}>
      <main className={`container ${styles.page}`}>
        <h1>{metadata.blogTitle}</h1>
        <p className={styles.subtitle}>{metadata.blogDescription}</p>
        <div className={styles.grid}>
          {items.map(({content: {metadata: post, frontMatter, assets}}) => {
            const image = assets.image ?? frontMatter.image;
            const date = new Date(post.date);
            return (
              <Link key={post.permalink} to={post.permalink} className={styles.card}>
                {image && <img src={image} alt="" loading="lazy" className={styles.image} />}
                <div className={styles.body}>
                  <h3 className={styles.title}>{post.title}</h3>
                  <p className={styles.description}>{post.description}</p>
                  <div className={styles.meta}>
                    <span>{post.authors.map((a) => a.name).join(', ')}</span>
                    <time dateTime={date.toISOString()}>{formatDate(date)}</time>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </Layout>
  );
}
