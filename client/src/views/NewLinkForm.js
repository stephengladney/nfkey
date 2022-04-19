import { useEffect, useRef, useState } from "react"
import { generateId } from "../lib/id"
import { createLink, getLink } from "../lib/api"
import {
  Container,
  BodyContainer,
  BodyText,
  ButtonContainer,
  ErrorTextContainer,
  FadeBlock,
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
} from "./styles"
import { REGEX, URL_FEEDBACK, VIEWS } from "./const"
import { Footer } from "../components/Footer"

export function NewLinkForm({ fade, setFade, setNewLink, setView }) {
  const { pathname } = window.document.location
  const [destinationUrl, setDestinationUrl] = useState("")
  const [urlPath, setUrlPath] = useState(
    pathname !== "/" ? String(pathname).substring(1) : generateId(6)
  )
  const [urlPathFeedback, setUrlPathFeedback] = useState("")
  const [smartContractAddress, setSmartContractAddress] = useState("")
  const typingTimer = useRef()

  const isUrlPathError =
    urlPathFeedback === URL_FEEDBACK.IS_NOT_AVAILABLE ||
    urlPathFeedback === URL_FEEDBACK.MINIMUM_3_CHARS ||
    urlPathFeedback === URL_FEEDBACK.INVALID

  const isDestinationUrlError = !REGEX.DESTINATION_URL.test(destinationUrl)
  const isSmartContractAddressError =
    !REGEX.SMART_CONTRACT.test(smartContractAddress)

  const isAbleToSave =
    urlPathFeedback === URL_FEEDBACK.IS_AVAILALABLE &&
    !isSmartContractAddressError & !isDestinationUrlError

  const handleRandomizeClick = () => {
    setUrlPath(generateId(6))
  }

  const handleCreateClick = () => {
    createLink({
      host: "nfkey.to",
      pathname: urlPath,
      requirement_smart_contract: smartContractAddress,
      destination_url: destinationUrl,
    })
      .then((_) => {
        setNewLink({ host: "nfkey.to", pathname: urlPath })
        setFade({ in: false })
        setTimeout(() => setView(VIEWS.NEWLINKSUCCESS), 800)
      })
      .catch((e) => alert(`There was a problem.`))
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
    if (String(urlPath).length < 3) {
      return setUrlPathFeedback(URL_FEEDBACK.MINIMUM_3_CHARS)
    }
    if (!REGEX.URL_PATH.test(String(urlPath))) {
      return setUrlPathFeedback(URL_FEEDBACK.INVALID)
    }

    setUrlPathFeedback(URL_FEEDBACK.BLANK)
    typingTimer.current = setTimeout(() => {
      setUrlPathFeedback(URL_FEEDBACK.CHECKING_AVAILABILITY)
      setTimeout(() => {
        getLink("localhost:3000", urlPath)
          .then(({ data: link }) => {
            if (link.destination_url) {
              setUrlPathFeedback(URL_FEEDBACK.IS_NOT_AVAILABLE)
            } else {
              setUrlPathFeedback(URL_FEEDBACK.IS_AVAILALABLE)
            }
          })
          .catch((e) => alert(`error getting link: ${e}`))
      }, 1000)
    }, 1000)
  }, [urlPath])

  useEffect(() => {
    setFade({ in: true })
  }, [])

  return (
    <Container>
      <Title>
        NF<Highlighted>Key</Highlighted>
      </Title>
      <FadeBlock fade={fade}>
        <BodyContainer style={{ marginTop: "30px" }}>
          <BodyText>Please complete all of the fields below.</BodyText>
          <FormContainer>
            <FormRow>
              <FormLeftColumn>
                <StyledLabel>Shortlink</StyledLabel>
                <NFKeyURL>nfkey.to/</NFKeyURL>
              </FormLeftColumn>
              <FormRightColumn>
                <StyledInput
                  customWidth={"40%"}
                  isError={isUrlPathError}
                  onChange={handleUrlPathChange}
                  spellCheck={false}
                  value={urlPath}
                />
              </FormRightColumn>
            </FormRow>
            <ErrorTextContainer>
              <FormRightColumn>
                <InputFeedbackText
                  isError={isUrlPathError}
                  isSuccess={urlPathFeedback === URL_FEEDBACK.IS_AVAILALABLE}
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
                  isError={destinationUrl && isDestinationUrlError}
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
                  isError={smartContractAddress && isSmartContractAddressError}
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
                disabled={!isAbleToSave}
                onClick={handleCreateClick}
              >
                Create Shortlink
              </StyledButton>
            </ButtonContainer>
          </FormContainer>
        </BodyContainer>
        <Footer />
      </FadeBlock>
    </Container>
  )
}
