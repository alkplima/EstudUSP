import { ReactNode, useEffect, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface Post {
  id: number;
  name?: string;
  postTitle: string;
  content: string;
  publishedAt: Date;
  upvote: number;
  disciplineId: number;
  userId: number;
}

interface CreatePostInput {
  name?: string;
  postTitle: string;
  content: string;
  upvote: number;
  disciplineId: number;
}

interface PostsContextType {
  posts: Post[];
  fetchPosts: (query?: string) => Promise<void>;
  createPost: (data: CreatePostInput) => Promise<void>;
  updateUpvote: (id: number, data: Partial<Post>) => Promise<void>;
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
    const { name, postTitle, content, upvote, disciplineId } = data;

    const response = await api.post('/posts', {
      name: name || 'Anônimo',
      postTitle,
      content,
      publishedAt: new Date(),
      upvote,
      disciplineId,
      userId: 0
    });

    setPosts(state => [response.data, ...state])
  }, []);

  const updateUpvote = useCallback(async (id: number, data: Partial<Post>) => {
    const response = await api.patch(`/posts/${id}`, data);
    
    setPosts(state => [response.data, ...state])
  }
  , []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <PostsContext.Provider value={{
      posts,
      fetchPosts,
      createPost,
      updateUpvote
    }}>
      {children}
    </PostsContext.Provider>
  )

  
}

