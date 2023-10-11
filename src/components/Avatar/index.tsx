import { ImgHTMLAttributes } from 'react';
import { AvatarContainer } from './styles';
import anonymousImgs from '../../../data/anonymousImgs';
import colors from '../../../data/colors';
import AnonymousIcon from '../../assets/anonymous.svg'
import { useTheme } from 'styled-components';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
  randomColor?: string;
  content: string;
}

export function Avatar({ hasBorder = true, content, ...props }: AvatarProps) {
  const theme = useTheme();

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
    <AvatarContainer style={content==='Anônimo' ? {backgroundColor: theme['surface-variant']} : {backgroundColor: randomColor}}>
      {content=='Anônimo' ?
        <img 
          className={hasBorder ? 'avatarWithBorder' : 'avatar'}
          src={AnonymousIcon}
          {...props}
        />
        :
        <img 
          className={hasBorder ? 'avatarWithBorder' : 'avatar'}
          src={anonymousImgs[calcularHash(content, anonymousImgs.length)]}
          {...props}
        />
      }
    </AvatarContainer>
  );
}