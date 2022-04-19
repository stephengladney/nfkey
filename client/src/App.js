import "./App.css"
import { useEffect, useState } from "react"
import { generateIframe } from "./lib/iframe"
import { getLink } from "./lib/api"
import { Verify } from "./views/Verify"
import { Homepage } from "./views/Homepage"
import { VIEWS } from "./views/const"
import { NewLinkForm } from "./views/NewLinkForm"
import { NewLinkSuccess } from "./views/NewLinkSuccess"

function App() {
  const { host, pathname } = window.document.location
  const isPath = pathname !== "/"
  const [link, setLink] = useState()
  const [view, setView] = useState(isPath ? VIEWS.LOADING : VIEWS.HOMEPAGE)
  const [newLink, setNewLink] = useState({})

  useEffect(() => {
    if (isPath) {
      getLink(host, String(pathname).substring(1))
        .then(({ data: link }) => {
          if (link.destination_url) {
            setLink(link)
            setView(VIEWS.VERIFYING)
          } else {
            setView(VIEWS.HOMEPAGE)
          }
        })
        .catch((e) => alert(`error getting link: ${e}`))
    }
  }, [])

  useEffect(() => {
    if (view === VIEWS.VERIFIED) {
      const observer = new MutationObserver((_, observer) => {
        if (document.getElementById("container")) {
          generateIframe(link.destination_url)
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
      {view === VIEWS.VERIFYING && <Verify link={link} setView={setView} />}
      {view === VIEWS.VERIFIED && <div id="container"></div>}
      {view === VIEWS.NEWLINKFORM && (
        <NewLinkForm setNewLink={setNewLink} setView={setView} />
      )}
      {view === VIEWS.NEWLINKSUCCESS && (
        <NewLinkSuccess newLink={newLink} setView={setView} />
      )}
      {view === VIEWS.HOMEPAGE && (
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
