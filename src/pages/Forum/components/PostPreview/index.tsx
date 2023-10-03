import { useEffect, useState } from 'react';

import { format, formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

import { PostPreviewContainer, PostPreviewContent } from './styles';
import { Avatar } from '../../../../components/Avatar';
import { Comments } from '../Comments';
import { CommentsContext } from '../../../../contexts/CommentsContext';
import { Subtitle } from '../../../../styles/global';
import { useContextSelector } from 'use-context-selector';
import { ThumbsUp } from 'phosphor-react';
import { Post as PostType, PostsContext } from '../../../../contexts/PostsContext';

// interface Content {
//   type: 'paragraph' | 'link';
//   content: string;
// }

interface PostProps {
  post: PostType;
}

export function PostPreview({ post }: PostProps) {

  const comments = useContextSelector(CommentsContext, (context) => context.comments);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [likeState, setLikeState] = useState('');
  const updateUpvote = useContextSelector(PostsContext, posts => posts.updateUpvote);
  const updateDownvote = useContextSelector(PostsContext, posts => posts.updateDownvote);

  const publishedDateFormatted = format(new Date(post.publishedAt), "d 'de' LLLL 'às' HH:mm", {
    locale: ptBr 
  })

  const publishedDateRelativeToNow = formatDistanceToNow(new Date(post.publishedAt), {
    locale: ptBr,
    addSuffix: true
  })

  const fetchComments = useContextSelector(CommentsContext, (context) => {
    return context.fetchComments;
  });

  function handleOpenCard() {
    const newState = !isCardOpen;
    setIsCardOpen(newState);

    if (newState) {
      fetchComments(post.id);
    }
  }

  function handleLikePost() {
    if (likeState === 'like' && post.upvotes > 0) {
      updateDownvote(post.id);
      localStorage.removeItem(`likeStateForPost-${post.id}`);
      setLikeState('');
      return;
    }

    updateUpvote(post.id);
    localStorage.setItem(`likeStateForPost-${post.id}`, 'like');
    setLikeState('like');
  }

  function getLikeState() {
    if (likeState === 'like') return 'like';
    return '';
  }

  useEffect(() => {
    setLikeState(localStorage.getItem(`likeStateForPost-${post.id}`) ?? '');
  }, [post.id]);

  return (
    <PostPreviewContainer variant={getLikeState()}>
      <div className='header'>
        <PostPreviewContent>
          <Avatar 
            content={post.anonymous ? 'Anônimo' : post.username}
          />
          <div className='authorInfo'>
            <h6>{post.title}</h6>
            <Subtitle>{post.anonymous ? 'Anônimo' : post.username}</Subtitle>
            {!isCardOpen &&
              <div className='downarrow' onClick={handleOpenCard}>
                <p>{post.repliesQuantity} resposta{post.repliesQuantity ? 's' : ''}</p>
                <div></div>
              </div>
            }
          </div>
        </PostPreviewContent>

        <div className="timeNlikes">
          <time title={publishedDateFormatted} dateTime={new Date(post.publishedAt).toISOString()}>
            {publishedDateRelativeToNow}
          </time>

          <button onClick={handleLikePost} className='likeButton' >
            <ThumbsUp size={20} /> {post.upvotes}
          </button>
        </div>
      </div>

      {isCardOpen &&
        <>
          <Comments key={post.id} post={post} comments={comments} />
          <div className='uparrow' onClick={handleOpenCard}>
            <p>Ocultar</p>
            <div></div>
          </div>
        </>
      }
    </PostPreviewContainer>
  );
}