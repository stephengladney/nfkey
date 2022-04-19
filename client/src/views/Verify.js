import { Fragment, useEffect, useState } from "react"
import styled from "styled-components"
import * as metamask from "../lib/metamask"
import { VIEWS } from "./const"
import axios from "axios"

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
    top: 25%;
  }
`

const Title = styled.h1`
  font-family: "Archivo Black";
  font-size: 72px;
  color: #fff;
  /* margin-bottom: 0px; */
`

const Description = styled.h2`
  color: #ddd;
  font-family: "Raleway";
`

const SmallText = styled.span`
  display: block;
  color: #aaa;
  font-family: "Mukta";
  margin-top: 40px;
  font-size: 20px;
`

const Highlighted = styled.span`
  color: #0df;
`

const Button = styled.button`
  background-color: transparent;
  border: 2px solid #ddd;
  color: #ddd;
  cursor: pointer;
  font-family: "Mukta";
  font-size: 1em;
  font-weight: 700;
  margin-top: 50px;
  text-transform: uppercase;
  padding: 15px;
`

export function Verify({ link, setView }) {
  const [ethAccounts, setEthAccounts] = useState([])
  const [isAwaitingVerification, setIsAwaitingVerification] = useState(false)

  const handleConnectMetamask = async () => {
    const accounts = await metamask.getEthAccounts()
    setEthAccounts(accounts)
  }

  useEffect(() => {
    if (ethAccounts.length > 0) {
      setIsAwaitingVerification(true)
      axios
        .get(`api/verify?link_id=${link.id}&wallet_address=${ethAccounts[0]}`)
        .then(({ data: verdict }) => {
          setView(verdict.allow ? VIEWS.VERIFIED : VIEWS.HOMEPAGE)
        })
    }
  }, [ethAccounts])

  return (
    <Container>
      <Title>
        NF<Highlighted>Key</Highlighted>
      </Title>
      {isAwaitingVerification && <Description>Verifying...</Description>}

      {!isAwaitingVerification && (
        <Fragment>
          <Description>
            This content requires ownership of a specific ERC-20 token.
          </Description>
          <Description>
            Please verify ownership of the required token(s).
          </Description>
          <SmallText>Choose your wallet...</SmallText>
          <Button onClick={handleConnectMetamask}>Metamask</Button>
        </Fragment>
      )}
    </Container>
  )
}
