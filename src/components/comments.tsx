import React, { useEffect } from 'react';

interface UtterancesProps {
  repo: string; // GitHub 저장소 이름
  issueTerm: string; // 댓글 기준 (e.g., url, pathname, title)
  label?: string; // 댓글 라벨 (옵션)
  theme?: string; // 테마 (e.g., github-light, github-dark)
}

const Utterances: React.FC<UtterancesProps> = ({
    repo,
    issueTerm,
    label = 'comment',
    theme = 'github-light',
  }) => {
    useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://utteranc.es/client.js';
      script.setAttribute('repo', repo);
      script.setAttribute('issue-term', issueTerm);
      if (label) script.setAttribute('label', label);
      script.setAttribute('theme', theme);
      script.crossOrigin = 'anonymous';
      script.async = true;
  
      const commentsSection = document.getElementById('utterances-container');
      if (commentsSection) {
        commentsSection.innerHTML = ''; // 중복 로드를 방지하기 위해 초기화
        commentsSection.appendChild(script);
      }
    }, [repo, issueTerm, label, theme]); // 의존성 배열에 props 추가
  
    return <div id="utterances-container" />;
  };

export default Utterances;