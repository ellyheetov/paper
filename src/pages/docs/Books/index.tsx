import Layout from "@theme/Layout"
import styles from '../../index.module.css';
import { bookreviews } from '../../../data/bookreviews';
import BookCardList from '../../../components/BookCardList';

const Books = () => {
  return (
    <Layout>
      <main className={styles.content}>
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Book Reviews</h1>
        <BookCardList posts={bookreviews.reverse()} />
      </main>
    </Layout>
  )
}

export default Books