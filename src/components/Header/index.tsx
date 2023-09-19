import { HeaderContainer } from "./styles";

import logo from '../../assets/estudusp_logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="" />
    </HeaderContainer>
  )
}