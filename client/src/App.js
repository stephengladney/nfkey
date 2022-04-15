import "./App.css"
import { useEffect, useState } from "react"
import { generateIframe } from "./lib/iframe"
import { getLink } from "./lib/api"
import { Verify } from "./views/Verify"
import { Homepage } from "./views/Homepage"
import * as views from "./views/"

function App() {
  const { host, pathname } = window.document.location
  const isPath = pathname !== "/"
  const [link, setLink] = useState()
  const [view, setView] = useState(isPath ? views.LOADING : views.HOMEPAGE)

  useEffect(() => {
    if (isPath) {
      getLink(host, String(pathname).substring(1))
        .then((response) => response.json())
        .then((link) => {
          if (link.url) {
            setLink(link)
            setView(views.VERIFYING)
          } else {
            setView(views.HOMEPAGE)
          }
        })
        .catch((e) => alert(`error getting link: ${e}`))
    }
  }, [])

  useEffect(() => {
    if (view === views.VERIFIED) {
      const observer = new MutationObserver((_, observer) => {
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
  }, [view])

  return (
    <div className="App">
      {view === views.VERIFYING && <Verify link={link} setView={setView} />}
      {view === views.VERIFIED && <div id="container"></div>}
      {view === views.NEWLINK && <span>New link!</span>}
      {view === views.HOMEPAGE && (
        <div className="App">
          {
            <Homepage
              host={host}
              pathname={isPath ? pathname : null}
              setView={setView}
            />
          }
        </div>
      )}
    </div>
  )
}

export default App
