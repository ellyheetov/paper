import {useEffect, useRef} from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import type BlogPostItemType from '@theme/BlogPostItem';
import type {WrapperProps} from '@docusaurus/types';
import {useColorMode} from '@docusaurus/theme-common';

// 글 하단 utterances 댓글 (목록은 BlogListPage 카드라 이 컴포넌트는 글 페이지에서만 쓰임)
function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const {colorMode} = useColorMode();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('repo', 'ellyheetov/treasure');
    script.setAttribute('issue-term', 'url');
    script.setAttribute('label', 'comment');
    script.setAttribute('theme', colorMode === 'dark' ? 'github-dark' : 'github-light');
    ref.current?.replaceChildren(script);
  }, [colorMode]);

  return <div ref={ref} />;
}

export default function BlogPostItemWrapper(props: WrapperProps<typeof BlogPostItemType>) {
  return (
    <>
      <BlogPostItem {...props} />
      <Comments />
    </>
  );
}
