import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { Comment } from '../Comment';
// import { Button } from '@primer/react'
import { CommentForm, PostContainer } from './styles';
import Upload from '../../../../components/Upload';
import FileList from '../../../../components/FileList';

interface Author {
  username: string;
  avatarUrl: string;
}

// interface Content {
//   type: 'paragraph' | 'link';
//   content: string;
// }

export interface PostType {
  id: number;
  author: Author;
  title: string;
  publishedAt: Date;
  content: string;
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
  const [comments, setComments] = useState<string[]>([]);
  const [likeCount, setLikeCount] = useState(0);
  const [isAnswerBoxOpen, setIsAnswerBoxOpen] = useState(false);

  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('');


  function handleLikePost() {
    setLikeCount(previousState => {
      return previousState + 1;
    });
  }

  function handleOpenAnswerBox() {
    setIsAnswerBoxOpen(true);
  }

  function handleNewAuthorChange(event: ChangeEvent<HTMLInputElement>) {
    setNewCommentAuthor(event.target.value);
  }

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('O comentário não pode estar vazio');
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(c => c !== commentToDelete);

    setComments(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0;


  return (
    <PostContainer>

      <div className='content'>
        {post.content}

        <div>
          <button onClick={handleLikePost} className='likeButton' >
            Tenho a mesma pergunta ({likeCount})
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
          {/* {!!uploadedFiles.length && (
          )} */}

          <footer>
            {/* <Button type='submit' disabled={isNewCommentEmpty} size='large'>
              Publicar
            </Button> */}
            <button type='submit' disabled={isNewCommentEmpty}>
              Publicar
            </button>
          </footer>
        </CommentForm>
      }


      <div className='commentList'>
        <>
          <strong>Respostas</strong>
          {
            comments.length === 0 && (
              <p style={{marginTop: '1rem'}}>Seja o primeiro a responder!</p>
            )
          }
          {comments.map(comment => {
            return (
              <Comment 
              key={comment} 
              content={comment} 
              onDeleteComment={deleteComment} 
              />
              )
            })}
        </>
      </div>
    </PostContainer>
  );
}