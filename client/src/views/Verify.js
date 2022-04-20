import { Fragment, useEffect, useState } from "react"
import styled from "styled-components"
import * as wallet from "../lib/wallet"
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
  const [ethAccount, setEthAccount] = useState()
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isAwaitingVerification, setIsAwaitingVerification] = useState(false)
  const [isFailedToVerify, setIsFailedToVerify] = useState(false)

  const handleMetamask = async () => {
    try {
      await wallet.getEthAccounts()
      setIsWalletConnected(true)
    } catch {}
  }

  const verifyWallet = async () => {
    try {
      const verifyParams = await wallet.getSignatureAndAddress(
        "Welcome to NFKey!\n\nPlease click Sign to verify that you own this wallet. This will not result in a blockchain transaction or incur any gas fees."
      )
      if (wallet.verifySignature(verifyParams)) {
        setEthAccount(verifyParams.address)
      }
    } catch {
      setIsAwaitingVerification(false)
      setIsFailedToVerify(true)
    }
  }

  useEffect(() => {
    if (isWalletConnected) verifyWallet()
  }, [isWalletConnected])

  useEffect(() => {
    if (ethAccount) {
      setIsAwaitingVerification(true)
      axios
        .get(`api/verify?link_id=${link.id}&wallet_address=${ethAccount}`)
        .then(({ data: verdict }) => {
          if (verdict.allow) setView(VIEWS.VERIFIED)
          else {
            setIsAwaitingVerification(false)
            setIsFailedToVerify(true)
          }
        })
    }
  }, [ethAccount])

  return (
    <Container>
      <Title>
        NF<Highlighted>Key</Highlighted>
      </Title>
      {isAwaitingVerification && <Description>Verifying...</Description>}
      {isFailedToVerify && <Description>Verification failed.</Description>}
      {!isFailedToVerify && !isAwaitingVerification && (
        <Fragment>
          <Description>
            This content requires ownership of a specific ERC-20 token.
          </Description>
          <Description>
            Please verify ownership of the required token(s).
          </Description>
          <SmallText>Choose your wallet...</SmallText>
          <Button onClick={handleMetamask}>Metamask</Button>
        </Fragment>
      )}
    </Container>
  )
}
