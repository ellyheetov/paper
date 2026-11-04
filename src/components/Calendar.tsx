import {useState} from 'react';
import Link from '@docusaurus/Link';
import {useAllPluginInstancesData} from '@docusaurus/useGlobalData';
import styles from './Calendar.module.css';

export type Section = {id: string; label: string; color: string};
type Post = {date: string; title: string; permalink: string};

const WEEK = ['일', '월', '화', '수', '목', '금', '토'];
const ymd = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// 홈 위젯: 이번 달 달력(그날 글 쓴 섹션마다 색 점, 누르면 그날 글 목록) + 오늘 섹션별 기록 여부
// 날짜는 브라우저 기준이라 BrowserOnly 안에서 렌더 (빌드 시점 날짜와 어긋나지 않도록)
export default function Calendar({sections}: {sections: Section[]}) {
  const data = useAllPluginInstancesData('docusaurus-plugin-content-blog') as Record<string, {posts: Post[]}>;

  // 'YYYY-MM-DD' → 그날 글 목록. front matter 날짜는 UTC 자정이라 앞 10자리가 곧 그 날짜
  const byDay = new Map<string, {section: Section; post: Post}[]>();
  for (const section of sections) {
    for (const post of data[section.id]?.posts ?? []) {
      const day = post.date.slice(0, 10);
      byDay.set(day, [...(byDay.get(day) ?? []), {section, post}]);
    }
  }

  const today = new Date();
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<string | null>(null);
  const shift = (n: number) => {
    setMonth(new Date(month.getFullYear(), month.getMonth() + n, 1));
    setSelected(null);
  };
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const days = Array.from({length: daysInMonth}, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1));
  const recordedDays = days.filter((d) => byDay.has(ymd(d))).length;
  const todayPosts = byDay.get(ymd(today)) ?? [];

  return (
    <section className={styles.widget}>
      <div>
        <header className={styles.header}>
          <strong>
            {month.getFullYear()}년 {month.getMonth() + 1}월
          </strong>
          <span>
            <button type="button" onClick={() => shift(-1)} aria-label="이전 달">‹</button>
            <button type="button" onClick={() => shift(1)} aria-label="다음 달">›</button>
          </span>
        </header>
        <div className={styles.grid}>
          {WEEK.map((w) => (
            <span key={w} className={styles.weekday}>{w}</span>
          ))}
          {days.map((d) => {
            const key = ymd(d);
            const posts = byDay.get(key) ?? [];
            const done = sections.filter((s) => posts.some((p) => p.section.id === s.id));
            return (
              <button
                type="button"
                key={d.getDate()}
                className={key === selected ? `${styles.day} ${styles.isSelected}` : styles.day}
                style={d.getDate() === 1 ? {gridColumnStart: d.getDay() + 1} : undefined}
                disabled={!posts.length}
                aria-pressed={key === selected}
                onClick={() => setSelected(key === selected ? null : key)}
                title={posts.map((p) => `${p.section.label} · ${p.post.title}`).join('\n') || undefined}>
                <span className={key === ymd(today) ? `${styles.num} ${styles.isToday}` : styles.num}>{d.getDate()}</span>
                <span className={styles.dots}>
                  {done.map((s) => (
                    <i key={s.id} style={{background: s.color}} />
                  ))}
                </span>
              </button>
            );
          })}
        </div>
        {selected && (
          <ul className={styles.list}>
            {byDay.get(selected)!.map(({section, post}) => (
              <li key={post.permalink}>
                <i style={{borderColor: section.color, background: section.color}} />
                <Link to={post.permalink}>{post.title}</Link>
                <span>{section.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.status}>
        <strong>오늘</strong>
        <ul>
          {sections.map((s) => {
            const post = todayPosts.find((p) => p.section.id === s.id)?.post;
            return (
              <li key={s.id}>
                <i style={{borderColor: s.color, background: post ? s.color : 'transparent'}} />
                {post ? <Link to={post.permalink}>{s.label}</Link> : s.label}
                <span>{post ? '완료' : '—'}</span>
              </li>
            );
          })}
        </ul>
        <p className={styles.summary}>
          {month.getMonth() + 1}월에 기록한 날 <b>{recordedDays}일</b>
        </p>
      </div>
    </section>
  );
}
