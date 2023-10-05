import styled from 'styled-components';

export interface PostPreviewContainerProps {
  variant: 'like' | '';
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

      .likeButton {
        background: transparent;
        color: ${props => props.theme['on-surface']};
        font-family: 'Segoe_UI_Bold';
        display: flex;
        align-items: center;
        gap: 0.5rem;
        border-radius: 2px;
        border: 0;

        svg {
          color: ${props => props.variant && props.variant === 'like' && props.theme['primary']};
          transition: all 0.2s;
        }
        
        &:hover svg {
          opacity: 0.8;
        }
      }
      
      button {
        cursor: pointer;
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
    transition: border 0.2s;

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
      margin-bottom: -.5em;
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
