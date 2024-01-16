import { setSession } from "src/app/auth/store/auth.slice"
import repository from "src/repository"

export const signout = async (dispatch: any) => {
  const device_id = localStorage.getItem('device_id')
  const body = { device_id }
  const response = await repository.post('/auth/signout', body)

  if (response.data) {
    dispatch(setSession(null))
    localStorage.removeItem('refresh-token')
    sessionStorage.removeItem('access-token')
  }
}