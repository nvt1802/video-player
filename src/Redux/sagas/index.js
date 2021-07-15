import { fork } from "redux-saga/effects"
import { watcherProvinceSaga } from './provinceSagas'

export function* rootSaga() {
    yield fork(watcherProvinceSaga)
}