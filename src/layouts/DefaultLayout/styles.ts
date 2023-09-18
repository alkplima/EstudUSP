import styled from "styled-components";

export const LayoutContainer = styled.div`  
  background: ${(props) => props.theme['gray-800']};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
`