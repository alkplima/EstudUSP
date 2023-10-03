import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from 'react';

import { Comment } from '../Comment';
// import { Button } from '@primer/react'
import { CommentForm, PostContainer } from './styles';
import Upload from '../../../../components/Upload';
import FileList from '../../../../components/FileList';
import { useContextSelector } from 'use-context-selector';
import { PostsContext } from '../../../../contexts/PostsContext';
import { CommentType, CommentsContext } from '../../../../contexts/CommentsContext';
import { Button } from '../../../../components/Button/styles';
import { useFiles } from '../../../../contexts/files';
import { SecondaryButton } from '../../../../components/SecondaryButton/styles';

export interface PostType {
  id: number;
  name?: string;
  postTitle: string;
  content: string;
  images?: string[];
  sameQuestionCount: number;
  upvote: number;
  publishedAt: Date;
  disciplineId: number;
}

interface PostProps {
  post: PostType;
  comments: CommentType[];
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

export function Post({ post, comments }: PostProps) {
  // const [comments, setComments] = useState<string[]>([]);

  const { uploadedFiles } = useFiles();

  const createComment = useContextSelector(CommentsContext, (context) => context.createComment);
  const updateSameQuestionCount = useContextSelector(PostsContext, posts => posts.updateSameQuestionCount);

  const [isAnswerBoxOpen, setIsAnswerBoxOpen] = useState(false);
  
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [hasSameQuestion, setHasSameQuestion] = useState(false);
  

  function checkTextForLineBreak(text: string) {
    const textWithLinksAndLineBreaks = text.split('\n').map(paragraph => {
      return paragraph
        .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>'); // Transforma em link
    })
    .join('<br>'); // Adiciona quebras de linha.
  
    return <p dangerouslySetInnerHTML={{ __html: textWithLinksAndLineBreaks }} />
  } 

  function handleHaveSameQuestion() {
    if (hasSameQuestion) {
      updateSameQuestionCount(post.id, { sameQuestionCount: post.sameQuestionCount - 1 });
      localStorage.removeItem(`hasSameQuestionForPost-${post.id}`);
      setHasSameQuestion(false);
      return;
    }
    updateSameQuestionCount(post.id, { sameQuestionCount: post.sameQuestionCount + 1 });
    localStorage.setItem(`hasSameQuestionForPost-${post.id}`, 'true');
    setHasSameQuestion(true);
  }

  function handleOpenAnswerBox() {
    setIsAnswerBoxOpen(true);
  }

  function handleNewAuthorChange(event: ChangeEvent<HTMLInputElement>) {
    setNewCommentAuthor(event.target.value);
  }

  const imagesURLs = uploadedFiles.map(file => file.url);

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    // setComments([...comments, newCommentText]);
    createComment({
      name: newCommentAuthor,
      content: newCommentText,
      images: imagesURLs,
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

  useEffect(() => {
    setHasSameQuestion(JSON.parse(String(localStorage.getItem(`hasSameQuestionForPost-${post.id}`))) ?? false);
  }, [post.id]);
  
  return (
    <PostContainer>

      <div className='content'>
        {checkTextForLineBreak(post.content)}

        <div className='postImgsWrapper'>
          {post.images && post.images.map(image => (
            <img key={image} src={image} alt='' className='postImgs' />
          ))}
        </div>

        <div className='buttons'>
          {!isAnswerBoxOpen &&
            <Button onClick={handleOpenAnswerBox} className='answerButton' >
              Responder
            </Button>
          }

          <SecondaryButton onClick={handleHaveSameQuestion} variant={hasSameQuestion}>
            Tenho a mesma pergunta ({post.sameQuestionCount})
          </SecondaryButton>
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
          {commentsFiltered.length > 0 && (
              <p style={{marginTop: '1rem'}}>{commentsFiltered.length} resposta(s)</p>
            )
          }
          {commentsFiltered.length === 0 && (
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