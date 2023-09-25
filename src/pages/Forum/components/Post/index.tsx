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
import { ThumbsDown, ThumbsUp } from 'phosphor-react';
import { useFiles } from '../../../../contexts/files';

export interface PostType {
  id: number;
  name?: string;
  postTitle: string;
  content: string;
  images?: string[];
  sameQuestionCount: number;
  upvote: number;
  downvote: number;
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

  const { uploadedFiles } = useFiles();

  const comments = useContextSelector(CommentsContext, (context) => context.comments);
  const createComment = useContextSelector(CommentsContext, (context) => context.createComment);
  const updateSameQuestionCount = useContextSelector(PostsContext, posts => posts.updateSameQuestionCount);
  const updateUpvote = useContextSelector(PostsContext, posts => posts.updateUpvote);
  const updateDownvote = useContextSelector(PostsContext, posts => posts.updateDownvote);

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
    updateSameQuestionCount(post.id, { sameQuestionCount: post.sameQuestionCount + 1 });
  }

  function handleLikePost() {
    updateUpvote(post.id, { upvote: post.upvote + 1 });
  }

  function handleDislikePost() {
    if (post.upvote === 0) return;
    updateDownvote(post.id, { downvote: post.downvote + 1 });
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
          <div className="bigButtons">
            {!isAnswerBoxOpen &&
              <Button onClick={handleOpenAnswerBox} className='answerButton' >
                Responder
              </Button>
            }

            <button onClick={handleHaveSameQuestion} className='sameQuestionButton' >
              Tenho a mesma pergunta ({post.sameQuestionCount})
            </button>
          </div>

          <div className="likeDislikeButtons">
            <button onClick={handleLikePost} className='likeButton' >
              <ThumbsUp size={20} /> {post.upvote}
            </button>
            <div className="verticalSeparator"></div>
            <button onClick={handleDislikePost} className='dislikeButton'>
              <ThumbsDown size={20} />
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