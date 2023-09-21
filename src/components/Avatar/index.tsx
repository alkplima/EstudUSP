import { ImgHTMLAttributes } from 'react';
import { AvatarContainer } from './styles';
import anonymousImgs from '../../../data/anonymousImgs';
import colors from '../../../data/colors';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
  randomColor?: string;
  content: string;
}

export function Avatar({ hasBorder = true, content, ...props }: AvatarProps) {


  function calcularHash(str: string, tamanhoMaximo: number): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char; // Fórmula de hash simples
    }
    return Math.abs(hash) % tamanhoMaximo;
  }
  
  const randomColor= colors[calcularHash(content, colors.length)];

  return (
    <AvatarContainer style={{backgroundColor: randomColor}}>
      <img 
        className={hasBorder ? 'avatarWithBorder' : 'avatar'}
        src={anonymousImgs[calcularHash(content, anonymousImgs.length)]}
        {...props}
      />
    </AvatarContainer>
  );
}