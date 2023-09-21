import styled from 'styled-components';

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme['green-500']};
  border-radius: 100%;
  width: fit-content;
  height: fit-content;

  .avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 8px;
    padding: 0.3rem;
  }
  
  .avatarWithBorder {
    width: calc(3rem + 12px);
    height: calc(3rem + 12px);
    border-radius: 100%;
    border: 4px solid ${props => props.theme['gray-800']};
    outline: 2px solid ${props => props.theme['green-500']};
    padding: 0.3rem;
  }
  
  /* &:not(.avatarWithBorder) {
    width: 2rem;
    height: 2rem;
    padding: 0.3rem;
  } */

`


// .imgBg .avatar {
//   width: 3rem;
//   height: 3rem;
//   border-radius: 8px;
// }

// .imgBg .avatarWithBorder {
//   width: calc(3rem + 12px);
//   height: calc(3rem + 12px);
//   border-radius: 100%;
//   border: 4px solid ${props => props.theme['gray-800']};
//   outline: 2px solid ${props => props.theme['green-500']};
// }

// .imgBg :not(.avatarWithBorder) {
//   width: 2rem;
//   height: 2rem;
//   padding: 0.3rem;
// }

// .imgBg {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: ${props => props.theme['green-500']};
//   border-radius: 100%;
//   width: fit-content;
//   height: fit-content;
// }