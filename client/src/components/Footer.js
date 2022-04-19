import styled from "styled-components"
import { UndecoratedLink } from "../views/styles"

const TwitterImage = styled.img`
  height: 42px;
  width: 42px;
  filter: brightness(0) invert(0.9);

  @media screen and (max-width: 768px) {
    /* margin-top: 40px; */
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    /* max-width: 80%; */
  }

  @media screen and (min-width: 1025px) {
    margin-top: 80px;
  }
`
export function Footer() {
  return (
    <UndecoratedLink href="https://twitter.com/nfkey1" target="_blank">
      <TwitterImage src={process.env.PUBLIC_URL + "/twitter.png"} />
    </UndecoratedLink>
  )
}
