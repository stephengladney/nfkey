import { useState } from "react"
import styled from "styled-components"
import * as metamask from "../lib/metamask"

const Container = styled.div`
  text-align: center;
  width: 100%;

  @media screen and (max-width: 768px) {
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    position: absolute;
    /* top: 30%; */
  }
  @media screen and (min-width: 1025px) {
    position: absolute;
    top: 30%;
  }
`

const Title = styled.h1`
  font-family: "Archivo Black";
  font-size: 72px;
  color: #fff;
`

const Description = styled.h2`
  color: #ddd;
  font-family: "Raleway";
`

const PersonalizedLinkOffer = styled.h3`
  color: #ddd;
  font-family: "Raleway";
`

const Highlighted = styled.span`
  color: #0df;
`

export function Verify() {
  const [ethAccounts, setEthAccounts] = useState([])

  const handleConnectMetamask = () => {
    metamask.getEthAccounts().then((accounts) => setEthAccounts(accounts))
  }

  return (
    <Container>
      <Title>
        nf<Highlighted>key</Highlighted>
      </Title>
      <Description>
        This URL is protected by nfkey. Please verify ownership of the required
        token(s).
      </Description>
    </Container>
  )
}
