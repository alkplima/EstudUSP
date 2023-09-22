import { Heart, ThumbsDown, ThumbsUp, Trash } from 'phosphor-react'
import { CommentBox, CommentContainer } from './styles';
import { Avatar } from '../../../../components/Avatar';
import { useContextSelector } from 'use-context-selector';
import { Comment, CommentsContext } from '../../../../contexts/CommentsContext';
import { format, formatDistanceToNow } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR'
interface CommentProps {
  comment: Comment;
}

export function Comment({ comment }: CommentProps) {
  const updateUpvote = useContextSelector(CommentsContext, comments => comments.updateUpvote);
  const deleteComment = useContextSelector(CommentsContext, comments => comments.deleteComment);

  function handleDeleteComment() {
    deleteComment(comment.id);
  }

  function checkTextForLineBreak(text: string) {
    const textWithLinksAndLineBreaks = text.split('\n').map(paragraph => {
      return paragraph
        .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>'); // Transforma em link
    })
    .join('<br>'); // Adiciona quebras de linha.
  
    return <p dangerouslySetInnerHTML={{ __html: textWithLinksAndLineBreaks }} />
  } 

  function handleLikeComment() {
    updateUpvote(comment.id, { upvote: comment.upvote + 1 });
  }

  function handleDislikeComment() {
    if (comment.upvote === 0) return;
    updateUpvote(comment.id, { upvote: comment.upvote - 1 });
  }

  const publishedDateFormatted = format(new Date(comment.publishedAt), "d 'de' LLLL 'às' HH:mm", {
    locale: ptBr 
  })

  const publishedDateRelativeToNow = formatDistanceToNow(new Date(comment.publishedAt), {
    locale: ptBr,
    addSuffix: true
  })


  return (
    <CommentContainer>
      <Avatar 
        hasBorder={false} 
        content = {comment.content}
      />

      <CommentBox>
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
        </div>

        <footer>
          <div>
            <Heart size={20} className='heartIcon' />
            : {comment.upvote}
          </div>
          <button onClick={handleLikeComment} className='likeButton' >
            <ThumbsUp size={20} />
            Curtir
          </button>
          <button onClick={handleDislikeComment} className='dislikeButton'>
            <ThumbsDown size={20} />
            Descurtir
          </button>
        </footer>
      </CommentBox>
    </CommentContainer>
  )
}