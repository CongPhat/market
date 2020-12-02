import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
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
};

export type Message = {
  __typename?: 'Message';
  _id: Scalars['ID'];
  content: Scalars['String'];
  userSend: User;
  userReceive: User;
  like: Scalars['Int'];
  date: Scalars['String'];
  isSend: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  id?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
};

export type Friend = {
  __typename?: 'Friend';
  idFriend: Scalars['String'];
  status: Scalars['Int'];
  isOwner: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  name: Scalars['String'];
  image: Scalars['String'];
  description: Scalars['String'];
  online: Scalars['Boolean'];
};

export type Category = {
  __typename?: 'Category';
  _id: Scalars['String'];
  name: Scalars['String'];
  icon: Scalars['String'];
  idParent: Scalars['String'];
};

export type Products = {
  __typename?: 'Products';
  _id: Scalars['String'];
  content: Scalars['String'];
  price: Scalars['String'];
  address: Scalars['String'];
  userId: Scalars['String'];
  categoryId: Scalars['String'];
  media: Array<Maybe<Media>>;
  trending: Scalars['Boolean'];
};

export type Media = {
  __typename?: 'Media';
  link: Scalars['String'];
  type: Scalars['Int'];
};

export type RootQuery = {
  __typename?: 'RootQuery';
  messages: Array<Message>;
  friends: Array<User>;
  friendsOnline: Array<User>;
  getProfile: User;
  getCategory: Array<Maybe<Category>>;
  getProducts: Array<Maybe<Products>>;
};


export type RootQueryMessagesArgs = {
  id: Scalars['String'];
  idUser: Scalars['String'];
  payload: Scalars['Int'];
};


export type RootQueryFriendsArgs = {
  id: Scalars['String'];
};


export type RootQueryGetProductsArgs = {
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
  idCategory: Scalars['String'];
};

export type RootMutation = {
  __typename?: 'RootMutation';
  createMessage: Message;
};


export type RootMutationCreateMessageArgs = {
  text: Scalars['String'];
  id: Scalars['String'];
  idUser: Scalars['String'];
};

export type RootSubscription = {
  __typename?: 'RootSubscription';
  messages: Array<Message>;
  newMessage: Message;
};


export type RootSubscriptionMessagesArgs = {
  id: Scalars['String'];
  idUser: Scalars['String'];
};


export type RootSubscriptionNewMessageArgs = {
  id?: Maybe<Scalars['String']>;
  idUser: Scalars['String'];
};

export type CreateMessagesMutationVariables = {
  text: Scalars['String'];
  id: Scalars['String'];
  idUser: Scalars['String'];
};


export type CreateMessagesMutation = (
  { __typename?: 'RootMutation' }
  & { createMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'content'>
  ) }
);

export type GetCategoryQueryVariables = {};


export type GetCategoryQuery = (
  { __typename?: 'RootQuery' }
  & { getCategory: Array<Maybe<(
    { __typename?: 'Category' }
    & Pick<Category, '_id' | 'name' | 'icon' | 'idParent'>
  )>> }
);

export type GetProductsQueryVariables = {
  pageSize: Scalars['Int'];
  pageNumber: Scalars['Int'];
  idCategory: Scalars['String'];
};


export type GetProductsQuery = (
  { __typename?: 'RootQuery' }
  & { getProducts: Array<Maybe<(
    { __typename?: 'Products' }
    & Pick<Products, '_id' | 'content' | 'price' | 'address' | 'userId' | 'categoryId' | 'trending'>
    & { media: Array<Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'link' | 'type'>
    )>> }
  )>> }
);

export type GetProfileQueryVariables = {};


export type GetProfileQuery = (
  { __typename?: 'RootQuery' }
  & { getProfile: (
    { __typename?: 'User' }
    & Pick<User, 'name' | 'image' | 'description'>
  ) }
);


export const CreateMessagesDocument = gql`
    mutation CreateMessages($text: String!, $id: String!, $idUser: String!) {
  createMessage(text: $text, id: $id, idUser: $idUser) {
    content
  }
}
    `;
export type CreateMessagesMutationFn = Apollo.MutationFunction<CreateMessagesMutation, CreateMessagesMutationVariables>;

/**
 * __useCreateMessagesMutation__
 *
 * To run a mutation, you first call `useCreateMessagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessagesMutation, { data, loading, error }] = useCreateMessagesMutation({
 *   variables: {
 *      text: // value for 'text'
 *      id: // value for 'id'
 *      idUser: // value for 'idUser'
 *   },
 * });
 */
export function useCreateMessagesMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessagesMutation, CreateMessagesMutationVariables>) {
        return Apollo.useMutation<CreateMessagesMutation, CreateMessagesMutationVariables>(CreateMessagesDocument, baseOptions);
      }
export type CreateMessagesMutationHookResult = ReturnType<typeof useCreateMessagesMutation>;
export type CreateMessagesMutationResult = Apollo.MutationResult<CreateMessagesMutation>;
export type CreateMessagesMutationOptions = Apollo.BaseMutationOptions<CreateMessagesMutation, CreateMessagesMutationVariables>;
export const GetCategoryDocument = gql`
    query getCategory {
  getCategory {
    _id
    name
    icon
    idParent
  }
}
    `;

/**
 * __useGetCategoryQuery__
 *
 * To run a query within a React component, call `useGetCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoryQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
        return Apollo.useQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, baseOptions);
      }
export function useGetCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
          return Apollo.useLazyQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, baseOptions);
        }
export type GetCategoryQueryHookResult = ReturnType<typeof useGetCategoryQuery>;
export type GetCategoryLazyQueryHookResult = ReturnType<typeof useGetCategoryLazyQuery>;
export type GetCategoryQueryResult = Apollo.QueryResult<GetCategoryQuery, GetCategoryQueryVariables>;
export const GetProductsDocument = gql`
    query getProducts($pageSize: Int!, $pageNumber: Int!, $idCategory: String!) {
  getProducts(
    pageSize: $pageSize
    pageNumber: $pageNumber
    idCategory: $idCategory
  ) {
    _id
    content
    price
    address
    userId
    media {
      link
      type
    }
    categoryId
    trending
  }
}
    `;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      idCategory: // value for 'idCategory'
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, baseOptions);
      }
export function useGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, baseOptions);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<GetProductsQuery, GetProductsQueryVariables>;
export const GetProfileDocument = gql`
    query getProfile {
  getProfile {
    name
    image
    description
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, baseOptions);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, baseOptions);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;