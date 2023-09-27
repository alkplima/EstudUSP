import styled from "styled-components";

export const SidebarContainer = styled.aside`
  position: sticky;
  top: 2rem;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: fit-content;

  .returnMenu {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    color: ${props => props.theme['on-surface']};
    text-decoration: none;
    font-family: 'Segoe_UI_Bold';

    &:hover {
      text-decoration: underline;
      color: ${props => props.theme['primary']};
    }
  }
`


export const SidebarItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 2rem;

  border: 4px solid transparent;
  outline: none;
  background: ${props => props.theme['inverse-on-surface']};
  border-radius: 8px;
  overflow: hidden;

  .cover {
    width: 13.375rem;
    height: 8.25rem;
    border-radius: 8px;
    object-fit: cover;
  }
  
  .profile {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  /* @media (max-width: 768px) {
    position: initial;
  }  */
`;