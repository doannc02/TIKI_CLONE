import { AccountMoveDetail } from '../getDetail/type'

export type RequestBody = {
  SAVE: AccountMoveDetail
  LOCK: {
    id: number
  }
}
