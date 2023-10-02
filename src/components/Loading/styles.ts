import styled from "styled-components";

interface LoadingProps {
  size: number;
}

export const Loading = styled.figure<LoadingProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    width: ${props => props.size}rem;
    padding-top: 2rem;

    img {
      width: 25%;
    }
`