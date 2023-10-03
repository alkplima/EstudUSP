import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { Comment } from '../Comment';
// import { Button } from '@primer/react'
import { CommentForm, PostContainer } from './styles';
import Upload from '../../../../components/Upload';
import FileList from '../../../../components/FileList';
import { useContextSelector } from 'use-context-selector';
import { Post, PostsContext } from '../../../../contexts/PostsContext';
import { IComment, CommentsContext } from '../../../../contexts/CommentsContext';
import { Button } from '../../../../components/Button/styles';
import { useFiles } from '../../../../contexts/files';

interface PostProps {
  post: Post;
  comments: IComment[];
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

export function Comments({ post, comments }: PostProps) {
  // const [comments, setComments] = useState<string[]>([]);

  const { uploadedFiles, clearUploads } = useFiles();

  const createComment = useContextSelector(CommentsContext, (context) => context.createComment);
  const updateSameQuestion = useContextSelector(PostsContext, posts => posts.updateSameQuestion);

  const [isAnswerBoxOpen, setIsAnswerBoxOpen] = useState(false);
  
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  

  function checkTextForLineBreak(text: string) {
    const textWithLinksAndLineBreaks = text.split('\n').map(paragraph => {
      return paragraph
        .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>'); // Transforma em link
    })
    .join('<br>'); // Adiciona quebras de linha.
  
    return <p dangerouslySetInnerHTML={{ __html: textWithLinksAndLineBreaks }} />
  } 

  function handleHaveSameQuestion() {
    updateSameQuestion(post.id);
  }

  function handleOpenAnswerBox() {
    clearUploads();
    setIsAnswerBoxOpen(true);
  }

  function handleNewAuthorChange(event: ChangeEvent<HTMLInputElement>) {
    setNewCommentAuthor(event.target.value);
  }

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    createComment({
      username: newCommentAuthor,
      content: newCommentText,
      attachments: uploadedFiles.map(file => file.file),
      questionId: post.id,
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
  const postComments = comments.filter(comment => comment.questionId === post.id);

  return (
    <PostContainer>

      <div className='content'>
        {checkTextForLineBreak(post.content)}

        <div className='postImgsWrapper'>
          {post.attachments && post.attachments.map(image => (
            <img key={image} src={image} alt='' className='postImgs' />
          ))}
        </div>

        <div className='buttons'>
          <div className="bigButtons">
            {!isAnswerBoxOpen &&
              <Button onClick={handleOpenAnswerBox} className='answerButton' >
                Responder
              </Button>
            }

            <button onClick={handleHaveSameQuestion} className='sameQuestionButton' >
              Tenho a mesma pergunta ({post.sameQuestion})
            </button>
          </div>

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

      <div className='separator'></div>

      <div className='commentList'>
        <>
          <h6>Respostas</h6>
          {post.repliesQuantity > 0 && (
              <p style={{marginTop: '1rem'}}>{post.repliesQuantity} resposta{post.repliesQuantity ? 's' : ''}</p>
            )
          }
          {post.repliesQuantity === 0 && (
              <p style={{marginTop: '1rem'}}>Seja o primeiro a responder!</p>
            )
          }
          {postComments.map(comment => {
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