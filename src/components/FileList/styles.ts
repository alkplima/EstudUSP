import styled from "styled-components";

export const Container = styled.ul`
  max-height: 10rem;
  overflow-y: scroll;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    background-color: ${props => props.theme['surface-container-highest']};

    > div { // div do link + check à direita
      display: flex;
    }

    & + li {
      margin-top: 15px;
    }

    span {
      max-width: fit-content;
      text-decoration: none;
    }
  }

  @media (max-width: 1024px) {
    li {
      > div svg {
        width: 1.5rem;
      }
    }
  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;

  > div {
    display: flex;
    flex-direction: column;

    span {
      font-size: 12px;
      color: ${props => props.theme["outline"]};
      margin-top: 5px;

      button {
        border: 0;
        background: transparent;
        color: #e57878;
        margin-left: 5px;
        cursor: pointer;
      }
    }

    strong {
      color: ${props => props.theme['on-surface-variant']};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  @media (max-width: 1024px) {

    > div { 
      max-width: calc(100vw - 17rem);

      strong {
        font-size: 0.875rem;
      }
    }
  }
`;
