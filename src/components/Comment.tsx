import { useState } from 'react';
import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'
import { Avatar } from './Avatar'

interface CommentProps {
  content: string;
  onDeleteComment: (commentToDelete: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    onDeleteComment(content);
  }

  function handleLikeComment() {
    setLikeCount(previousState => {
      return previousState + 1;
    });
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://ssl.gstatic.com/docs/common/profile/capybara_lg.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>angry_capybara08</strong>
              <time title='11 de setembro às 20:43' dateTime='2023-11-09 20:43:30'>Cerca de 1h atrás</time>
            </div>

            <button onClick={handleDeleteComment} title='Deletar comentário'>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp size={20} />
            Curtir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}