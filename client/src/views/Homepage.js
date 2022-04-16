import styled from "styled-components"
import * as views from "./const"

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
  color: #fff;
  margin-bottom: 0px;
`

const Description = styled.h2`
  color: #ddd;
  font-family: "Raleway";
  padding-left: 20px;
  padding-right: 20px;

  @media screen and (max-width: 768px) {
    font-size: 1.5em;
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    font-size: 1.8em;
  }

  @media screen and (min-width: 1025px) {
    font-size: 2em;
  }
`

const PersonalizedLinkOffer = styled.h4`
  color: #ddd;
  font-family: "Raleway";
`

const Highlighted = styled.span`
  color: #0cf;
`

const BodyContainer = styled.div`
  @media screen and (max-width: 768px) {
    max-width: 75%;
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    max-width: 80%;
  }

  @media screen and (min-width: 1025px) {
    max-width: 40%;
  }
`

const BodyText = styled.span`
  color: #ddd;
  font-family: "Raleway";
  font-size: 18px;
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

  :hover {
    background-color: #001026;
  }

  @media screen and (max-width: 768px) {
    width: 80%;
  }
  @media screen and (min-width: 1025px) {
    width: 215px;
  }
`

const ButtonContainer = styled.div`
  margin-top: 40px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

export function Homepage({ host, pathname, setView }) {
  return (
    <Container>
      <Title>
        NF<Highlighted>Key</Highlighted>
      </Title>
      <Description>
        Create Ethereum token based access for your content.
      </Description>

      <BodyContainer>
        <BodyText>
          No code or cost required. Simply enter your destination URL and the
          smart contract address of the token required for access.
        </BodyText>
      </BodyContainer>
      {/* {pathname && (
        <PersonalizedLinkOffer>
          Want{" "}
          <Highlighted>
            {host}
            {pathname}
          </Highlighted>
          ? Click here.
        </PersonalizedLinkOffer>
      )} */}
      <ButtonContainer>
        <StyledButton onClick={() => setView(views.NEWLINK)}>
          Create new link
        </StyledButton>
      </ButtonContainer>
    </Container>
  )
}
