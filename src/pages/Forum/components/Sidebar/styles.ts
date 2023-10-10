import styled from "styled-components";

export const SidebarContainer = styled.aside`
  position: sticky;
  top: 2rem;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: fit-content;

  a {
    text-decoration: none;
  }

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    padding-left: 0.875rem;
  }

  @media (max-width: 1024px) {
    position: static;
    width: 100%;
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

  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 1rem;
    gap: 1rem;

    .cover {
      width: 4.5rem;
      height: 4.5rem;
    }
  } 
`;

export const ComplaintInfoContainer = styled.div`
  width: 100%;
  display: inline-flex;
  padding: 1.5rem 1rem;
  border: 1px solid ${props => props.theme['outline']};
  border-radius: 8px;

  
  p {
    color: ${props => props.theme['on-surface']};

    svg {
      color: ${props => props.theme['surface-variant']};
      align-self: center;
      justify-self: center;
    }

    a {
      text-decoration: none;
      color: ${props => props.theme['primary']};
      transition: all 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`