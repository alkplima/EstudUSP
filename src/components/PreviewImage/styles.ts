import styled from "styled-components";


interface PreviewContainerProps {
  src?: string;
}

export const PreviewContainer = styled.div<PreviewContainerProps>`
  width: 36px;
  height: 36px;
  border-radius: 5px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 10px;
`;