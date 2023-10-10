import styled from "styled-components";
import * as Dialog from '@radix-ui/react-dialog'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0; /* top, bottom, right e left = 0 */
  background: rgba(0, 0, 0, 0.75);
`;

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  width: 50vw;
  border-radius: 8px;
  padding: 2.5rem 3rem;
  background: ${props => props.theme['inverse-on-surface']};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  @media (max-width: 1024px) {
    min-width: 90vw;
    padding: 1.5rem 1rem;
  }
`;

export const QuestionForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  input[type="text"] {
    width: 100%;
    background: ${props => props.theme['surface-container-lowest']};
    border: 0;
    padding: 1rem;
    border-radius: 8px;
    color: ${props => props.theme['on-surface']};
  }

  textarea {
    width: 100%;
    background: ${props => props.theme['surface-container-lowest']};
    border: 0;
    resize: none;
    height: 10rem;
    padding: 1rem;
    border-radius: 8px;
    color: ${props => props.theme['on-surface']};
    line-height: 1.4;
  }

  span {
    text-decoration: underline;
    margin-top: -1rem;
    color: red;
  }

  button[type=submit] {
    padding: 0.5rem 1.25rem;
    border-radius: 8px;
    width: 100%;
    color: ${props => props.theme['primary']};
    background: transparent;
    border: 1px solid ${props => props.theme['primary']};

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      border: 1px solid transparent;
      background: ${props => props.theme['primary']};
      color: ${props => props.theme['on-primary']};
    }
  }
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${props => props.theme['gray-500']};
`;
