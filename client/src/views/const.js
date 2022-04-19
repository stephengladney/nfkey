//VIEWS
export const VIEWS = {
  LOADING: "loading",
  VERIFYING: "verifying",
  VERIFIED: "verified",
  NEWLINKFORM: "newlink-form",
  NEWLINKSUCCESS: "newlink-success",
  HOMEPAGE: "homepage",
}

// URL PATH FEEDBACK
export const URL_FEEDBACK = {
  IS_AVAILALABLE: "This URL is available!",
  IS_NOT_AVAILABLE: "Sorry, this URL is already taken.",
  MINIMUM_3_CHARS: "URL path must be at least 3 characters.",
  INVALID: "Invalid URL path",
  CHECKING_AVAILABILITY: "Checking availability...",
  BLANK: " ",
}

// REGEX
export const REGEX = {
  URL_PATH: /^[a-zA-Z0-9-_]*$/,
  DESTINATION_URL:
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,18}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
  SMART_CONTRACT: /^0x[a-fA-F0-9]{40}$/,
}
