import {
  BodyContainer,
  BodyText,
  ButtonContainer,
  Container,
  Description,
  FadeBlock,
  Highlighted,
  StyledButton,
  Title,
} from "./styles"
import { VIEWS } from "./const"
import { Fragment, useEffect } from "react"
import { Footer } from "../components/Footer"

export function Homepage({ fade, setFade, setView }) {
  useEffect(() => {
    setFade({ in: true })
  }, [])
  return (
    <Fragment>
      <Container>
        <Title>
          NF<Highlighted>Key</Highlighted>
        </Title>
        <FadeBlock fade={fade}>
          <Description>
            Create Ethereum token based access for your content.
          </Description>
          <BodyContainer>
            <BodyText>No code. No gas fees. No questions.</BodyText>
          </BodyContainer>
          <ButtonContainer>
            <StyledButton
              onClick={() => {
                setFade({ in: false })
                setTimeout(() => setView(VIEWS.NEWLINKFORM), 800)
              }}
            >
              Create new link
            </StyledButton>
          </ButtonContainer>
          <Footer />
        </FadeBlock>
      </Container>
    </Fragment>
  )
}
