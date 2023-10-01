import { ReactNode, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

export interface Post {
  id: number;
  name?: string;
  title: string;
  content: string;
  publishedAt: Date;
  sameQuestionCount: number;
  upvote: number;
  downvote: number;
  disciplineId: number;
  userId: number;
}

interface CreatePostInput {
  name?: string;
  postTitle: string;
  content: string;
  images?: string[];
  disciplineId: number;
}

interface PostsContextType {
  posts: Post[];
  fetchPosts: (query?: string) => Promise<void>;
  createPost: (data: CreatePostInput) => Promise<void>;
  updateSameQuestionCount: (id: number, data: Partial<Post>) => Promise<void>;
  updateUpvote: (id: number, data: Partial<Post>) => Promise<void>;
  updateDownvote: (id: number, data: Partial<Post>) => Promise<void>;
}

export const PostsContext = createContext({} as PostsContextType);

interface PostsProviderProps {
  children: ReactNode;
}

export function PostsProvider({ children }: PostsProviderProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  
  const fetchPosts = useCallback(async (query?: string) => {
    const response = await api.get('/posts', {
      params: {
        _sort: 'publishedAt',
        _order: 'desc',
        q: query,
      }
    });
    
    setPosts(response.data);
  }, []);

  const createPost = useCallback(async (data: CreatePostInput) => {
    const { name, postTitle, content, images, disciplineId } = data;

    const response = await api.post('/posts', {
      name: name || 'Anônimo',
      postTitle,
      content,
      images,
      publishedAt: new Date(),
      sameQuestionCount: 0,
      upvote: 0,
      downvote: 0,
      disciplineId,
      userId: 0
    });

    setPosts(state => [response.data, ...state])
  }, []);

  const updateSameQuestionCount = useCallback(async (id: number, data: Partial<Post>) => {
    await api.patch(`/posts/${id}`, data);
    const response = await api.get('/posts', {
      params: {
        _sort: 'publishedAt',
        _order: 'desc',
      }
    });
    
    setPosts(response.data);
  }
  , []);

  const updateUpvote = useCallback(async (id: number, data: Partial<Post>) => {
    await api.patch(`/posts/${id}`, data);
    const response = await api.get('/posts', {
      params: {
        _sort: 'publishedAt',
        _order: 'desc',
      }
    });
    
    setPosts(response.data);
  }
  , []);

  const updateDownvote = useCallback(async (id: number, data: Partial<Post>) => {
    await api.patch(`/posts/${id}`, data);
    const response = await api.get('/posts', {
      params: {
        _sort: 'publishedAt',
        _order: 'desc',
      }
    });
    
    setPosts(response.data);
  }
  , []);

  return (
    <PostsContext.Provider value={{
      posts,
      fetchPosts,
      createPost,
      updateSameQuestionCount,
      updateUpvote,
      updateDownvote,
    }}>
      {children}
    </PostsContext.Provider>
  )

  
}
