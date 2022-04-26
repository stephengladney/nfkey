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
          <BodyContainer customMobileWidth={"85%"}>
            <BodyText style={{ color: "#aeaeae" }}>
              NFKey is a free tool that allows you to create shortlinks to your
              private web2 content. These links require visitors to verify
              ownership of a specific Ethereum token or NFT in order to access
              the content. No code. No gas fees.
            </BodyText>
          </BodyContainer>
          <ButtonContainer>
            <StyledButton
              onClick={() => {
                setFade({ in: false })
                setTimeout(() => setView(VIEWS.NEWLINKFORM), 800)
              }}
            >
              Create new shortlink
            </StyledButton>
          </ButtonContainer>
          <Footer />
        </FadeBlock>
      </Container>
    </Fragment>
  )
}
