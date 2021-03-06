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

function isFirstLetterVowel(word) {
  const firstLetter = String(word).substring(0, 1).toLowerCase()
  if (
    firstLetter === "a" ||
    firstLetter === "e" ||
    firstLetter === "i" ||
    firstLetter === "o" ||
    firstLetter === "u"
  )
    return true
  else return false
}

export function Verify({ link, setView }) {
  const [ethAccount, setEthAccount] = useState()
  const [isAwaitingVerification, setIsAwaitingVerification] = useState(false)
  const [isFailedToVerify, setIsFailedToVerify] = useState(false)
  const [contractNameAndSymbol, setContractNameAndSymbol] = useState()

  const handleConnect = async () => {
    try {
      await wallet.connectWallet()
      const verifyParams = await wallet.getSignatureAndAddress(
        "Welcome to NFKey!\n\nPlease click Sign to verify that you own this wallet. This will not result in a blockchain transaction or incur any gas fees."
      )
      if (wallet.verifySignature(verifyParams)) {
        setEthAccount(verifyParams.address)
      }
    } catch (e) {
      console.log(e)
      setIsAwaitingVerification(false)
      setIsFailedToVerify(true)
    }
  }

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

  useEffect(() => {
    if (link) {
      wallet
        .getSmartContractNameAndSymbol(link.requirement_smart_contract)
        .then((nameAndSymbol) => setContractNameAndSymbol(nameAndSymbol))
    }
  }, [link])

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
            This content requires ownership of{" "}
            {contractNameAndSymbol && isFirstLetterVowel(contractNameAndSymbol)
              ? "an "
              : "a "}
            {contractNameAndSymbol
              ? `${contractNameAndSymbol.name} (${contractNameAndSymbol.symbol})`
              : "specific ERC-721"}{" "}
            token.
          </Description>
          <Description>
            Please verify ownership of the required token(s).
          </Description>
          <Button onClick={handleConnect}>Verify Ownership</Button>
        </Fragment>
      )}
    </Container>
  )
}
