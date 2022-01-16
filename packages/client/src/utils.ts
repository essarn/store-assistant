import { Price } from './graphql/generated'

const numberFormat = new Intl.NumberFormat('sv-SE', {
  style: 'currency',
  currency: 'SEK',
})

export const parseDate = (date: string) => new Date(date).toLocaleDateString()

export const formatPrice = (price: Price) =>
  `${numberFormat.format(price.amount)}/${price.unit}`
