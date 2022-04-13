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
          console.log(link)
          if (link.url) {
            setLink(link)
            setIsVerifying(true)
          }
          setIsLoading(false)
        })
        .catch((e) => alert(`error getting link: ${e}`))
    }
  }, [])

  // useEffect(() => {

  //   if (isVerifying && !isVerified) {
  //     getEthAccounts().then((accounts) => {
  //       console.log(accounts)
  //       fetch(
  //         `http://localhost:5000/api/verify?link_id=${link.id}&wallet_address=${accounts[0]}`
  //       )
  //         .then((response) => response.json())
  //         .then((verdict) => setIsVerified(!!verdict.allow))
  //     })
  //   } else if (isVerified) {
  //     setIsVerifying(false)
  //     setTimeout(() => generateIframe(link.url), 2000)
  //   }
  // }, [isVerifying, isVerified])

  if (link) {
    return (
      <div className="App">
        {isVerifying ? <Verify /> : <div id="container"></div>}
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
