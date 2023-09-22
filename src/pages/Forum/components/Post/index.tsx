import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { Comment } from '../Comment';
// import { Button } from '@primer/react'
import { CommentForm, PostContainer } from './styles';
import Upload from '../../../../components/Upload';
import FileList from '../../../../components/FileList';
import { useContextSelector } from 'use-context-selector';
import { PostsContext } from '../../../../contexts/PostsContext';
import { CommentsContext } from '../../../../contexts/CommentsContext';
import { Button } from '../../../../components/Button/styles';

export interface PostType {
  id: number;
  name?: string;
  postTitle: string;
  content: string;
  upvote: number;
  publishedAt: Date;
  disciplineId: number;
}

interface PostProps {
  post: PostType;
}

export interface UploadedFile {
  file: File;
  id: string;
  name: string;
  readableSize: string;
  preview: string;
  progress: number;
  uploaded: boolean;
  error: boolean;
  url: string | null;
}

export function Post({ post }: PostProps) {
  // const [comments, setComments] = useState<string[]>([]);

  const comments = useContextSelector(CommentsContext, (context) => context.comments);
  const createComment = useContextSelector(CommentsContext, (context) => context.createComment);

  const [isAnswerBoxOpen, setIsAnswerBoxOpen] = useState(false);
  
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  
  const updateUpvote = useContextSelector(PostsContext, posts => posts.updateUpvote);

  function handleLikePost() {
    updateUpvote(post.id, { upvote: post.upvote + 1 });
  }

  function handleOpenAnswerBox() {
    setIsAnswerBoxOpen(true);
  }

  function handleNewAuthorChange(event: ChangeEvent<HTMLInputElement>) {
    setNewCommentAuthor(event.target.value);
  }

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    // setComments([...comments, newCommentText]);
    createComment({
      name: newCommentAuthor,
      content: newCommentText,
      upvote: 0,
      postId: post.id,
      disciplineId: post.disciplineId,
    });

    setNewCommentAuthor('');
    setNewCommentText('');
    setIsAnswerBoxOpen(false);
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('O comentário não pode estar vazio');
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  const commentsFiltered = comments.filter(comment => comment.postId === post.id).filter(comment => comment.disciplineId === post.disciplineId);

  return (
    <PostContainer>

      <div className='content'>
        {post.content}

        <div>
          <button onClick={handleLikePost} className='likeButton' >
            Tenho a mesma pergunta ({post.upvote})
          </button>

          {!isAnswerBoxOpen &&
            <button onClick={handleOpenAnswerBox} className='likeButton' >
              Adicionar resposta
            </button>
          }
        </div>
      </div>

      {isAnswerBoxOpen &&
        <CommentForm onSubmit={handleCreateNewComment} >
          <strong>Sua resposta:</strong>

          <input 
            name='author'
            type="text"
            placeholder='Nome (opcional)'
            value={newCommentAuthor}
            onChange={handleNewAuthorChange}
          />

          <textarea 
            name='comment'
            placeholder='Deixe a sua resposta'
            value={newCommentText}
            onChange={handleNewCommentChange}
            onInvalid={handleNewCommentInvalid}
            required
          />

          <Upload />
          <FileList />

          <footer>
            {/* <Button type='submit' disabled={isNewCommentEmpty} size='large'>
              Publicar
            </Button> */}
            <Button type='submit' disabled={isNewCommentEmpty}>
              Publicar
            </Button>
          </footer>
        </CommentForm>
      }


      <div className='commentList'>
        <>
          <strong>Respostas</strong>
          {
            commentsFiltered.length > 0 && (
              <p style={{marginTop: '1rem'}}>{commentsFiltered.length} resposta(s)</p>
            )
          }
          {
            commentsFiltered.length === 0 && (
              <p style={{marginTop: '1rem'}}>Seja o primeiro a responder!</p>
            )
          }
          {commentsFiltered.map(comment => {
            return (
              <Comment 
                key={comment.id}
                comment={comment}
              />
            )
          })}
        </>
      </div>
    </PostContainer>
  );
}