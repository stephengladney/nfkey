import "./App.css"
import { useEffect, useRef, useState } from "react"
import { generateIframe } from "./lib/iframe"
import { getLink } from "./lib/api"

function App() {
  const { host, pathname } = window.document.location
  const isPath = pathname !== "/"
  const [link, setLink] = useState()
  const [isLoading, setIsLoading] = useState(isPath ? true : false)
  const advertiseH1 = useRef()

  useEffect(() => {
    if (isPath) {
      getLink(host, String(pathname).substring(1))
        .then((response) => response.json())
        .then((link) => {
          if (link.url) setLink(link)
          setIsLoading(false)
        })
        .catch((e) => alert(e))
    }
  }, [])

  useEffect(() => {
    if (link) generateIframe(link.url)
  }, [link])

  return link ? (
    <div className="App">
      <div id="container"></div>
    </div>
  ) : (
    !isLoading && (
      <div className="App">
        {isPath && (
          <h1 ref={advertiseH1}>
            {host}
            {pathname} could be yours!
          </h1>
        )}
        {<h1>Homepage</h1>}
      </div>
    )
  )
}

export default App
