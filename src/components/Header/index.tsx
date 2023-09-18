import { HeaderContainer } from "./styles";

import logo from '../../assets/logo-x.svg'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="" />
    </HeaderContainer>
  )
}