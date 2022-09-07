import React, { FC } from 'react'
import {
  cacheExchange,
  createClient,
  errorExchange,
  fetchExchange,
  Provider,
  ssrExchange
} from 'urql'
import { isAuthError } from './shared'
const isClient = typeof window !== 'undefined'

export const ssrCache = ssrExchange({
  isClient,
  initialState: isClient ? window['__URQL_DATA__'] : undefined
})

export const clientApi = createClient({
  url: `http://${process.env.API_HOST}:3333/graphql`,
  //NOTE: returning the auth cookies in the request for client side storage
  fetchOptions: { credentials: 'include' },
  exchanges: [
    cacheExchange,
    //NOTE: ssr cache for later use
    ssrCache,
    errorExchange({
      onError: (error) => {

        //NOTE: Our shared auth error fn for use with login/signup etc
        if (isAuthError(error)) {
          console.log('//TODO: log off')
        }
      }
    }),
    fetchExchange
  ]
})

export const withApi = (Component: FC) => {
  return function ApiWrappedComponent({ ...properties }) {
    //NOTE: adding urql state for use with ssr cache
    if (properties.urqlState) {
      ssrCache.restoreData(properties.urqlState)
    }

    return (
      <Provider value={clientApi}>
        <Component {...properties} />
      </Provider>
    )
  }
}
