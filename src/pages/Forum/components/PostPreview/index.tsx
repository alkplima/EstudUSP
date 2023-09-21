import { useState } from 'react';

import { format, formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

import { PostPreviewContainer, PostPreviewContent } from './styles';
import { Avatar } from '../../../../components/Avatar';
import { Post } from '../Post';

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

export function PostPreview({ post }: PostProps) {
  const [isCardOpen, setIsCardOpen] = useState(false);

  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm", {
    locale: ptBr 
  })

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
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
            content={post.author.username}
          />
          <div className='authorInfo'>
            {!isCardOpen ?
              <>
                <p>{post.author.username}</p>
                <strong>{post.title}</strong>
                <div className='downarrow' onClick={handleOpenCard}><div></div></div>
              </>
              :
              <>
                <strong>{post.author.username}</strong>
                <p>{post.title}</p>
                {/* <Post key={post.id} post={post} />
                <div className='uparrow' onClick={handleOpenCard}><div></div></div> */}
              </>
            }
          </div>
        </PostPreviewContent>

        <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </div>

      {isCardOpen &&
        <>
          <Post key={post.id} post={post} />
          <div className='uparrow' onClick={handleOpenCard}><div></div></div>
        </>
      }
    </PostPreviewContainer>
  );
}