import { ReactNode, useEffect, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface Post {
  id: number;
  name: string;
  semester: number;
  previewImg: string;
}

interface CreatePostInput {
  name: string;
  semester: number;
  previewImg: string;
}

interface PostsContextType {
  posts: Post[];
  fetchPosts: (query?: string) => Promise<void>;
  createPost: (data: CreatePostInput) => Promise<void>;
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
        _sort: 'semester',
        _order: 'desc',
        q: query,
      }
    });
    
    setPosts(response.data);
  }, []);

  const createPost = useCallback(async (data: CreatePostInput) => {
    const { name, semester, previewImg } = data;

    const response = await api.post('/posts', {
      name,
      semester,
      previewImg,
    });

    setPosts(state => [response.data, ...state])
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <PostsContext.Provider value={{
      posts,
      fetchPosts,
      createPost,
    }}>
      {children}
    </PostsContext.Provider>
  )

  
}

