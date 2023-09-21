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

export const CommentBox = styled.div`

  flex: 1;

  .commentContent {
    background: ${props => props.theme['gray-700']};
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
        color: ${props => props.theme['gray-400']};
        
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
  
    p {
      margin-top: 1rem;
      color: ${props => props.theme['gray-300']};
    }



  }
  
  footer {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
    
    button {
      cursor: pointer;
      
      svg {
        margin-right: 0.5rem;
      }
    }
  }

  footer button, footer div {
    background: transparent;
    border: 0;
    color: ${props => props.theme['gray-400']};
    display: flex;
    align-items: center;
    border-radius: 2px;
  }

  .heartIcon {
    /* color: ${props => props.theme['red-500']}; */
  }

  footer .likeButton:hover {
    color: ${props => props.theme['green-300']};
  }

  footer .dislikeButton:hover {
    color: ${props => props.theme['red-500']};
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


