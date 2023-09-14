import { useState } from 'react';
import { Heart, ThumbsDown, ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'
import { Avatar } from './Avatar'
import anonymousImgs from '../../data/anonymousImgs'
import colors from '../../data/colors'

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

  function handleDislikeComment() {
    if (likeCount === 0) return;
    setLikeCount(previousState => {
      return previousState - 1;
    });
  }

  function calcularHash(str: string, tamanhoMaximo: number): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char; // Fórmula de hash simples
    }
    return Math.abs(hash) % tamanhoMaximo;
  }

  return (
    <div className={styles.comment}>
      <Avatar 
        hasBorder={false}  
        randomColor={colors[calcularHash(content, colors.length)]}
        src={anonymousImgs[calcularHash(content, anonymousImgs.length)]} 
      />

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
          <div>
            <Heart size={20} className={styles.heartIcon} />
            : {likeCount}
          </div>
          <button onClick={handleLikeComment} className={styles.likeButton}>
            <ThumbsUp size={20} />
            Curtir
          </button>
          <button onClick={handleDislikeComment} className={styles.dislikeButton}>
            <ThumbsDown size={20} />
            Descurtir
          </button>
        </footer>
      </div>
    </div>
  )
}