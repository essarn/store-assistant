import fetch from 'node-fetch'

export const makeUrl = (path: string, parameters?: Record<string, string>) => {
  const url = new URL(path, 'https://www.willys.se')
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

type MockSessionHeaders = {
  cookie: string
  'x-csrf-token': string
}

export const mockSession = async (
  store: string
): Promise<MockSessionHeaders> => {
  const response = await fetch(makeUrl('axfood/rest/csrf-token'))
  const text = await response.text()

  const cookie = response.headers.raw()['set-cookie'][0]
  const session = cookie.split('=')[1]
  const token = text.replaceAll('"', '')

  const headers = { cookie: `JSESSIONID=${session}`, 'x-csrf-token': token }
  await activateStore(headers, store)

  return headers
}

const activateStore = async (headers: MockSessionHeaders, store: string) => {
  const url = makeUrl('axfood/rest/store/activate')
  const params = new URLSearchParams({
    storeId: store,
    activelySelected: 'true',
  })

  await fetch(url, {
    method: 'POST',
    headers,
    body: params,
  })
}
