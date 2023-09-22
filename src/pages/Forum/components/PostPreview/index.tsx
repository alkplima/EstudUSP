import { useState } from 'react';

import { format, formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

import { PostPreviewContainer, PostPreviewContent } from './styles';
import { Avatar } from '../../../../components/Avatar';
import { Post } from '../Post';
import { CommentsProvider } from '../../../../contexts/CommentsContext';


// interface Content {
//   type: 'paragraph' | 'link';
//   content: string;
// }

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

export function PostPreview({ post }: PostProps) {

  const [isCardOpen, setIsCardOpen] = useState(false);

  const publishedDateFormatted = format(new Date(post.publishedAt), "d 'de' LLLL 'às' HH:mm", {
    locale: ptBr 
  })

  const publishedDateRelativeToNow = formatDistanceToNow(new Date(post.publishedAt), {
    locale: ptBr,
    addSuffix: true
  })

  function handleOpenCard() {
    setIsCardOpen(!isCardOpen);
  }


  return (
    <PostPreviewContainer>
      <div className='header'>
        <PostPreviewContent>
          <Avatar 
            content={post.name || 'Anônimo'}
          />
          <div className='authorInfo'>
            {!isCardOpen ?
              <>
                <p>{post.name}</p>
                <strong>{post.postTitle}</strong>
                <div className='downarrow' onClick={handleOpenCard}><div></div></div>
              </>
              :
              <>
                <strong>{post.name}</strong>
                <p>{post.postTitle}</p>
                {/* <Post key={post.id} post={post} />
                <div className='uparrow' onClick={handleOpenCard}><div></div></div> */}
              </>
            }
          </div>
        </PostPreviewContent>

        <time title={publishedDateFormatted} dateTime={new Date(post.publishedAt).toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </div>

      {isCardOpen &&
        <>
        <CommentsProvider>
          <Post key={post.id} post={post} />
          <div className='uparrow' onClick={handleOpenCard}><div></div></div>
        </CommentsProvider>
        </>
      }
    </PostPreviewContainer>
  );
}