import { useState } from 'react';

import { format, formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar';
import styles from './PostPreview.module.css'
import { Post } from './Post';

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
    <article className={styles.postPreview}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            {!isCardOpen ?
              <>
                <p>{post.author.username}</p>
                <strong>{post.title}</strong>
                <div className={styles.downarrow} onClick={handleOpenCard}><div></div></div>
              </>
              :
              <>
                <strong>{post.author.username}</strong>
                <p>{post.title}</p>
                <Post key={post.id} post={post} />
                <div className={styles.uparrow} onClick={handleOpenCard}><div></div></div>
              </>
            }
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>
    </article>
  );
}