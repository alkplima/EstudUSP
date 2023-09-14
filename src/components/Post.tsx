import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { Comment } from './Comment';
import { Button } from '@primer/react'
import styles from './Post.module.css'

interface Author {
  username: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  title: string;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState<string[]>([]);

  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('');

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

  const isNewCommentEmpty = newCommentText.length === 0

  return (
    <div className={styles.post}>

      <div className={styles.content}>
        {post.content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          }
          else if (line.type === 'link') {
            return (
              <p key={line.content}>
                <a
                  href='#'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {line.content}
                </a>
              </p>
            )
          }

          return null
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Poste uma resposta:</strong>

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

        <footer>
          <Button type='submit' disabled={isNewCommentEmpty} size='large'>
            Publicar
          </Button>
        </footer>
      </form>


      <div className={styles.commentList}>
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
    </div>
  );
}