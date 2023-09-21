import styled from 'styled-components';

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${props => props.theme['gray-800']};
  border-radius: 8px;

  .content {
    display: flex;
    flex-direction: column;
    line-height: 1.6;
    color: ${props => props.theme['gray-300']};
    margin-top: 1rem;

    p {
      margin-top: 1rem;
    }

    a {
      font-weight: bold;
      color: ${props => props.theme['green-500']};
      text-decoration: none;
      
      :hover {
        color: ${props => props.theme['green-300']};
      }
    }

    > div {
      display: flex;
      gap: 1rem;
    }

    .likeButton {
      padding: 0.5rem 1rem;
      color: ${props => props.theme['gray-100']};
      background: ${props => props.theme['gray-600']};
      border: 1px solid transparent;
      border-radius: 8px;
      width: fit-content;
      margin-top: 2.5rem;

      &:hover {
        border: 1px solid ${props => props.theme['green-300']};
        background: transparent;
      }
    }
  }

  .commentList {
    width: 100%;
    margin-block: 2rem;
  }

  .commentList > strong {
    line-height: 1.6;
    color: ${props => props.theme['gray-100']};
  }

`


export const CommentForm = styled.form`

  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${props => props.theme['gray-600']};
  
  > strong {
    line-height: 1.6;
    color: ${props => props.theme['gray-100']};
  }

  input[type="text"] {
    width: 100%;
    background: ${props => props.theme['gray-900']};
    border: 0;
    padding: 1rem;
    border-radius: 8px;
    color: ${props => props.theme['gray-100']};
  }

  textarea {
    width: 100%;
    background: ${props => props.theme['gray-900']};
    border: 0;
    resize: none;
    height: 6rem;
    padding: 1rem;
    border-radius: 8px;
    color: ${props => props.theme['gray-100']};
    line-height: 1.4;
  }

  :focus-within footer {
    visibility: visible;
    max-height: none;
  }

  button[type=submit] {
    padding: .75rem 1.5rem;
    margin-top: 1rem;
    border-radius: 8px;
    border: 0;
    background: ${props => props.theme['green-500']};
    color: ${props => props.theme.white};
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.1s;
  }

  button[type=submit]:not(:disabled):hover {
    background: ${props => props.theme['green-300']};
  }

  button[type=submit]:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`