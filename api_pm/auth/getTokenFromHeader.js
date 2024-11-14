export function getTokenFromHeader(headers) {
  if (headers && headers.Authorization) {
    const parted = headers.Authorization.split(' ')
    if (parted.length === 2) {
      return parted[1]
    } else {
      return null
    }
  } else {
    return null
  }
}
