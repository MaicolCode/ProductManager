export function getUserData(user) {
  return {
    name: user.name,
    username: user.username,
    id: user.id,
    type: user.type
  }
}
