// Left menu categorytree
export interface LeftMenuCategorytree {
  id: string
  category: string
  title: string
  url: string
  valid: boolean
  children: Child4[]
}

export interface Child4 {
  id: string
  category: string
  title: string
  url: string
  valid: boolean
  children: (Child2 | Children2 | Child3 | Child)[]
}

export interface Children2 {
  id: string
  category: string
  title: string
  url: string
  valid: boolean
  children: (Child3 | Child)[]
}

export interface Child3 {
  id: string
  category: string
  title: string
  url: string
  valid: boolean
  children: Child[]
}

export interface Child2 {
  id: string
  category: string
  title: string
  url: string
  valid: boolean
  children: Child[]
}

export interface Child {
  id: string
  category: string
  title: string
  url: string
  valid: boolean
  children: unknown[]
}

// Search Campaigns

export interface SearchCampaigns {
  results?: Result[]
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
  manufacturer?: string
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
  manufacturer?: string
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

// Rest Stores
export interface RestStores {
  openingHours: string[]
  specialOpeningHours: string[]
  address: Address
  geoPoint: GeoPoint
  name: string
  extraPickUpInformation: string
  franchiseStore: boolean
  storeId: string
  freeDeliveryThresholdFormatted: string
  b2bFreeDeliveryThresholdFormatted: string
  b2bPickingCostForDelivery: string
  pickingCostForCollect: string
  pickingCostForDelivery: string
  pickupInStoreCost: string
  b2bPickupInStoreCost: string
  deliveryCost: string
  pickingCostForCollectPlusPickupCost: string
  b2bPickingCostForCollectPlusPickupCost: string
  pickingCostForDeliveryPlusDeliveryCost: string
  b2bPickingCostForDeliveryPlusDeliveryCost: string
  b2bDeliveryCost: string
  customerServiceEmail: string
  customerServicePhone: string
  open: boolean
  openingHoursMessageKey: string
  openingStoreMessageValue: string
  flyerURL: string
  onlineStore: boolean
  willysHemma: boolean
  clickAndCollect: boolean
  b2BClickAndCollect: boolean
  activelySelected: boolean
  freePickingCostThresholdForCollectFormatted: string
  freePickingCostThresholdForDeliveryFormatted: string
  freeB2BPickingCostThresholdForCollectFormatted: string
  freeB2BPickingCostThresholdForDeliveryFormatted: string
  external: boolean
  storeChangeAllowed: boolean
  externalPickupLocation: boolean
}

export interface GeoPoint {
  latitude: number
  longitude: number
}

export interface Address {
  id?: string
  title?: unknown
  titleCode?: unknown
  firstName?: unknown
  lastName?: unknown
  companyName?: unknown
  line1?: string
  line2?: unknown
  town?: string
  region?: unknown
  postalCode?: string
  phone?: string
  email?: string
  country?: Country
  shippingAddress: boolean
  billingAddress: boolean
  defaultAddress: boolean
  visibleInAddressBook: boolean
  formattedAddress?: string
  cellphone?: unknown
  longitude?: number
  latitude?: number
  appartment?: unknown
  doorCode?: unknown
  customerComment?: unknown
}

export interface Country {
  isocode: string
  name: string
}

// Search Products
export interface SearchProducts {
  results?: SearchProductsResult[]
  sorts: Sort[]
  pagination: Pagination
  relatedResults?: unknown
  relatedResultsPagination: Pagination
  currentQuery?: unknown
  breadcrumbs: unknown[]
  facets: Facet[]
  freeTextSearch: string
  categoryCode?: unknown
  keywordRedirectUrl?: unknown
  spellingSuggestion?: unknown
  categoryName?: unknown
  customSuggestion?: unknown
  categoryBreadcrumbs?: unknown
}

// interface Facet {
//   code: string;
//   name: string;
//   priority: number;
//   category: boolean;
//   multiSelect: boolean;
//   visible: boolean;
//   topValues?: any;
//   values: Value[];
// }

// interface Value {
//   code: string;
//   name: string;
//   count: number;
//   query: Query2;
//   selected: boolean;
// }

// interface Query2 {
//   url: string;
//   query: Query;
// }

// interface Query {
//   value: string;
//   filterQueries?: any;
//   searchQueryContext?: any;
//   searchType?: any;
// }

// interface Pagination {
//   pageSize: number;
//   currentPage: number;
//   sort?: any;
//   numberOfPages: number;
//   totalNumberOfResults: number;
//   allProductsInCategoriesCount: number;
//   allProductsInSearchCount: number;
// }

export interface Sort {
  code: string
  name: string
  selected: boolean
}

export interface SearchProductsResult {
  potentialPromotions: unknown[]
  averageWeight?: unknown
  price: string
  priceValue: number
  priceNoUnit: string
  comparePrice: string
  comparePriceUnit: string
  depositPrice: string
  labels: unknown[]
  showGoodPriceIcon: boolean
  image: Image
  savingsAmount?: unknown
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
  manufacturer?: string
  productBasketType: ProductBasketType
  incrementValue: number
  outOfStock: boolean
  online: boolean
}

// interface ProductBasketType {
//   code: string;
//   type: string;
// }

// interface Image {
//   imageType: string;
//   format: string;
//   url: string;
//   altText?: any;
//   galleryIndex?: any;
//   width?: any;
// }
