import { ThumbsUp/*, Trash*/ } from 'phosphor-react'
import { CommentBox, CommentContainer } from './styles';
import { Avatar } from '../../../../components/Avatar';
import { useContextSelector } from 'use-context-selector';
import { CommentType, CommentsContext } from '../../../../contexts/CommentsContext';
import { format, formatDistanceToNow } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR'
import { useEffect, useState } from 'react';
interface CommentProps {
  comment: CommentType;
}

export function Comment({ comment }: CommentProps) {
  const [likeState, setLikeState] = useState('');
  const updateUpvote = useContextSelector(CommentsContext, comments => comments.updateUpvote);
  // const deleteComment = useContextSelector(CommentsContext, comments => comments.deleteComment);

  // function handleDeleteComment() {
  //   deleteComment(comment.id);
  // }

  function checkTextForLineBreak(text: string) {
    const textWithLinksAndLineBreaks = text.split('\n').map(paragraph => {
      return paragraph
        .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>'); // Transforma em link
    })
    .join('<br>'); // Adiciona quebras de linha.
  
    return <p dangerouslySetInnerHTML={{ __html: textWithLinksAndLineBreaks }} />
  } 

  function handleLikeComment() {
    if (likeState === 'like') {
      updateUpvote(comment.id, { upvote: comment.upvote - 1 });
      localStorage.removeItem(`likeStateForComment-${comment.id}`);
      setLikeState('');
      return;
    }
    updateUpvote(comment.id, { upvote: comment.upvote + 1 });
    localStorage.setItem(`likeStateForComment-${comment.id}`, 'like');
    setLikeState('like');
  }

  function getLikeState() {
    if (likeState === 'like') return 'like';
    return '';
  }

  const publishedDateFormatted = format(new Date(comment.publishedAt), "d 'de' LLLL 'às' HH:mm", {
    locale: ptBr 
  })

  const publishedDateRelativeToNow = formatDistanceToNow(new Date(comment.publishedAt), {
    locale: ptBr,
    addSuffix: true
  })

  useEffect(() => {
    setLikeState(localStorage.getItem(`likeStateForComment-${comment.id}`) ?? '');
  }, [comment.id]);

  return (
    <CommentContainer>
      <Avatar 
        hasBorder={false} 
        content = {comment.content}
      />

      <CommentBox variant={getLikeState()}>
        <div className='commentContent'>
          <header>
            <div className='authorAndTime'>
              <strong>{comment.name}</strong>
              <time title={publishedDateFormatted} dateTime={new Date(comment.publishedAt).toISOString()}>
                {publishedDateRelativeToNow}
              </time>
            </div>

            {/* <button onClick={handleDeleteComment} title='Deletar comentário'>
              <Trash size={24} />
            </button> */}
          </header>

          {checkTextForLineBreak(comment.content)}

          <div className='commentImgsWrapper'>
            {comment.images && comment.images.map(image => (
              <img key={image} src={image} alt='' className='commentImgs' />
            ))}
          </div>

          <footer>
            <button onClick={handleLikeComment} className='likeButton' >
              <ThumbsUp size={20} weight='bold' /> {comment.upvote}
            </button>
          </footer>
        </div>
      </CommentBox>
    </CommentContainer>
  )
}