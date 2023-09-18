import { ImgHTMLAttributes } from 'react';
import { AvatarContainer } from './styles';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
  randomColor?: string;
}

export function Avatar({ hasBorder = true, randomColor, ...props }: AvatarProps) {
  return (
    <AvatarContainer style={{backgroundColor: randomColor}}>
      <img 
        className={hasBorder ? 'avatarWithBorder' : 'avatar'} 
        {...props}
      />
    </AvatarContainer>
  );
}