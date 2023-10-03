import styled from 'styled-components';


export const CommentContainer = styled.div`

  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;

  > img {
    width: 3rem;
    height: 3rem;
    border-radius: 8px;
  }
`
export interface CommentBoxProps {
  variant: 'like' | '';
}

export const CommentBox = styled.div<CommentBoxProps>`
  flex: 1;

  .commentContent {
    background: ${props => props.theme['surface-container-high']};
    border-radius: 8px;
    padding: 0.5rem 1rem;
    
    header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      
      button {
        background: transparent;
        border: 0;
        cursor: pointer;
        color: ${props => props.theme['on-surface']};
        
        line-height: 0;
        border-radius: 2px;

        &:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        &:not(:disabled):hover {
          color: ${props => props.theme['red-500']};
        }
      }
    }

    .commentImgsWrapper {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;
      padding-block: 0.5rem;
  
      .commentImgs {
        min-width: 50%;
        width: fit-content;
        max-width: 80%;
      }
    }
  
    p {
      color: ${props => props.theme['gray-300']};
    }

    a {
      font-weight: bold;
      color: ${props => props.theme['yellow-usp']};
      text-decoration: none;
      
      :hover {
        opacity: 0.8;
      }
    }
    
    footer {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      justify-content: flex-end;
      
      button {
        cursor: pointer;
      }
  
      .verticalSeparator {
        width: 1px;
        height: 1.5rem;
        background: ${props => props.theme['gray-600']};
      }
    }
  
    footer button, footer div {
      background: transparent;
      border: 0;
      color: ${props => props.theme['on-surface']};
      display: flex;
      align-items: center;
      border-radius: 2px;
    }
  
    footer .likeButton {
      display: flex;
      gap: 0.5rem;
      font-family: 'Segoe_UI_Bold';

      svg {
        color: ${props => props.variant && props.variant === 'like' && props.theme['primary']};
        transition: all 0.2s;
      }
      
      &:hover svg {
        opacity: 0.8;
      }
    }
  }

  .authorAndTime {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .authorAndTime strong {
    display: block;
    font-size: 0.875rem;
    line-height: 1.6;
  }

  .authorAndTime time {
    display: block;
    font-size: 0.75rem;
    line-height: 1.6;
    color: ${props => props.theme['gray-400']};
  }
`


