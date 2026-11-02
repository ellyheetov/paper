import type {Config, PluginConfig} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// 툴바 탭 = 섹션 = 폴더. 여기 한 줄 추가하면 탭(src/theme/Navbar), 목록 페이지, 홈 즐겨찾기가 같이 생김
// (섹션 폴더에 글이 하나도 없으면 목록 페이지가 안 생겨 빌드가 깨지니 최소 1개 유지)
const sections = [
  {id: 'news', label: '뉴스', icon: '📰', description: '읽고 생각한 뉴스'},
  {id: 'economy', label: '경제', icon: '📈', description: '경제 공부 노트'},
  {id: 'dev', label: '개발', icon: '💻', description: '개발 공부와 트러블슈팅'},
  {id: 'books', label: '독서', icon: '📚', description: '읽고 남긴 생각들'},
];

const config: Config = {
  title: 'Hi, There 👋🏻',
  tagline: 'welcome to my place',
  favicon: 'img/ibooks.ico',
  url: 'https://ellyheetov.github.io',
  baseUrl: '/treasure/',
  organizationName: 'ellyheetov',
  projectName: 'treasure',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  i18n: {defaultLocale: 'ko', locales: ['ko']},
  stylesheets: [
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
  ],
  customFields: {sections},

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

  plugins: sections.map(
    ({id, label, description}): PluginConfig => [
      '@docusaurus/plugin-content-blog',
      {
        id,
        path: id,
        routeBasePath: id,
        blogTitle: label,
        blogDescription: description,
        blogSidebarCount: 0, // 카드 목록만, 사이드바/페이지네이션 없음
        postsPerPage: 'ALL',
        onUntruncatedBlogPosts: 'ignore',
        onInlineAuthors: 'ignore', // 책 저자는 front matter에 inline으로 적음
      },
    ],
  ),

  themeConfig: {
    image: 'img/door.png',
    colorMode: {respectPrefersColorScheme: true},
  } satisfies Preset.ThemeConfig,
};

export default config;
