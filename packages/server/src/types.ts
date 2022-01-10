// Search Campaigns

export interface SearchCampaigns {
  results: Result[]
  sorts?: unknown
  pagination: Pagination
  relatedResults?: unknown
  relatedResultsPagination?: unknown
  currentQuery?: unknown
  breadcrumbs: unknown[]
  facets: Facet[]
}

export interface Facet {
  code: string
  name: string
  priority: number
  category: boolean
  multiSelect: boolean
  visible: boolean
  topValues?: TopValue[]
  values: TopValue[]
}

export interface TopValue {
  code: string
  name: string
  count: number
  query: Query2
  selected: boolean
}

export interface Query2 {
  url: string
  query: Query
}

export interface Query {
  value: string
  filterQueries: unknown[]
  searchQueryContext?: unknown
  searchType?: unknown
}

export interface Pagination {
  pageSize: number
  currentPage: number
  sort?: unknown
  numberOfPages: number
  totalNumberOfResults: number
  allProductsInCategoriesCount: number
  allProductsInSearchCount: number
}

export interface Result {
  title: string
  productBasketType: ProductBasketType
  priceUnit: string
  labels?: string[]
  thumbnail: Thumbnail
  image: Thumbnail
  originalImage: Thumbnail
  energyDeclaration?: unknown
  showGoodPriceIcon: boolean
  price: string
  priceNoUnit: string
  potentialPromotions: PotentialPromotion[]
  ranking: number
  solrSearchScore: number
  name: string
  manufacturer: string
  displayVolume: string
  online: boolean
  googleAnalyticsCategory: string
}

export interface PotentialPromotion {
  conditionLabel?: string
  comparePrice?: string
  price?: number
  rewardLabel: string
  textLabelManual?: unknown
  textLabelGenerated?: unknown
  redeemLimitLabel: string
  code: string
  splashTitleText: string
  cartLabel: string
  campaignType: string
  promotionRedeemLimit: number
  promotionPercentage?: unknown
  promotionType: string
  promotionTheme: PromotionTheme
  priority?: unknown
  validUntil?: unknown
  timesUsed?: unknown
  qualifyingCount?: number
  threshold?: unknown
  brands: string[]
  redeemLimit: number
  discountPrice?: unknown
  weightVolume: string
  name: string
  sorting?: unknown
  savePrice?: string
  description?: string
  endDate: string
  startDate: string
  productCodes?: unknown
  realMixAndMatch: boolean
  mainProductCode: string
}

export interface PromotionTheme {
  code: string
  visible?: unknown
}

export interface Thumbnail {
  imageType: string
  format: string
  url: string
  altText?: unknown
  galleryIndex?: unknown
  width?: unknown
}

export interface ProductBasketType {
  code: string
  type: string
}

// Campaign Products
export interface CampaignProducts {
  page: number
  pageSize: number
  totalPages: number
  links: unknown
  items: Item[]
}

export interface Item {
  potentialPromotions: PotentialPromotion[]
  averageWeight?: unknown
  price: string
  priceValue: number
  priceNoUnit: string
  comparePrice: string
  comparePriceUnit: string
  depositPrice: string
  labels: string[]
  showGoodPriceIcon: boolean
  image: Image
  savingsAmount: number
  priceUnit: string
  energyDeclaration?: unknown
  productLine2: string
  pickupProductLine2: string
  isDrugProduct: boolean
  nicotineMedicalProduct: boolean
  nonEkoProduct: boolean
  googleAnalyticsCategory: string
  ranking?: unknown
  solrSearchScore?: unknown
  newsSplashProduct: boolean
  gdprTrackingIncompliant: boolean
  notAllowedAnonymous: boolean
  notAllowedB2b: boolean
  code: string
  name: string
  displayVolume: string
  thumbnail: Image
  manufacturer: string
  productBasketType: ProductBasketType
  incrementValue: number
  outOfStock: boolean
  online: boolean
}

export interface ProductBasketType {
  code: string
  type: string
}

export interface Image {
  imageType: string
  format: string
  url: string
  altText: string
  galleryIndex?: unknown
  width?: unknown
}

// export interface PotentialPromotion {
//   conditionLabelFormatted: string
//   cartLabelFormatted: string
//   conditionLabel: string
//   comparePrice: string
//   price: Price
//   rewardLabel: string
//   textLabelManual?: unknown
//   textLabelGenerated?: unknown
//   splashTitleText: string
//   campaignType: string
//   promotionRedeemLimit: number
//   promotionPercentage?: unknown
//   promotionType: string
//   promotionTheme: PromotionTheme
//   priority: number
//   redeemLimitLabel: string
//   code: string
//   cartLabel: string
//   validUntil: number
//   timesUsed: number
//   qualifyingCount: number
//   threshold?: unknown
//   productCodes: string[]
//   applied: boolean
//   realMixAndMatch: boolean
//   mainProductCode: string
// }

// export interface PromotionTheme {
//   code: string
//   visible: boolean
// }

export interface Price {
  currencyIso: string
  value: number
  priceType: string
  formattedValue: string
  minQuantity?: unknown
  maxQuantity?: unknown
}
