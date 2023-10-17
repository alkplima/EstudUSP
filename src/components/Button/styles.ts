import styled from 'styled-components';

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  width: fit-content;

  font-weight: 700;
  color: ${props => props.theme['on-primary']};
  background: ${props => props.theme['primary']};
  border: 1px solid transparent;
  cursor: pointer;
  /* transition: background-color 0.2s, border-color 0.2s, opacity 0.2s; */
  
  &:not(:disabled):hover {
    color: ${props => props.theme['primary']};
    background: transparent;
    border: 1px solid ${props => props.theme['primary']};
  }

  &:disabled {
    opacity: 0.12;
    background: ${props => props.theme['on-surface']};
    cursor: not-allowed;
  }
`;