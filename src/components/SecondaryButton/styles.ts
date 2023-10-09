import styled from "styled-components";


interface SecondaryButtonProps {
  variant: true | false;
}

export const SecondaryButton = styled.button<SecondaryButtonProps>`
  padding: 0.5rem 1.25rem;
  max-height: 40px;
  border-radius: 8px;
  width: fit-content;
  color: ${props => props.theme['primary']};
  background: transparent;
  border: 1px solid ${props => props.theme['outline']};

  ${props => props.variant && `
    opacity: 0.7;
  `}

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${props => props.theme['surface-container-highest']};
    cursor: pointer;
  }

  @media (max-width: 768px) {
    max-height: fit-content;
  }
`;