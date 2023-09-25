import styled from 'styled-components';

export const Button = styled.button`

  padding: 0.4rem 1.25rem;
  border-radius: 8px;
  width: fit-content;
  margin-top: 1.5rem;
  color: ${props => props.theme['on-primary']};
  background: ${props => props.theme['primary']};
  border: 1px solid transparent;
  opacity: 0.9;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, opacity 0.2s;
  
  &:not(:disabled):hover {
    color: ${props => props.theme['primary']};
    background: transparent;
    border: 1px solid ${props => props.theme['primary']};
    opacity: 1;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

`;