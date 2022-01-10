export const makeUrl = (path: string, parameters?: Record<string, string>) => {
  const url = new URL(path, 'https://willys.se')
  for (const key in parameters) {
    url.searchParams.append(key, parameters[key])
  }
  url.searchParams.append('avoidCache', Date.now().toString())

  return url.href
}

export const parseDate = (date: string) => {
  let parts = date.split('-')
  parts = [parts[1], ...parts[0].split('/').reverse()]

  const year = parseInt(parts[0])
  const month = parseInt(parts[1]) - 1 // Varför? :(
  const day = parseInt(parts[2])

  return new Date(Date.UTC(year, month, day))
}
