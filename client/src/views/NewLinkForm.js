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

const URL_IS_AVAILALABLE = "This URL is available!"
const URL_IS_NOT_AVAILABLE = "Sorry, this URL is already taken."
const URL_MINIMUM_3_CHARS = "URL path must be at least 3 characters."
const URL_CHECKING_AVAILABILITY = "Checking availability..."

export function NewLinkForm({}) {
  const { pathname } = window.document.location
  const [destinationUrl, setDestinationUrl] = useState("")
  const [urlPath, setUrlPath] = useState(
    pathname !== "/" ? String(pathname).substring(1) : generateId(6)
  )
  const [urlPathFeedback, setUrlPathFeedback] = useState("")
  const [smartContractAddress, setSmartContractAddress] = useState("")
  const typingTimer = useRef()
  const isError =
    urlPathFeedback === URL_IS_NOT_AVAILABLE ||
    urlPathFeedback === URL_MINIMUM_3_CHARS

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
    if (String(urlPath).length < 3)
      return setUrlPathFeedback(URL_MINIMUM_3_CHARS)
    setUrlPathFeedback(" ")
    typingTimer.current = setTimeout(() => {
      setUrlPathFeedback(URL_CHECKING_AVAILABILITY)
      setTimeout(() => {
        getLink("localhost:3000", urlPath)
          .then((response) => response.json())
          .then((link) => {
            if (link.url) {
              setUrlPathFeedback(URL_IS_NOT_AVAILABLE)
            } else {
              setUrlPathFeedback(URL_IS_AVAILALABLE)
            }
          })
          .catch((e) => alert(`error getting link: ${e}`))
      }, 1000)
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
                isError={isError}
                onChange={handleUrlPathChange}
                spellCheck={false}
                value={urlPath}
              />
            </FormRightColumn>
          </FormRow>

          <ErrorTextContainer>
            <FormRightColumn>
              <InputFeedbackText
                isError={isError}
                isSuccess={urlPathFeedback === URL_IS_AVAILALABLE}
              >
                {urlPathFeedback}
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
