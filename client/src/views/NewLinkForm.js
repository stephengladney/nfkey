import { Fragment, useEffect, useRef, useState } from "react"
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
    width: 80%;
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

  @media screen and (min-width: 1025px) {
    width: 100%;
  }
`

const InputErrorText = styled.span`
  color: #d00;
  font-family: "Mukta";
  font-size: 14px;
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
  margin-top: 40px;
`

const FormLeftColumn = styled.div`
  display: flex;
  /* justify-content: flex-end; */
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    justify-content: flex-end;
  }

  @media screen and (min-width: 1025px) {
    justify-content: flex-end;
  }
`

const FormRightColumn = styled.div`
  display: flex;

  /* text-align: left; */
  @media screen and (max-width: 768px) {
    flex-direction: column;
    /* grid-row-start: 2; */
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    grid-column-start: 2;
  }

  @media screen and (min-width: 1025px) {
    justify-content: flex-end;
    grid-column-start: 2;
  }
`

const FormRow = styled.div`
  display: grid;
  @media screen and (max-width: 768px) {
    grid-template-rows: 1fr 1fr;
    /* margin-bottom: 10px; */
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: 1fr 2fr;
  }

  @media screen and (min-width: 1025px) {
    grid-template-columns: 1fr 2fr;
    margin-bottom: 20px;
  }
`

const StyledButton = styled.button`
  background-color: transparent;
  border: 1px solid #0cf;
  color: #0cf;
  cursor: pointer;
  font-family: "Mukta";
  font-size: 1em;
  font-weight: 700;

  padding: 7px;
  text-transform: uppercase;

  @media screen and (max-width: 768px) {
    flex-grow: 1;
    margin-top: 10px;
    /* width: 100%; */
  }
  @media screen and (min-width: 1025px) {
    flex-grow: 1;
    margin-left: 10px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 34px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
  @media screen and (min-width: 1025px) {
    flex-direction: row;
  }
`

const NFKeyURL = styled.label`
  color: #aaa;
  font-family: "Mukta";
  font-size: 1em;
  font-weight: 700;
  margin-right: 15px;
`

const NFKeyURLSpacer = styled.div`
  @media screen and (max-width: 768px) {
    /* grid-template-rows: 1fr 1fr; */
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    /* grid-template-columns: 1fr 2fr; */
  }

  @media screen and (min-width: 1025px) {
    flex-grow: 1;
    text-align: left;
  }
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

  // useEffect(() => {
  //   clearTimeout(typingTimer.current)
  //   typingTimer.current = setTimeout(() => {
  //     getLink("localhost:3000", urlPath)
  //       .then((response) => response.json())
  //       .then((link) => {
  //         console.log(urlPath)
  //         if (link.url) {
  //           setIsUrlPathTaken(true)
  //         } else {
  //           setIsUrlPathTaken(false)
  //         }
  //       })
  //       .catch((e) => alert(`error getting link: ${e}`))
  //   }, 1000)
  // }, [urlPath])

  return (
    <Container>
      <Title>
        NF<Highlighted>Key</Highlighted>
      </Title>
      <BodyContainer>
        <BodyText>Please complete the fields below.</BodyText>
        <FormContainer>
          <FormRow>
            <FormLeftColumn>
              <div style={{}}>
                <StyledLabel>Shortlink</StyledLabel>
              </div>
              <NFKeyURL>nfkey.to/</NFKeyURL>
            </FormLeftColumn>

            <FormRightColumn>
              <StyledInput
                isError={isUrlPathTaken}
                onChange={handleUrlPathChange}
                spellCheck={false}
                value={urlPath}
              />
            </FormRightColumn>
          </FormRow>

          {isUrlPathTaken && (
            <FormRow style={{ marginBottom: 10, marginTop: -20 }}>
              <FormRightColumn>
                <InputErrorText>URL is taken</InputErrorText>
              </FormRightColumn>
            </FormRow>
          )}

          <FormRow>
            <FormLeftColumn>
              <StyledLabel>Smart contract address</StyledLabel>
            </FormLeftColumn>
            <FormRightColumn>
              <StyledInput
                onChange={handleSmartContractAddressChange}
                spellCheck={false}
              />
            </FormRightColumn>
          </FormRow>
          <ButtonContainer>
            <StyledButton onClick={handleRandomizeClick}>
              Randomize URL
            </StyledButton>
            <StyledButton
              onClick={handleRandomizeClick}
              // style={{ marginTop: "40px" }}
            >
              Create Shortlink
            </StyledButton>
          </ButtonContainer>
        </FormContainer>
      </BodyContainer>
    </Container>
  )
}
