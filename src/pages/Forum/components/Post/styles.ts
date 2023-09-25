import styled from 'styled-components';

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;

  .content {
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;

    a {
      font-weight: bold;
      color: ${props => props.theme['tertiary']};
      text-decoration: none;
      transition: color 0.2s;
      
      :hover {
        opacity: 0.9;
      }
    }

    .buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .bigButtons {
        display: flex;
        gap: 1rem;
      }

      .likeDislikeButtons {
        display: flex;
        gap: 0.5rem;

        .likeButton, .dislikeButton {
          background: transparent;
          color: ${props => props.theme['gray-400']};
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
        }

        .likeButton:hover {
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

    .sameQuestionButton {
      padding: 0.4rem 1.25rem;
      border-radius: 8px;
      width: fit-content;
      margin-top: 1.5rem;
      color: ${props => props.theme['primary']};
      background: transparent;
      border: 1px solid ${props => props.theme['primary']};

      &:hover {
        border: 1px solid transparent;
        background: ${props => props.theme['primary']};
        color: ${props => props.theme['on-primary']};
      }
    }
  }

  .separator {
    align-self: center;
    width: 100%;
    height: 1px;
    background-color: ${props => props.theme['gray-600']};
    margin-block: 1.5rem;
  }

  .commentList {
    width: 100%;
    margin-block: 0 2rem;
  }

  .commentList > h6 {
    line-height: 1.6;
    color: ${props => props.theme['on-surface']};
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
    color: ${props => props.theme['on-surface']};
  }

  input[type="text"] {
    width: 100%;
    background: ${props => props.theme['surface-container-lowest']};
    border: 0;
    padding: 1rem;
    border-radius: 8px;
    color: ${props => props.theme['on-surface']};
  }

  textarea {
    width: 100%;
    background: ${props => props.theme['surface-container-lowest']};
    border: 0;
    resize: none;
    height: 6rem;
    padding: 1rem;
    border-radius: 8px;
    color: ${props => props.theme['on-surface']};
    line-height: 1.4;
  }

  :focus-within footer {
    visibility: visible;
    max-height: none;
  }
`