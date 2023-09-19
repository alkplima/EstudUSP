import styled from "styled-components";


export const ForumContainer = styled.div`

  max-width: 70rem;
  margin: 2rem auto;
  padding: 0 1rem;
  
  display: grid;
  grid-template-columns: 256px 1fr;
  gap: 2rem;
  align-items: flex-start;
  
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    
    h1 {
      font-family: 'Segoe_UI_Bold';
      color: var(--gray-100);
      align-self: center;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const NewQuestionCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  background: var(--gray-800);
  padding: 1rem 2rem;
  border-radius: 8px;

  strong {
    display: block;
    color: var(--gray-100);
    line-height: 1.6;
  }

  input[type="text"] {
    width: 100%;
    background: var(--gray-900);
    border: 0;
    padding: 1rem;
    border-radius: 8px;
    color: var(--gray-100);
  }

  textarea {
    width: 100%;
    background: var(--gray-900);
    border: 0;
    resize: none;
    height: 6rem;
    padding: 1rem;
    border-radius: 8px;
    color: var(--gray-100);
    line-height: 1.4;
  }

  button[type=submit] {
    padding: 1rem 1.5rem;
    margin-top: 1rem;
    border-radius: 8px;
    border: 0;
    background: var(--green-500);
    color: var(--white);
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.1s;
  }

  button[type=submit]:not(:disabled):hover {
    background: var(--green-300);
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
      background: var(--gray-600);
      border-radius: 8px;

      svg {
        color: var(--gray-100);
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