import { ReactNode, useEffect, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

export interface CommentType {
  id: number;
  name?: string;
  content: string;
  images?: string[];
  publishedAt: Date;
  upvote: number;
  disciplineId: number;
  userId: number;
  postId: number;
}

interface CreateCommentInput {
  name?: string;
  content: string;
  images?: string[];
  disciplineId: number;
  postId: number;
}

interface CommentsContextType {
  comments: CommentType[];
  fetchComments: (query?: string) => Promise<void>;
  createComment: (data: CreateCommentInput) => Promise<void>;
  deleteComment: (id: number) => Promise<void>;
  updateUpvote: (id: number, data: Partial<CommentType>) => Promise<void>;
}

export const CommentsContext = createContext({} as CommentsContextType);

interface CommentsProviderProps {
  children: ReactNode;
}

export function CommentsProvider({ children }: CommentsProviderProps) {
  const [comments, setComments] = useState<CommentType[]>([]);
  
  const fetchComments = useCallback(async (query?: string) => {
    const response = await api.get('/comments', {
      params: {
        _sort: 'publishedAt',
        _order: 'desc',
        q: query,
      }
    });
    
    setComments(response.data);
  }, []);

  const createComment = useCallback(async (data: CreateCommentInput) => {
    const { name, content, images, disciplineId, postId } = data;

    const response = await api.post('/comments', {
      name: name || 'Anônimo',
      content,
      images,
      publishedAt: new Date(),
      upvote: 0,
      disciplineId,
      userId: 0,
      postId
    });

    setComments(state => [response.data, ...state])
  }, []);

  const deleteComment = useCallback(async (id: number) => {
    await api.delete(`/comments/${id}`);

    setComments(state => state.filter(comment => comment.id !== id));
  }
  , []);

  const updateUpvote = useCallback(async (id: number, data: Partial<CommentType>) => {
    await api.patch(`/comments/${id}`, data);
    const response = await api.get('/comments', {
      params: {
        _sort: 'publishedAt',
        _order: 'desc',
      }
    });
    
    setComments(response.data);
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <CommentsContext.Provider value={{
      comments,
      fetchComments,
      createComment,
      deleteComment,
      updateUpvote,
    }}>
      {children}
    </CommentsContext.Provider>
  )

  
}

