export function generateId(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let id = ""
  for (let i = 1; i <= length; i++) {
    id += chars[Math.floor(Math.random() * chars.length)]
  }
  return id
}
