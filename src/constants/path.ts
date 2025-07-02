const BASE_URL = '/treasure'

export const NAVIGATION_PATHS = {
  BLOG: `${BASE_URL}/blog`,
  DOCS: {
    DEVLOG: `${BASE_URL}/docs/devlog`,
    BOOKS: `${BASE_URL}/docs/books`
  },
  HOME: `${BASE_URL}/`,
} as const