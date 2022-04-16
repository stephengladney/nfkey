import { useEffect, useRef, useState } from "react"
import { generateId } from "../lib/id"
import { getLink } from "../lib/api"
import {
  Container,
  BodyContainer,
  BodyText,
  ButtonContainer,
  ErrorTextContainer,
  FormContainer,
  FormLeftColumn,
  FormRightColumn,
  FormRow,
  Highlighted,
  InputFeedbackText,
  NFKeyURL,
  StyledButton,
  StyledInput,
  StyledLabel,
  Title,
} from "./NewLinkForm.styles"

export function NewLinkForm({}) {
  const { pathname } = window.document.location
  const [destinationUrl, setDestinationUrl] = useState("")
  const [urlPath, setUrlPath] = useState(
    pathname ? String(pathname).substring(1) : generateId(6)
  )
  const [isUrlPathAvailable, setIsUrlPathAvailable] = useState(true)
  const [smartContractAddress, setSmartContractAddress] = useState("")
  const typingTimer = useRef()

  const handleRandomizeClick = () => {
    setUrlPath(generateId(6))
  }

  const handleDestinationUrlChange = (e) => {
    setDestinationUrl(e.target.value)
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
            setIsUrlPathAvailable(false)
          } else {
            setIsUrlPathAvailable(true)
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
        <BodyText>
          Enter the destination URL and the smart contract address of the token
          required for access.
        </BodyText>
        <FormContainer>
          <FormRow>
            <FormLeftColumn>
              <StyledLabel>Shortlink</StyledLabel>
              <NFKeyURL>nfkey.to/</NFKeyURL>
            </FormLeftColumn>

            <FormRightColumn>
              <StyledInput
                customWidth={"40%"}
                isError={!isUrlPathAvailable}
                onChange={handleUrlPathChange}
                spellCheck={false}
                value={urlPath}
              />
            </FormRightColumn>
          </FormRow>

          <ErrorTextContainer>
            <FormRightColumn>
              <InputFeedbackText isError={!isUrlPathAvailable}>
                {isUrlPathAvailable
                  ? "This URL is available!"
                  : "Sorry, this URL is already taken."}
              </InputFeedbackText>
            </FormRightColumn>
          </ErrorTextContainer>

          <FormRow>
            <FormLeftColumn>
              <StyledLabel>Destination URL</StyledLabel>
            </FormLeftColumn>
            <FormRightColumn>
              <StyledInput
                onChange={handleDestinationUrlChange}
                spellCheck={false}
                value={destinationUrl}
              />
            </FormRightColumn>
          </FormRow>

          <FormRow>
            <FormLeftColumn>
              <StyledLabel>Smart contract address</StyledLabel>
            </FormLeftColumn>
            <FormRightColumn>
              <StyledInput
                onChange={handleSmartContractAddressChange}
                spellCheck={false}
                value={smartContractAddress}
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
