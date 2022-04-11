import "./App.css"
import { useEffect, useRef, useState } from "react"
import axios from "axios"

const style = {
  height: "100vh",
  width: "100%",
  border: 0,
}

function getLink(host, path) {
  return axios.get(`http://localhost:5000/api/link?host=${host}&path=${path}`)
}

function App() {
  const iframeRef = useRef()
  const h1Ref = useRef()
  const [isValidLink, setIsValidLink] = useState()
  const [link, setLink] = useState()

  useEffect(() => {
    const { host, pathname } = window.document.location

    getLink(host, String(pathname).substring(1))
      .then(({ data: link }) => {
        if (!link) setIsValidLink(false)
        else {
          setIsValidLink(true)
          setLink(link)
        }
      })
      .catch((e) => alert(e))
  }, [])

  return (
    <div className="App">
      <h1 ref={h1Ref}></h1>
      <iframe style={style} ref={iframeRef} title="link"></iframe>
    </div>
  )
}

export default App
