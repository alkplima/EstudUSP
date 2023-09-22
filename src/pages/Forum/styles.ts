import styled from "styled-components";


export const ForumContainer = styled.div`

  width: 100%;
  max-width: 70rem;
  margin: 2rem auto;
  padding: 0 1rem;
  
  display: grid;
  grid-template-columns: 256px 1fr;
  gap: 2rem;
  align-items: flex-start;
  
  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    
    h1 {
      font-family: 'Segoe_UI_Bold';
      color: ${props => props.theme['gray-100']};
      align-self: center;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const NewQuestionCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  background: ${props => props.theme['gray-800']};
  padding: 0.5rem 2rem;
  border-radius: 8px;

  strong {
    display: block;
    color: ${props => props.theme['gray-100']};
    line-height: 1.6;
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

  button[type=submit] {
    padding: .75rem 1.5rem;
    margin-block: 0 0.5rem;
    border-radius: 8px;
    border: 0;
    background: ${props => props.theme['blue-primary']};
    color: ${props => props.theme.white};
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.1s;
  }

  button[type=submit]:not(:disabled):hover {
    background: ${props => props.theme['blue-secondary']};
  }

  button[type=submit]:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const MainBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
 
  & .plusWrapper {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background: ${props => props.theme['gray-600']};
      border-radius: 8px;

      svg {
        color: ${props => props.theme['gray-100']};
      }
    }
  }
`

export const QuestionForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`