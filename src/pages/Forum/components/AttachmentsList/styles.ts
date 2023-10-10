import styled from "styled-components";

export const Container = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;

  img {
    max-width: 80%;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    background-color: ${props => props.theme['surface-container-highest']};

    > div { // div do link + check à direita
      display: flex;

      a svg {
        width: 20px;
        margin: 0 !important;
        color: ${props => props.theme['primary']} !important;
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

interface PreviewContainerProps {
  src?: string;
}

export const PreviewContainer = styled.div<PreviewContainerProps>`
  width: 36px;
  min-width: 36px;
  height: 36px;
  border-radius: 5px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 10px;
`;
