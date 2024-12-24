import React from 'react';
import styles from '../css/CardList.module.css';

const PostCardList: React.FC<PostCardListProps> = ({ posts }) => {
  return (
    <div className={styles.cardList}>
      {posts.map((post) => (
        <div key={post.id} className={styles.card}>
          <img src={post.image} alt={post.title} className={styles.image} />
          <div className={styles.content}>
            <h3 className={styles.title}>{post.title}</h3>
            <p className={styles.description}>{post.description}</p>
            <div className={styles.footer}>
              <span className={styles.author}>{post.author}</span>
              <span className={styles.date}>{post.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCardList;