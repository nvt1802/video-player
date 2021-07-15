import { takeLatest, call, put } from "redux-saga/effects"
import { ProvinceActions } from "../actions"
import Services from "../../services"

export function* watcherProvinceSaga() {
  yield takeLatest("PROVINCE_REQUEST", workerSaga)
}

function fetchProvinceData() {
  return Services.province.findAll()
}

function* workerSaga() {
  try {
    const response = yield call(fetchProvinceData)
    const data = response?.data?.results
    yield put({ type: "PROVINCE_SUCCESS", payload: data })
  } catch (error) {
    yield put({ type: "PROVINCE_FAILURE", error })
  }
}
