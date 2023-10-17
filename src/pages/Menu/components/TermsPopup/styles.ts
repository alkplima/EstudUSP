import styled from "styled-components";

export const TermsPopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  width: calc(100% - 2rem);
  max-width: 48.375rem;
  padding: 3rem 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  border-radius: 8px;
  background-color: ${props => props.theme['inverse-on-surface']};

  @media (max-width: 768px) {
    padding: 3rem 2rem;
    margin: 1rem;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    max-width: calc(100% - 2rem);
  }
`;

export const TermsPopupContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  h4 {
    text-align: center;
  }

  > div {
    width: 100%;
    max-height: 20rem;
    overflow-y: auto;
    padding: 1rem;
    border-radius: 8px;
    background-color: ${props => props.theme['surface-variant']};

    p {
      font: 600 0.875rem/1.125rem 'Segoe_UI';
      color: ${props => props.theme['on-surface-variant']};
    }
  }
`;

export const TermsPopupButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    .checkbox {
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      background-color: transparent;
      cursor: pointer;
      transition: 0.2s;

      input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 1.3rem;
        height: 1.3rem;
        border: 2px solid ${props => props.theme['on-surface']};
        border-radius: 4px;
        outline: none;
      }

      input[type="checkbox"]:checked {
        background-color: ${props => props.theme['primary']};
        border-color: ${props => props.theme['primary']};

        &::after {
          content: '';
          display: inline-block;
          width: 5px;
          height: 10px;
          border: solid ${props => props.theme['on-primary']};
          border-width: 0 3px 3px 0;
          transform: rotate(45deg);
          margin-left: 4px;
          margin-bottom: 4px;
        }
      } 

      &:hover {
        background-color: ${props => `${props.theme['on-surface']}20`};

        input[type="checkbox"] {
          cursor: pointer;
        }
      }
    }

    p {
      font: 600 1rem/1.25rem 'Segoe_UI';
      color: ${props => props.theme['on-surface']};
    }
  }

  @media (max-width: 1080px) {
    > div .checkbox input[type="checkbox"]:checked::after {
      width: 4px;
      height: 8px;
      margin-left: 3px;
      margin-bottom: 5px;
    }
  }
`;