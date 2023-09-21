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
  outline: 2px solid ${props => props.isActive ? 'var(--green-500)' : 'none'};
  background: ${props => props.isActive ? 'var(--gray-700)' : 'var(--gray-800)'};
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
    color: var(--gray-100);
    line-height: 1.6;
    text-align: center;
  }
  
  .profile span {
    font-size: 0.875rem;
    color: var(--gray-400);
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  &:hover {
    background: var(--gray-700);
  } 

  @media (max-width: 768px) {
    position: initial;
  } 
`;


// .sidebar footer {
//   border-top: 1px solid var(--gray-600);
//   margin-top: 1.5rem;
//   padding: 1.5rem 2rem 2rem;
// }

// .sidebar footer a {
//   width: 100%;
//   background: transparent;
//   color: var(--green-500);
//   border: 1px solid var(--green-500);
//   border-radius: 8px;
//   height: 50px;
//   padding: 0 1.5rem;
//   font-weight: bold;
//   display: block;
//   text-decoration: none;

//   display: flex;
//   align-items: center;
//   justify-content: center;

//   gap: 0.5rem;

//   transition: color 0.1s, background-color 0.1s;
// }

// .sidebar footer a:hover {
//   background: var(--green-500);
//   color: var(--white);
// }


// }