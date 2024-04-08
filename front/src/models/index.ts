export interface ResponseI {
    success: boolean;
    data: PostResponse[];
}
  
export interface PostResponse {
    id: string;
    title: string;
    content: string;
    postsType: string;
    createdAt: string;
    authorId: string;
    author: AuthorI;
    comments: Comment[];
    votes: VoteI[];
}

export interface PostI {
    description: string;
    votes: number;
    author: string;
    daysAgo: number;
    comments: number;
}

export interface AuthorI {
    user: UserI;
}

export interface UserI {
    id: string;
    email: string;
    username: string;
    firstname: string | null;
    lastname: string | null;
}

export interface CommentI {
    id: string;
    text: string;
    parentCommentId: string | null;
    createdAt: string;
    authorId: string;
}

export interface VoteI {
    count: number;
    voteType: string;
    memberId: string;
}