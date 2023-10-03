import { ReactNode, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { createContext, useContextSelector } from "use-context-selector";
import { PostsContext } from "./PostsContext";

export interface IComment {
  id: number;
  content: string;
  attachments?: string[];
  publishedAt: Date;
  upvotes: number;
  downvotes: number;
  username: string;
  questionId: number;
}

interface CreateCommentInput {
  username?: string;
  content: string;
  images?: string[];
  questionId: number;
}

interface CommentsContextType {
  comments: IComment[];
  fetchComments: (questionId: number, query?: string) => Promise<void>;
  createComment: (data: CreateCommentInput) => Promise<void>;
  deleteComment: (id: number) => Promise<void>;
  updateUpvote: (id: number) => Promise<void>;
  updateDownvote: (id: number) => Promise<void>;
}

export const CommentsContext = createContext({} as CommentsContextType);

interface CommentsProviderProps {
  children: ReactNode;
}

export function CommentsProvider({ children }: CommentsProviderProps) {
  const [comments, setComments] = useState<IComment[]>([]);

  const addComment = useContextSelector(PostsContext, posts => posts.addComment);
  
  const fetchComments = useCallback(async (questionId: number, query?: string) => {
    const response = await api.get(`/question/${questionId}/replies`, {
      params: {
        _sort: 'publishedAt',
        _order: 'desc',
        q: query,
      }
    });
    
    setComments(response.data);
  }, []);

  const createComment = async (data: CreateCommentInput) => {
    const { username, content, questionId } = data;

    const response = await api.post(`question/${questionId}/reply`, {
      username,
      content,
    });

    setComments(state => [response.data, ...state]);

    addComment(questionId);
  };

  const deleteComment = useCallback(async (id: number) => {
    await api.delete(`/comments/${id}`);

    setComments(state => state.filter(comment => comment.id !== id));
  }
  , []);

  const updateUpvote = async (id: number) => {
    await api.patch(`/reply/${id}/upvote`);

    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        comment.upvotes++;
      }

      return comment;
    });

    setComments(updatedComments);
  };

  const updateDownvote = async (id: number) => {
    await api.patch(`/reply/${id}/downvote`);

    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        comment.upvotes--;
      }

      return comment;
    });

    setComments(updatedComments);
  }

  return (
    <CommentsContext.Provider value={{
      comments,
      fetchComments,
      createComment,
      deleteComment,
      updateUpvote,
      updateDownvote,
    }}>
      {children}
    </CommentsContext.Provider>
  )

  
}

