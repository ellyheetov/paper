import React from 'react';
import styles from '../css/CardList.module.css';
import Link from '@docusaurus/Link';

const PostCardList: React.FC<PostCardListProps> = ({ posts }) => {
  return (
    <div className={styles.cardList}>
      {posts.map((post) => (
        <Link key={post.id} to={post.url} className={styles.card}>
          <img src={post.image} alt={post.title} className={styles.image} />
          <div className={styles.content}>
            <h3 className={styles.title}>{post.title}</h3>
            <p className={styles.description}>{post.description}</p>
            <div className={styles.footer}>
              <span className={styles.author}>{post.author}</span>
              <span className={styles.date}>{post.date}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostCardList;