import {
  Container,
  FadeBlock,
  UndecoratedLink,
  Title,
  Highlighted,
  Description,
} from "./styles"
import { Footer } from "../components/Footer"
import { useEffect } from "react"

export function NewLinkSuccess({ fade, setFade, newLink }) {
  useEffect(() => {
    setTimeout(() => setFade({ in: true }), 0)
  }, [])

  return (
    <Container>
      <UndecoratedLink href="https://nfkey.to">
        <Title style={{ marginBottom: "20px" }}>
          NF<Highlighted>Key</Highlighted>
        </Title>
      </UndecoratedLink>
      <FadeBlock fade={fade}>
        <Description>
          <a href={`https://${newLink.host}/${newLink.pathname}`}>
            {newLink.host}/{newLink.pathname}
          </a>{" "}
          is now live!
        </Description>
        <Footer />
      </FadeBlock>
    </Container>
  )
}
