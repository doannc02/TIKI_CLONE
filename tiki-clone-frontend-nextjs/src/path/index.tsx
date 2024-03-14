import { useRouter } from 'next/router'

export type TypePath = 'RETAIL' | 'WHOLESALE' | 'CLEARANCE' | 'OEM' | 'MERCHANT'

export type TypePathSale = 'B2C' | 'B2B' | 'CLEARANCE' | 'OEM' | 'MERCHANT'

export const useCheckPath = () => {
  const router = useRouter()
  let typeSaleRequest: TypePath = router.asPath.startsWith('/accounting/salesOrder/b2c')
  ? 'RETAIL'
  : router.asPath.startsWith('/accounting/saleOrder/b2b')
  ? 'WHOLESALE'
  : router.asPath.startsWith('/accounting/saleOrder/merchant')
  ? 'MERCHANT'
  : router.asPath.startsWith('/accounting/saleOrder/oem/')
  ? 'OEM'
  : 'CLEARANCE'
  let typePathSale: TypePathSale = router.asPath.startsWith('/accounting/saleOrder/b2c')
    ? 'B2C'
    : router.asPath.startsWith('/accounting/accounting/saleOrder/b2b')
    ? 'B2B'
    : router.asPath.startsWith('/accounting/saleOrder/merchant')
    ? 'MERCHANT'
    : router.asPath.startsWith('/accounting/saleOrder/oem')
    ? 'OEM'
    : 'CLEARANCE'
  const typePath: 'CUSTOMER' | 'PROVIDER' = router.pathname.startsWith(
    '/accounting/customer'
  )
    ? 'CUSTOMER'
    : 'PROVIDER'

  const balanceTypePath: 'CUSTOMER' | 'PROVIDER' = router.pathname.includes(
    'balance/customer'
  )
    ? 'CUSTOMER'
    : 'PROVIDER'

  const paymentMethod: 'BANK' | 'CASH' = router.pathname.startsWith(
    '/accounting/bankAccount'
  )
    ? 'BANK'
    : 'CASH'

  const paymentType: 'INBOUND' | 'OUTBOUND' = router.pathname.includes(
    'inbound'
  )
    ? 'INBOUND'
    : 'OUTBOUND'

  return {typePathSale,typeSaleRequest, typePath, paymentMethod, paymentType, balanceTypePath }
}
