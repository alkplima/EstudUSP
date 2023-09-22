import styled from "styled-components";

export const SidebarContainer = styled.aside`
  /* position: sticky;
  top: 2rem;
  bottom: 0;
  left: 0; */
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

interface SidebarItemProps {
  isActive: boolean;
}

export const SidebarItem = styled.div<SidebarItemProps>`
  border: 2px solid transparent;
  outline: 2px solid ${props => props.isActive ? props.theme['blue-secondary'] : 'none'};
  background: ${props => props.isActive ? props.theme['gray-700'] : props.theme['gray-800']};
  border-radius: 8px;
  overflow: hidden;

  .cover {
    width: 100%;
    height: 5rem;
    object-fit: cover;
  }
  
  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding-inline: 1rem;
  
    /* margin-top: calc(0px - 1.5rem - 6px); */
  }
  
  .profile strong {
    margin-top: 1rem;
    color: ${props => props.theme['gray-100']};
    line-height: 1.6;
    text-align: center;
  }
  
  .profile span {
    font-size: 0.875rem;
    color: ${props => props.theme['gray-400']};
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  &:hover {
    background: ${props => props.theme['gray-700']};
  } 

  @media (max-width: 768px) {
    position: initial;
  } 
`;