import "../styles/globals.css"
import "../src/components/videoPlayer/styles.css"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import rootReducers from "../src/Redux/reducers"
import { rootSaga } from "../src/Redux/sagas"
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducers,
  compose(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(rootSaga)

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
