import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const isOpenLeftMenu = atom({
  key: 'layout1/isOpenLeftMenu',
  default: true,
  effects_UNSTABLE: [persistAtom],
})
