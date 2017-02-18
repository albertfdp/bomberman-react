import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'
import DevTools from 'components/DevTools'

const enhancer = __PRODUCTION__
  ? compose(applyMiddleware(thunk))
  : compose(applyMiddleware(thunk), DevTools.instrument())

const configureStore = (initialState) => {
  const store = createStore(
    reducers,
    initialState,
    enhancer
  )

  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default)
    })
  }

  return store
}

const store = configureStore()

export default store
