import { useEffect, useState } from 'react';

import { Comment } from '../Comment';
import { CommentForm, PostContainer } from './styles';
import Upload from '../../../../components/Upload';
import FileList from '../../../../components/FileList';
import { useContextSelector } from 'use-context-selector';
import { Post, PostsContext } from '../../../../contexts/PostsContext';
import { IComment, CommentsContext } from '../../../../contexts/CommentsContext';
import { Button } from '../../../../components/Button/styles';
import { useFiles } from '../../../../contexts/files';
import { SecondaryButton } from '../../../../components/SecondaryButton/styles';
import AttachmentsList from '../AttachmentsList';
import { useForm } from 'react-hook-form';

interface PostProps {
  post: Post;
  comments: IComment[];
}

interface CreateCommentInput {
  username?: string;
  content: string;
  questionId: number;
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

  const { clearUploads } = useFiles();

  const { register, handleSubmit, formState: { errors } } = useForm<CreateCommentInput>({
    defaultValues: {
      username: '',
      content: '',
    }
  });

  const createComment = useContextSelector(CommentsContext, (context) => context.createComment);
  const updateSameQuestion = useContextSelector(PostsContext, posts => posts.updateSameQuestion);
  const removeSameQuestion = useContextSelector(PostsContext, posts => posts.removeSameQuestion);

  const [isAnswerBoxOpen, setIsAnswerBoxOpen] = useState(false);
  
  const [hasSameQuestion, setHasSameQuestion] = useState(false);
  

  function checkTextForLineBreak(text: string) {
    const textWithLinksAndLineBreaks = text.split('\n').map(paragraph => {
      return paragraph
        .replace(
          /((https?:\/\/|www\.)[^\s]+)/g,
          '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        ); // Transforma em link
    })
    .join('<br>'); // Adiciona quebras de linha.
  
    return <p dangerouslySetInnerHTML={{ __html: textWithLinksAndLineBreaks }} />;
  }

  function handleHaveSameQuestion() {
    if (hasSameQuestion) {
      removeSameQuestion(post.id);
      localStorage.removeItem(`hasSameQuestionForPost-${post.id}`);
      setHasSameQuestion(false);
      return;
    }

    updateSameQuestion(post.id);
    localStorage.setItem(`hasSameQuestionForPost-${post.id}`, 'true');
    setHasSameQuestion(true);
  }

  function handleOpenAnswerBox() {
    clearUploads();
    setIsAnswerBoxOpen(true);
  }

  function handleCreateNewComment(data: CreateCommentInput) {

    createComment({
      username: data.username,
      content: data.content,
      questionId: post.id,
    });

    setIsAnswerBoxOpen(false);
  }

  const postComments = comments.filter(comment => comment.questionId === post.id);

  useEffect(() => {
    setHasSameQuestion(JSON.parse(String(localStorage.getItem(`hasSameQuestionForPost-${post.id}`))) ?? false);
  }, [post.id]);
  
  return (
    <PostContainer>

      <div className='content'>
        {checkTextForLineBreak(post.content)}

        <div className='postAttachmentsWrapper'>
          {post.attachments && 
            <AttachmentsList attachments={post.attachments} />
          }
        </div>

        <div className='buttons'>
          {!isAnswerBoxOpen &&
            <Button onClick={handleOpenAnswerBox} className='answerButton' >
              Responder
            </Button>
          }

          <SecondaryButton onClick={handleHaveSameQuestion} variant={hasSameQuestion}>
            Tenho a mesma pergunta ({post.sameQuestion})
          </SecondaryButton>
        </div>
      </div>

      {isAnswerBoxOpen &&
        <CommentForm onSubmit={handleSubmit(handleCreateNewComment)} >
          <strong>Sua resposta:</strong>

          <input 
            type="text"
            placeholder='Nome (opcional)'
            {...register("username")}
          />

          <textarea 
            placeholder='Deixe a sua resposta'
            {...register("content", { required: true, minLength: 5, maxLength: 1000 })}
          />
          {errors.content && <span>Comentário inválido!</span>}

          <Upload />
          <FileList />

          <footer>
            {/* <Button type='submit' disabled={isNewCommentEmpty} size='large'>
              Publicar
            </Button> */}
            <Button type='submit'>
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