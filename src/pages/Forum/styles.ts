import styled from "styled-components";


export const ForumContainer = styled.div`

  width: 100%;
  max-width: 73.13rem;
  margin: 2rem auto;
  padding: 0 1rem;
  
  display: grid;
  grid-template-columns: 278px 1fr;
  gap: 2rem;
  align-items: flex-start;
  
  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;

    > button {
      margin: 0 0 0 auto;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`