import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
};

export type BaseCampaign = {
  code: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  image: Scalars['String'];
  manufacturer?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  volume?: Maybe<Scalars['String']>;
};

export type BaseProduct = {
  code: Scalars['ID'];
  image: Scalars['String'];
  manufacturer?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  volume?: Maybe<Scalars['String']>;
};

export type Campaign = BaseCampaign & {
  __typename?: 'Campaign';
  code: Scalars['ID'];
  comparePrice: Price;
  description?: Maybe<Scalars['String']>;
  image: Scalars['String'];
  manufacturer?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  price: Price;
  products: Array<PreviewProduct>;
  savePrice?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  until: Scalars['Timestamp'];
  volume?: Maybe<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  code: Scalars['ID'];
  name: Scalars['String'];
  parent?: Maybe<Scalars['ID']>;
};

export type PaginatedPreviewCampaignResponse = {
  __typename?: 'PaginatedPreviewCampaignResponse';
  items: Array<PreviewCampaign>;
  pagination: PaginationDetails;
};

export type PaginatedPreviewProductResponse = {
  __typename?: 'PaginatedPreviewProductResponse';
  items: Array<PreviewProduct>;
  pagination: PaginationDetails;
};

export type PaginationDetails = {
  __typename?: 'PaginationDetails';
  hasMore: Scalars['Boolean'];
  totalCount: Scalars['Float'];
};

export type PreviewCampaign = BaseCampaign & {
  __typename?: 'PreviewCampaign';
  code: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  image: Scalars['String'];
  manufacturer?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  volume?: Maybe<Scalars['String']>;
};

export type PreviewProduct = BaseProduct & {
  __typename?: 'PreviewProduct';
  code: Scalars['ID'];
  image: Scalars['String'];
  manufacturer?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  volume?: Maybe<Scalars['String']>;
};

export type Price = {
  __typename?: 'Price';
  amount: Scalars['Float'];
  unit: Scalars['String'];
};

export type Product = BaseProduct & {
  __typename?: 'Product';
  code: Scalars['ID'];
  comparePrice: Price;
  description?: Maybe<Scalars['String']>;
  ean: Scalars['String'];
  image: Scalars['String'];
  ingredients?: Maybe<Scalars['String']>;
  labels: Array<Scalars['String']>;
  manufacturer?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  price: Price;
  volume?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  campaign: Campaign;
  campaigns: PaginatedPreviewCampaignResponse;
  categories: Array<Category>;
  product: Product;
  products: PaginatedPreviewProductResponse;
  stores: Array<Store>;
};


export type QueryCampaignArgs = {
  code: Scalars['String'];
};


export type QueryCampaignsArgs = {
  category?: InputMaybe<Scalars['String']>;
  page: Scalars['Int'];
  size: Scalars['Int'];
};


export type QueryProductArgs = {
  code: Scalars['String'];
};


export type QueryProductsArgs = {
  page: Scalars['Int'];
  query: Scalars['String'];
  size: Scalars['Int'];
};

export type Store = {
  __typename?: 'Store';
  id: Scalars['ID'];
  name: Scalars['String'];
  online: Scalars['Boolean'];
};

export type CampaignQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type CampaignQuery = { __typename?: 'Query', campaign: { __typename?: 'Campaign', code: string, type?: string | null | undefined, name: string, description?: string | null | undefined, manufacturer?: string | null | undefined, volume?: string | null | undefined, until: any, savePrice?: string | null | undefined, price: { __typename?: 'Price', amount: number, unit: string }, comparePrice: { __typename?: 'Price', amount: number, unit: string }, products: Array<{ __typename?: 'PreviewProduct', code: string, name: string, image: string, manufacturer?: string | null | undefined, volume?: string | null | undefined }> } };

export type CampaignsQueryVariables = Exact<{
  category?: InputMaybe<Scalars['String']>;
  size: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type CampaignsQuery = { __typename?: 'Query', campaigns: { __typename?: 'PaginatedPreviewCampaignResponse', items: Array<{ __typename?: 'PreviewCampaign', code: string, type?: string | null | undefined, name: string, description?: string | null | undefined, image: string, manufacturer?: string | null | undefined, volume?: string | null | undefined }>, pagination: { __typename?: 'PaginationDetails', totalCount: number, hasMore: boolean } } };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', parent?: string | null | undefined, code: string, name: string }> };

export type ProductQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type ProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', code: string, ean: string, name: string, image: string, description?: string | null | undefined, manufacturer?: string | null | undefined, volume?: string | null | undefined, labels: Array<string>, ingredients?: string | null | undefined, price: { __typename?: 'Price', amount: number, unit: string }, comparePrice: { __typename?: 'Price', amount: number, unit: string } } };

export type ProductsQueryVariables = Exact<{
  query: Scalars['String'];
  size: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type ProductsQuery = { __typename?: 'Query', products: { __typename?: 'PaginatedPreviewProductResponse', items: Array<{ __typename?: 'PreviewProduct', code: string, name: string, image: string, manufacturer?: string | null | undefined, volume?: string | null | undefined }>, pagination: { __typename?: 'PaginationDetails', totalCount: number, hasMore: boolean } } };

export type StoresQueryVariables = Exact<{ [key: string]: never; }>;


export type StoresQuery = { __typename?: 'Query', stores: Array<{ __typename?: 'Store', id: string, name: string, online: boolean }> };


export const CampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Campaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"until"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comparePrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"savePrice"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}}]}}]}}]}}]} as unknown as DocumentNode<CampaignQuery, CampaignQueryVariables>;
export const CampaignsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Campaigns"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"size"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaigns"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}},{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"Variable","name":{"kind":"Name","value":"size"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}}]}}]}}]}}]} as unknown as DocumentNode<CampaignsQuery, CampaignsQueryVariables>;
export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parent"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const ProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Product"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"ean"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"labels"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comparePrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}}]}}]}}]} as unknown as DocumentNode<ProductQuery, ProductQueryVariables>;
export const ProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Products"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"size"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"Variable","name":{"kind":"Name","value":"size"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}}]}}]}}]}}]} as unknown as DocumentNode<ProductsQuery, ProductsQueryVariables>;
export const StoresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Stores"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stores"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"online"}}]}}]}}]} as unknown as DocumentNode<StoresQuery, StoresQueryVariables>;