import styled from 'styled-components';

export interface PostPreviewContainerProps {
  variant: 'like' | 'dislike' | '';
}

export const PostPreviewContainer = styled.article<PostPreviewContainerProps>`
  background: ${props => props.theme['inverse-on-surface']};
  border-radius: 8px;
  padding: 2rem;
  position: relative;
  
  .header {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    
    time {
      font-size: 0.875rem;
      color: ${props => props.theme['neutral-40']};
      white-space: nowrap;
      align-self: flex-end;
    }

    .timeNlikes {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      gap: 1rem;
  
      .likeDislikeButtons {
        display: flex;
        gap: 0.5rem;

        .likeButton, .dislikeButton {
          background: transparent;
          color: ${props => props.theme['on-surface']};
          display: flex;
          align-items: center;
          border-radius: 2px;
          border: 0;
        }
        
        button {
          cursor: pointer;
        }

        .likeButton {
          display: flex;
          gap: 0.5rem;

          svg {
            color: ${props => props.variant && props.variant === 'like' && props.theme['green-300']};
          }
        }

        .dislikeButton {
          color: ${props => props.variant && props.variant === 'dislike' &&  props.theme['red-500']};
        }

        .likeButton:hover svg {
          color: ${props => props.theme['green-300']};
        }

        .dislikeButton:hover {
          color: ${props => props.theme['red-500']};
        }

        .verticalSeparator {
          width: 1px;
          height: 1.5rem;
          background: ${props => props.theme['gray-600']};
        }

      }
    }
  }

  .downarrow, .uparrow {
    background: transparent;
    border-radius: 8px;
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    height: fit-content;
    width: fit-content;
    padding: 0.5rem 1rem;
    bottom: .5rem;
    left: 43%;
    border: 1px solid transparent;
    transition: all 0.2s ease-in-out;

    p {
      color: ${props => props.theme['primary']};
    }

    > div {
      height: 12px;
      width: 12px;
      transform: rotateY(0deg) rotate(45deg);
    }

    &:hover {
      /* background: ${props => props.theme['surface-container-highest']}; */
      border: 1px solid ${props => props.theme['primary']};
      cursor: pointer;
    }
  }

  .downarrow {
    visibility: hidden;
    left: 40%;

    > div {
      margin-top: -.3rem;
      border-bottom: 2px solid ${props => props.theme['primary']};
      border-right: 2px solid ${props => props.theme['primary']};
    }
  }

  .uparrow {
    > div {
      margin-bottom: -.3rem;
      border-top: 2px solid ${props => props.theme['primary']};
      border-left: 2px solid ${props => props.theme['primary']};
    }
  }

  &:hover .downarrow {
    visibility: visible;
  }
`

export const PostPreviewContent = styled.div`

  display: flex;
  align-items: flex-start;
  gap: 1rem;

  .authorInfo {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-self: center;
  }
`
