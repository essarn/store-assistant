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

export type Campaign = {
  __typename?: 'Campaign';
  code: Scalars['ID'];
  comparePrice?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  end: Scalars['Timestamp'];
  image: Scalars['String'];
  manufacturer: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['String'];
  savePrice?: Maybe<Scalars['String']>;
  start: Scalars['Timestamp'];
  type: Scalars['String'];
  volume: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  code: Scalars['ID'];
  image: Scalars['String'];
  manufacturer: Scalars['String'];
  name: Scalars['String'];
  volume: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  campaignProducts: Array<Product>;
  campaigns: Array<Campaign>;
};


export type QueryCampaignProductsArgs = {
  code: Scalars['String'];
};

export type CampaignProductsQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type CampaignProductsQuery = { __typename?: 'Query', campaignProducts: Array<{ __typename?: 'Product', code: string, name: string, image: string, manufacturer: string, volume: string }> };

export type CampaignsQueryVariables = Exact<{ [key: string]: never; }>;


export type CampaignsQuery = { __typename?: 'Query', campaigns: Array<{ __typename?: 'Campaign', code: string, type: string, start: any, end: any, name: string, image: string, description?: string | null | undefined, manufacturer: string, volume: string, price: string, comparePrice?: string | null | undefined, savePrice?: string | null | undefined }> };


export const CampaignProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CampaignProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaignProducts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}}]}}]}}]} as unknown as DocumentNode<CampaignProductsQuery, CampaignProductsQueryVariables>;
export const CampaignsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Campaigns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaigns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"comparePrice"}},{"kind":"Field","name":{"kind":"Name","value":"savePrice"}}]}}]}}]} as unknown as DocumentNode<CampaignsQuery, CampaignsQueryVariables>;