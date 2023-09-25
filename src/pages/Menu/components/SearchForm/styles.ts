import styled from "styled-components";

export const SearchFormContainer = styled.form`
  width: 100%;
  display: flex;
  gap: 1rem;
  background-color: ${props => props.theme['surface-container-highest']};
  border-radius: 8px;
  padding: 1rem 0.75rem 1rem 1rem;

  input {
    flex: 1;
    border: 0;
    background-color: ${props => props.theme['surface-container-highest']};
    color: ${props => props.theme['on-surface-variant']};

    ::placeholder {
      color: ${props => props.theme['on-surface']};
    }
  }

  button {
    display: flex;
    align-items: center;

    border: 0;
    background: transparent;
    color: ${props => props.theme['on-surface-variant']};
    cursor: pointer;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      color: ${props => props.theme.white};
      transition: color 0.2s;
    }
  }
`;