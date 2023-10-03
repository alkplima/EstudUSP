import { ReactNode, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";
import { useFiles } from "./files";

export interface Post {
  id: number;
  username: string;
  title: string;
  content: string;
  publishedAt: Date;
  attachments: string[];
  sameQuestion: number;
  upvotes: number;
  anonymous: boolean;
  repliesQuantity: number;
}

interface CreatePostInput {
  title: string;
  username?: string;
  content: string;
  subjectId: string;
}

interface PostsContextType {
  posts: Post[];
  fetchPosts: (subjectId: string, query?: string) => Promise<void>;
  createPost: (data: CreatePostInput) => Promise<void>;
  updateSameQuestion: (id: number) => Promise<void>;
  updateUpvote: (id: number) => Promise<void>;
  updateDownvote: (id: number) => Promise<void>;
  addComment: (id: number) => void;
}

export const PostsContext = createContext({} as PostsContextType);

interface PostsProviderProps {
  children: ReactNode;
}

export function PostsProvider({ children }: PostsProviderProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const { uploadedFiles } = useFiles();
  
  const fetchPosts = useCallback(async (subjectId: string, query?: string) => {
    const response = await api.get(`/${subjectId}/questions`, {
      params: {
        _sort: 'publishedAt',
        _order: 'desc',
        q: query,
      }
    });
    
    setPosts(response.data);
  }, []);

  const createPost = async (data: CreatePostInput) => {
    const { username, title, content, subjectId } = data;
    const attachments = uploadedFiles.map(file => file.file);

    const formData = new FormData();

    formData.append('anonymous', String(!username));
    formData.append('username', username || '');
    formData.append('title', title);
    formData.append('content', content);

    console.log(attachments);

    attachments?.forEach(attachment => {
      formData.append('attachments', attachment);
    });

    const response = await api.post(`/${subjectId}/question`, formData);

    setPosts(state => [response.data, ...state])
  };

  const updateSameQuestion = async (id: number) => {
    await api.patch(`/question/${id}/sameQuestion`);

    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        post.sameQuestion++;
      }

      return post;
    });

    setPosts(updatedPosts);
  }

  const updateUpvote = async (id: number) => {
    await api.patch(`/question/${id}/upvote`);

    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        post.upvotes++;
      }

      return post;
    });

    setPosts(updatedPosts);
  };

  const updateDownvote = async (id: number) => {
    await api.patch(`/question/${id}/downvote`);

    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        post.upvotes--;
      }

      return post;
    });

    setPosts(updatedPosts);
  }

  const addComment = (id: number) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        post.repliesQuantity++;
      }

      return post;
    });

    setPosts(updatedPosts);
  }

  return (
    <PostsContext.Provider value={{
      posts,
      fetchPosts,
      createPost,
      updateSameQuestion,
      updateUpvote,
      updateDownvote,
      addComment,
    }}>
      {children}
    </PostsContext.Provider>
  )

  
}

