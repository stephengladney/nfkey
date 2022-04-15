import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { generateId } from "../lib/id"
import { getLink } from "../lib/api"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  @media screen and (max-width: 768px) {
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    position: absolute;
    top: 25%;
    width: 100%;
  }

  @media screen and (min-width: 1025px) {
    position: absolute;
    top: 25%;
  }
`

const Title = styled.h1`
  font-family: "Archivo Black";
  font-size: 72px;
  color: #eee;
  margin-bottom: 0px;
`

const Highlighted = styled.span`
  color: #0cf;
`

const BodyContainer = styled.div`
  margin-top: 30px;
  @media screen and (max-width: 768px) {
    max-width: 75%;
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    max-width: 80%;
  }

  @media screen and (min-width: 1025px) {
    /* max-width: 70%; */
  }
`

const BodyText = styled.span`
  color: #ddd;
  font-family: "Raleway";
  font-size: 18px;
`

const StyledInput = styled.input`
  background-color: #112;
  color: #ddd;
  border: 1px solid ${(p) => (p.isError ? "#d00" : "#ddd")};
  font-family: "Mukta";
  font-size: 1em;
  padding: 6px;
  width: 100%;
`
const InputErrorText = styled.span`
  color: #d00;
`

const StyledLabel = styled.label`
  color: #ddd;
  margin-right: 15px;
  font-family: "Mukta";
  font-size: 1em;
  font-weight: 700;
  text-transform: uppercase;
`

const FormContainer = styled.div`
  /* text-align: center; */
  margin-top: 40px;
`

const FormLeftColumn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const FormRightColumn = styled.div`
  display: flex;
  grid-column-start: 2;
  /* text-align: left; */
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin-bottom: 20px;
`

const StyledButton = styled.button`
  background-color: transparent;
  border: 1px solid #0cf;
  color: #0cf;
  cursor: pointer;
  font-family: "Mukta";
  font-size: 1em;
  font-weight: 700;
  margin-left: 10px;
  padding: 7px;
  text-transform: uppercase;
`

const NFKeyURL = styled.label`
  color: #aaa;
  font-family: "Mukta";
  font-size: 1em;
  font-weight: 700;
  margin-right: 15px;
`

export function NewLinkForm({}) {
  const [urlPath, setUrlPath] = useState(generateId(6))
  const [isUrlPathTaken, setIsUrlPathTaken] = useState(false)
  const [smartContractAddress, setSmartContractAddress] = useState("")
  const typingTimer = useRef()

  const handleRandomizeClick = () => {
    setUrlPath(generateId(6))
  }

  const handleUrlPathChange = (e) => {
    setUrlPath(e.target.value)
  }

  const handleSmartContractAddressChange = (e) => {
    setSmartContractAddress(e.target.value)
  }

  useEffect(() => {
    clearTimeout(typingTimer.current)
    typingTimer.current = setTimeout(() => {
      getLink("localhost:3000", urlPath)
        .then((response) => response.json())
        .then((link) => {
          console.log(urlPath)
          if (link.url) {
            setIsUrlPathTaken(true)
          } else {
            setIsUrlPathTaken(false)
          }
        })
        .catch((e) => alert(`error getting link: ${e}`))
    }, 1000)
  }, [urlPath])

  return (
    <Container>
      <Title>
        NF<Highlighted>Key</Highlighted>
      </Title>
      <BodyContainer>
        <BodyText>Please complete all of the fields below.</BodyText>
        <FormContainer>
          <FormRow>
            <FormLeftColumn>
              <div style={{ flexGrow: 1, textAlign: "left" }}>
                <StyledLabel>Shortlink</StyledLabel>
              </div>
              <NFKeyURL>nfkey.to/</NFKeyURL>
            </FormLeftColumn>

            <FormRightColumn>
              <StyledInput
                isError={isUrlPathTaken}
                onChange={handleUrlPathChange}
                value={urlPath}
              />

              <StyledButton onClick={handleRandomizeClick}>
                Randomize
              </StyledButton>
            </FormRightColumn>
          </FormRow>
          <FormRow>
            <FormLeftColumn>
              <StyledLabel>Smart contract address</StyledLabel>
            </FormLeftColumn>
            <FormRightColumn>
              <StyledInput
                onChange={handleSmartContractAddressChange}
                style={{ minWidth: "350px" }}
              />
            </FormRightColumn>
          </FormRow>

          <StyledButton
            onClick={handleRandomizeClick}
            style={{ marginTop: "40px" }}
          >
            Generate Link
          </StyledButton>
        </FormContainer>
      </BodyContainer>
    </Container>
  )
}
