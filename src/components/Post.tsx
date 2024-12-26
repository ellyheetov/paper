interface Post {
    id: number;
    title: string;
    description: string;
    author: string;
    image: string;
    date: string;
    url: string;
}

interface PostCardListProps {
    posts: Post[];
}