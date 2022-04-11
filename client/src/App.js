import "./App.css"
import { useEffect, useRef, useState } from "react"

function getLink(host, path) {
  return fetch(`http://localhost:5000/api/link?host=${host}&path=${path}`)
}

function App() {
  const { host, pathname } = window.document.location
  const isPath = pathname !== "/"
  const iframeRef = useRef()
  const advertiseH1 = useRef()
  const [isValidLink, setIsValidLink] = useState()
  const [link, setLink] = useState()

  useEffect(() => {
    if (isPath) {
      getLink(host, String(pathname).substring(1))
        .then((response) => response.json())
        .then((link) => {
          if (!link.url) setIsValidLink(false)
          else {
            setLink(link)
            setIsValidLink(true)
          }
        })
        .catch((e) => alert(e))
    }
  }, [])

  useEffect(() => {
    if (isValidLink) iframeRef.current.src = link.url
  }, [isValidLink])

  return (
    <div className="App">
      {isValidLink && (
        <iframe
          style={{
            height: "100vh",
            width: "100%",
            border: 0,
          }}
          ref={iframeRef}
          title="link"
        ></iframe>
      )}
      {isPath && !isValidLink && (
        <h1 ref={advertiseH1}>
          {host}/{pathname} could be yours!
        </h1>
      )}
      <h1>Homepage</h1>
    </div>
  )
}

export default App
