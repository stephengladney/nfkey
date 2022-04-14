export function generateIframe(url) {
  const blobMe = URL["createObjectURL"](new Blob([""], { type: "text/html" }))
  const elIframe = document["createElement"]("iframe")
  elIframe["setAttribute"]("id", "itme")
  elIframe["setAttribute"]("frameborder", "0")
  elIframe["setAttribute"]("width", "100%")
  elIframe["setAttribute"]("style", "height: 100vh")
  elIframe["setAttribute"]("allowfullscreen", "true")
  elIframe["setAttribute"]("webkitallowfullscreen", "true")
  elIframe["setAttribute"]("mozallowfullscreen", "true")
  elIframe["setAttribute"]("src", blobMe)
  const idOne = "gepa_" + Date.now()
  elIframe["setAttribute"]("id", idOne)
  document.getElementById("container").appendChild(elIframe)

  const iframe = document.getElementById(idOne)
  iframe.contentWindow.document.write(
    '<script type="text/javascript">location.href = "' + url + '";\x3c/script>'
  )
}
