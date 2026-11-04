import type {Config, PluginConfig, PluginModule} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
// lib/index.js에서 가져오는 이유: 패키지 대표 타입(.d.ts)에는 validateOptions가 빠져 있음 (런타임엔 있음)
import blogPlugin, {validateOptions} from '@docusaurus/plugin-content-blog/lib/index.js';

// 툴바 탭 = 섹션 = 폴더. 여기 한 줄 추가하면 탭(src/theme/Navbar), 목록 페이지, 홈 즐겨찾기·달력이 같이 생김
// (섹션 폴더에 글이 하나도 없으면 목록 페이지가 안 생겨 빌드가 깨지니 최소 1개 유지)
// color: 홈 달력에서 그날 글을 쓴 섹션을 표시하는 점 색 (Apple 시스템 컬러)
const sections = [
  {id: 'news', label: '뉴스', icon: '📰', color: '#ff3b30', description: '읽고 생각한 뉴스'},
  {id: 'english', label: '영어', icon: '🌐', color: '#ff9500', description: '영문 뉴스를 읽고 영어로 정리하기'},
  {id: 'economy', label: '경제', icon: '📈', color: '#34c759', description: '경제 공부 노트'},
  {id: 'dev', label: '개발', icon: '💻', color: '#007aff', description: '개발 공부와 트러블슈팅'},
  {id: 'books', label: '독서', icon: '📚', color: '#af52de', description: '읽고 남긴 생각들'},
];

// 블로그 플러그인을 감싸서 글 목록(날짜/제목/링크)을 global data로 내보냄 → 홈 달력이 읽음
const blogWithPosts = Object.assign(
  async (...args: Parameters<typeof blogPlugin>) => {
    const plugin = await blogPlugin(...args);
    return {
      ...plugin,
      async contentLoaded(params: Parameters<NonNullable<typeof plugin.contentLoaded>>[0]) {
        params.actions.setGlobalData({
          posts: params.content.blogPosts.map(({metadata: {date, title, permalink}}) => ({date, title, permalink})),
        });
        return plugin.contentLoaded?.(params);
      },
    };
  },
  {validateOptions},
) as PluginModule;

const config: Config = {
  title: 'Hi, There 👋🏻',
  tagline: 'welcome to my place',
  favicon: 'img/ibooks.ico',
  url: 'https://ellyheetov.github.io',
  baseUrl: '/paper/',
  organizationName: 'ellyheetov',
  projectName: 'paper',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  i18n: {defaultLocale: 'ko', locales: ['ko']},
  stylesheets: [
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
  ],
  customFields: {sections},
  markdown: {mermaid: true}, // 글에서 ```mermaid 코드 블록을 다이어그램으로 렌더
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {customCss: './src/css/custom.css'},
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // mermaid가 d3에서 select만 가져오면 webpack이 d3 전체를 sideEffects:false로 보고 d3-transition(selection.transition 추가)을 빼버림
    // → 다이어그램 노드에서 마우스를 떼면 'tooltipElem.transition is not a function'. d3 진입점을 side effect 있음으로 표시해 해결
    () => ({
      name: 'd3-keep-transition',
      configureWebpack: () => ({module: {rules: [{test: /[\\/]node_modules[\\/]d3[\\/]/, sideEffects: true}]}}),
    }),
    ...sections.map(
      ({id, label, description}): PluginConfig => [
        blogWithPosts,
        {
          id,
          path: id,
          routeBasePath: id,
          blogTitle: label,
          blogDescription: description,
          blogSidebarCount: 0, // 카드 목록만, 사이드바/페이지네이션 없음
          postsPerPage: 'ALL',
          sortPosts: 'ascending', // 작성 순서대로(오래된 글 먼저). 같은 날 글이 여럿이면 date에 시각까지 적기: 2026-11-02T18:25:00
          onUntruncatedBlogPosts: 'ignore',
          onInlineAuthors: 'ignore', // 책 저자는 front matter에 inline으로 적음
        },
      ],
    ),
  ],

  themeConfig: {
    image: 'img/door.png',
    colorMode: {respectPrefersColorScheme: true},
    mermaid: {theme: {light: 'neutral', dark: 'dark'}}, // 기본 보라색 대신 미색 노트 배경에 맞는 회색 톤
  } satisfies Preset.ThemeConfig,
};

export default config;
