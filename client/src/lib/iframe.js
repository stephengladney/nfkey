export function generateIframe(url) {
  const elIframe = document["createElement"]("iframe")
  elIframe["setAttribute"]("id", "itme")
  elIframe["setAttribute"]("frameborder", "0")
  elIframe["setAttribute"]("width", "100%")
  elIframe["setAttribute"]("style", "height: 100vh")
  document.getElementById("container").appendChild(elIframe)
  document.getElementById("itme").contentWindow.document.location = url
}
