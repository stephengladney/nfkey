import styled from "styled-components"

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
    top: 30%;
  }
`

const Title = styled.h1`
  font-family: "Archivo Black";
  font-size: 72px;
  color: #fff;
`

const Description = styled.h2`
  color: #ddd;
  font-family: "Raleway";
`

const PersonalizedLinkOffer = styled.h3`
  color: #ddd;
  font-family: "Raleway";
`

const Highlighted = styled.span`
  color: #0df;
`

export function Homepage({ host, pathname }) {
  return (
    <Container>
      <Title>
        nf<Highlighted>key</Highlighted>
      </Title>
      <Description>
        Create ethereum token based access keys for your content.
      </Description>
      {pathname && (
        <PersonalizedLinkOffer>
          Want{" "}
          <Highlighted>
            {host}
            {pathname}
          </Highlighted>
          ? Click here.
        </PersonalizedLinkOffer>
      )}
    </Container>
  )
}
