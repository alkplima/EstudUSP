import { ImgHTMLAttributes } from 'react';
import styles from './Avatar.module.css'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
  randomColor?: string;
}

export function Avatar({ hasBorder = true, randomColor, ...props }: AvatarProps) {
  return (
    <div className={styles.imgBg} style={{backgroundColor: randomColor}}>
      <img 
        className={hasBorder ? styles.avatarWithBorder : styles.avatar} 
        {...props}
      />
    </div>
  );
}