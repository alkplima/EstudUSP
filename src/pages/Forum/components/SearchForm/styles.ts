import styled from "styled-components";

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background-color: ${props => props.theme['gray-600']};
    color: ${props => props.theme['gray-100']};
    padding: 1rem;

    ::placeholder {
      color: ${props => props.theme['gray-300']};
    }

    :focus {
      box-shadow: 0 0 0 1px ${props => props.theme['blue-secondary']};
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    border: 0;
    padding: 0.5rem 1rem;
    background: transparent;
    border: 1px solid ${props => props.theme['yellow-usp']};
    color: ${props => props.theme['yellow-usp']};
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: ${props => props.theme['yellow-usp']};
      border-color: ${props => props.theme['yellow-usp']};
      color: ${props => props.theme.white};
      transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    }
  }
`;