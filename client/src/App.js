import "./App.css"
import { useEffect, useRef, useState } from "react"
import { generateIframe } from "./lib/iframe"
import { getLink } from "./lib/api"
import { Verify } from "./views/Verify"
import { getEthAccounts } from "./lib/metamask"
import { Homepage } from "./views/Homepage"

function App() {
  const { host, pathname } = window.document.location
  const isPath = pathname !== "/"
  const [link, setLink] = useState()
  const [isLoading, setIsLoading] = useState(isPath ? true : false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    if (isPath) {
      getLink(host, String(pathname).substring(1))
        .then((response) => response.json())
        .then((link) => {
          if (link.url) {
            setLink(link)
            setIsVerifying(true)
          }
          setIsLoading(false)
        })
        .catch((e) => alert(`error getting link: ${e}`))
    }
  }, [])

  useEffect(() => {
    if (isVerified) {
      const observer = new MutationObserver((mutations, observer) => {
        if (document.getElementById("container")) {
          generateIframe(link.url)
          observer.disconnect()
        }
      })

      observer.observe(document, {
        attributes: true,
        childList: true,
        subtree: true,
      })
    }
  }, [isVerified])

  if (link) {
    return (
      <div className="App">
        {isVerifying ? (
          <Verify
            link={link}
            setIsVerified={setIsVerified}
            setIsVerifying={setIsVerifying}
          />
        ) : (
          <div id="container"></div>
        )}
      </div>
    )
  } else
    return (
      !isLoading && (
        <div className="App">
          {<Homepage host={host} pathname={isPath ? pathname : null} />}
        </div>
      )
    )
}

export default App
