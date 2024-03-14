// import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
// import { ReactNode } from 'react'

// export interface MenuPathProps {
//   name: string
//   type: 'item' | 'group'
//   path: string
//   children?: MenuPathProps[]
//   icon: ReactNode
// }
// const OEM_URL = `/accounting/saleOrder/oem`
// const B2B_URL = `/accounting/saleOrder/b2b`
// const B2C_URL = `/accounting/saleOrder/b2c`
// const MERCHANT_URL = `/accounting/saleOrder/merchant`
// const LIQUIDATION_URL = `/accounting/saleOrder/liquidation`
// export const MENU_URL = {
//   CUSTOMER: {
//     INVOICE: '/accounting/customer/customerInvoice',
//     REFUND: '/accounting/customer/customerRefund',
//     PAYMENT_TERM: '/accounting/customer/paymentTerm',
//     POLICY: '/accounting/customer/policy',
//     APPROVE_POLICY: '/accounting/customer/approve',
//   },
//   PROVIDER: {
//     INVOICE: '/accounting/provider/providerInvoice',
//     REFUND: '/accounting/provider/providerRefund',
//     PAYMENT_TERM: '/accounting/provider/paymentTerm',
//   },
//   BANK_ACCOUNT: {
//     INBOUND: '/accounting/bankAccount/inbound',
//     OUTBOUND: '/accounting/bankAccount/outbound',
//   },
//   CASH_ACCOUNT: {
//     INBOUND: '/accounting/cashAccount/inbound',
//     OUTBOUND: '/accounting/cashAccount/outbound',
//   },
//   ENTRY: {
//     ENTRY_INVOICE: '/accounting/entry/entryInvoice',
//     ENTRY_LIST: '/accounting/entry/entryList',
//   },
//   DEBT: {
//     PAYABLE: '/accounting/debt/payable',
//     RECEIVABLE: '/accounting/debt/receivable',
//     INVOICE: '/accounting/debt/invoice',
//   },
//   BALANCE: {
//     ACCOUNT_BALANCE: '/accounting/balance/accountBalance',
//     BANK_BALANCE: '/accounting/balance/bankBalance',
//     CUSTOMER: '/accounting/balance/customer',
//     PROVIDER: '/accounting/balance/provider',
//   },
//   OEM: {
//     SALE_ORDER: `${OEM_URL}/orderManagement`,
//     BACK_SALE_ORDER: `${OEM_URL}/backPurchaseOrderManagement`,
//     ORDER_EXCEED_DEBT: `${OEM_URL}/orderExceedDebt`,
//     TRACKING: `${OEM_URL}/trackingOrder`,
//   },
//   MERCHANT: {
//     SALE_ORDER: `${MERCHANT_URL}/orderManagement`,
//     BACK_SALE_ORDER: `${MERCHANT_URL}/backPurchaseOrderManagement`,
//     ORDER_EXCEED_DEBT: `${MERCHANT_URL}/orderExceedDebt`,
//     TRACKING: `${MERCHANT_URL}/trackingOrder`,
//   },
//   CLEARANCE: {
//     SALE_ORDER: `${LIQUIDATION_URL}/orderManagement`,
//     LIQUIDATION_ORDER: `${LIQUIDATION_URL}/liquidationOrder`,
//     ORDER_EXCEED_DEBT: `${LIQUIDATION_URL}/orderExceedDebt`,
//     BACK_SALE_ORDER: `#`,
//     BACK_SALE_ORDER_APPROVAL: '#',
//     PARTNER_TAG: '#',
//     CUSTOMER: '#',
//   },
//   B2C: {
//     SALE_ORDER: `${B2C_URL}/orderManagement`,
//     BACK_SALE_ORDER: `${B2C_URL}/backPurchaseOrderManagement`,
//     ORDER_EXCEED_DEBT: `${B2C_URL}/orderExceedDebt`,
//     TRACKING: `${B2C_URL}/trackingOrder`,
//   },
//   B2B: {
//     SALE_ORDER: `${B2B_URL}/orderManagement`,
//     BACK_SALE_ORDER: `${B2B_URL}/backPurchaseOrderManagement`,
//     ORDER_EXCEED_DEBT: `${B2B_URL}/orderExceedDebt`,
//     TRACKING: `${B2B_URL}/trackingOrder`,
//   },
//   CONFIG: {
//     ACCOUNT_CONFIG: '/accounting/config/accountConfig',
//     PRINT: '/accounting/config/print',
//     INVOICE: {
//       PAYMENT_TERM: '/accounting/config/invoice/paymentTerm',
//     },
//     ACCOUNTING: {
//       SYSTEM: '/accounting/config/account/accountSystemConfig',
//       ACCOUNT_JOURNAL: '/accounting/config/account/accountJournal',
//       TAX: '/accounting/config/account/tax',
//       ACCOUNT_TAG: '/accounting/config/account/accountTag',
//       ACCOUNT_TYPE: '/accounting/config/account/accountType',
//       LEDGER: '/accounting/config/ledger',
//     },
//     MANAGE: {
//       CASH_ROUNDING: '/accounting/config/manage/cashRounding',
//       FISCAL_YEAR: '/accounting/config/manage/fiscalYear',
//     },

//   },
// }

// export const listMenuRoutes: MenuPathProps[] = [
//   {
//     name: 'Kế toán bán hàng',
//     path: '/accounting/customer/',
//     type: 'group',
//     icon: <PeopleOutlineIcon />,
//     children: [
//       {
//         name: 'Hóa đơn',
//         path: MENU_URL.CUSTOMER.INVOICE,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       {
//         name: 'Hoàn tiền',
//         path: MENU_URL.CUSTOMER.REFUND,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       {
//         name: 'Điều khoản thanh toán',
//         path: MENU_URL.CUSTOMER.PAYMENT_TERM,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       {
//         name: 'Chính sách công nợ',
//         path: MENU_URL.CUSTOMER.POLICY,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       {
//         name: 'Phê duyệt chính sách',
//         path: MENU_URL.CUSTOMER.APPROVE_POLICY,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//     ],
//   },
//   {
//     name: 'Kế toán mua hàng',
//     path: 'accounting/provider',
//     type: 'group',
//     icon: <PeopleOutlineIcon />,
//     children: [
//       {
//         name: 'Hóa đơn',
//         path: MENU_URL.PROVIDER.INVOICE,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       {
//         name: 'Hoàn tiền',
//         path: MENU_URL.PROVIDER.REFUND,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       {
//         name: 'Điều khoản thanh toán',
//         path: MENU_URL.PROVIDER.PAYMENT_TERM,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//     ],
//   },
//   {
//     name: 'Kế toán ngân hàng',
//     path: '/accounting/bankAccount',
//     type: 'group',
//     icon: <PeopleOutlineIcon />,
//     children: [
//       {
//         name: 'Thu tiền',
//         path: MENU_URL.BANK_ACCOUNT.INBOUND,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       {
//         name: 'Chi tiền',
//         path: MENU_URL.BANK_ACCOUNT.OUTBOUND,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       // {
//       //   name: 'Báo cáo tiền gửi',
//       //   path: '/accounting/bankAccount/report',
//       //   type: 'group',
//       //   icon: <PeopleOutlineIcon />,
//       //   children: [
//       //     {
//       //       name: 'Sổ chi tiết tiền gửi',
//       //       path: '/accounting/bankAccount/report/x',
//       //       type: 'item',
//       //       icon: <PeopleOutlineIcon />,
//       //     },
//       //     {
//       //       name: 'Bảng kê số dư',
//       //       path: '/accounting/bankAccount/report/y',
//       //       type: 'item',
//       //       icon: <PeopleOutlineIcon />,
//       //     },
//       //     {
//       //       name: 'Sổ chi tiết tiền vay',
//       //       path: '/accounting/bankAccount/report/z',
//       //       type: 'item',
//       //       icon: <PeopleOutlineIcon />,
//       //     },
//       //     {
//       //       name: 'Bảng TH theo dõi tiền vay',
//       //       path: '/accounting/bankAccount/report/t',
//       //       type: 'item',
//       //       icon: <PeopleOutlineIcon />,
//       //     },
//       //   ],
//       // },
//     ],
//   },
//   {
//     name: 'Kế toán tiền mặt',
//     path: '/accounting/cashAccount',
//     type: 'group',
//     icon: <PeopleOutlineIcon />,
//     children: [
//       {
//         name: 'Thu tiền',
//         path: MENU_URL.CASH_ACCOUNT.INBOUND,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       {
//         name: 'Chi tiền',
//         path: MENU_URL.CASH_ACCOUNT.OUTBOUND,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       {
//         name: 'Báo cáo tiền mặt',
//         path: '/accounting/cashAccount/report',
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       {
//         name: 'Báo cáo dòng tiền',
//         path: '/accounting/cashAccount/xxx',
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//     ],
//   },

//   {
//     name: 'Bút toán',
//     path: '/accounting/entry',
//     type: 'group',
//     icon: <PeopleOutlineIcon />,
//     children: [
//       {
//         name: 'Bút toán phát sinh',
//         path: MENU_URL.ENTRY.ENTRY_INVOICE,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       {
//         name: 'Hạng mục bút toán',
//         path: MENU_URL.ENTRY.ENTRY_LIST,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//     ],
//   },
//   {
//     name: 'Công nợ',
//     path: '/accounting/debt',
//     type: 'group',
//     icon: <PeopleOutlineIcon />,
//     children: [
//       {
//         name: 'Công nợ phải thu',
//         path: MENU_URL.DEBT.RECEIVABLE,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       {
//         name: 'Công nợ phải trả',
//         path: MENU_URL.DEBT.PAYABLE,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       // {
//       //   name: 'CN phải thu theo mặt hàng',
//       //   path: MENU_URL.DEBT.INVOICE,
//       //   type: 'item',
//       //   icon: <PeopleOutlineIcon />,
//       // },
//     ],
//   },

//   {
//     name: 'Số dư ban đầu',
//     path: '/accounting/balance',
//     type: 'group',
//     icon: <PeopleOutlineIcon />,
//     children: [
//       {
//         name: 'Số dư tài khoản',
//         path: MENU_URL.BALANCE.ACCOUNT_BALANCE,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       {
//         name: 'Số dư TK ngân hàng',
//         path: MENU_URL.BALANCE.BANK_BALANCE,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       {
//         name: 'Số dư công nợ KH',
//         path: MENU_URL.BALANCE.CUSTOMER,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       {
//         name: 'Số dư công nợ NCC',
//         path: MENU_URL.BALANCE.PROVIDER,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//     ],
//   },
//   {
//     name: 'Đơn bán hàng Merchant',
//     path: `${MERCHANT_URL}`,
//     type: 'group',
//     icon: <PeopleOutlineIcon />,
//     children: [
//       {
//         name: 'Quản lý đơn bán',
//         path: MENU_URL.MERCHANT.SALE_ORDER,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       {
//         name: 'Năm tài chính',
//         path: MENU_URL.CONFIG.MANAGE.FISCAL_YEAR,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//     ],
//   },
//   {
//     name: 'Đơn bán hàng (B2B)',
//     path: `${B2B_URL}`,
//     type: 'group',
//     icon: <PeopleOutlineIcon />,
//     children: [
//       {
//         name: 'Quản lý đơn bán',
//         path: MENU_URL.B2B.SALE_ORDER,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       {
//         name: 'Đơn bán trả (chưa có)',
//         path: MENU_URL.CONFIG.MANAGE.FISCAL_YEAR,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//     ],
//   },
//   {
//     name: 'Đơn bán hàng (B2C)',
//     path: `${B2C_URL}`,
//     type: 'group',
//     icon: <PeopleOutlineIcon />,
//     children: [
//       {
//         name: 'Quản lý đơn bán',
//         path: MENU_URL.B2C.SALE_ORDER,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       {
//         name: 'Năm tài chính',
//         path: MENU_URL.CONFIG.MANAGE.FISCAL_YEAR,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//     ],
//   },

//   {
//     name: 'Đơn bán hàng đặt (OEM)',
//     path: `${OEM_URL}`,
//     type: 'group',
//     icon: <PeopleOutlineIcon />,
//     children: [
//       {
//         name: 'Quản lý đơn bán',
//         path: MENU_URL.OEM.SALE_ORDER,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       {
//         name: 'Năm tài chính',
//         path: MENU_URL.CONFIG.MANAGE.FISCAL_YEAR,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//     ],
//   },
//   {
//     name: 'Đơn thanh lý',
//     path: `${LIQUIDATION_URL}`,
//     type: 'group',
//     icon: <PeopleOutlineIcon />,
//     children: [
//       {
//         name: 'Quản lý đơn bán',
//         path: MENU_URL.CLEARANCE.SALE_ORDER,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       {
//         name: 'Năm tài chính',
//         path: MENU_URL.CONFIG.MANAGE.FISCAL_YEAR,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//     ],
//   },
//   {
//     name: 'Cấu hình',
//     path: '/accounting/config',
//     type: 'group',
//     icon: <PeopleOutlineIcon />,
//     children: [
//       {
//         name: 'Cài đặt chung',
//         path: MENU_URL.CONFIG.ACCOUNT_CONFIG,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       {
//         name: 'Cấu hình in',
//         path: MENU_URL.CONFIG.PRINT,
//         type: 'item',
//         icon: <PeopleOutlineIcon />,
//       },
//       {
//         name: 'Kế toán',
//         path: '/accounting/config/account',
//         type: 'group',
//         icon: <PeopleOutlineIcon />,
//         children: [
//           {
//             name: 'Sổ kế toán',
//             path: MENU_URL.CONFIG.ACCOUNTING.ACCOUNT_JOURNAL,
//             type: 'item',
//             icon: <PeopleOutlineIcon />,
//           },
//           {
//             name: 'Thuế',
//             path: MENU_URL.CONFIG.ACCOUNTING.TAX,
//             type: 'item',
//             icon: <PeopleOutlineIcon />,
//           },
//           {
//             name: 'Hệ thống tài khoản',
//             path: MENU_URL.CONFIG.ACCOUNTING.SYSTEM,
//             type: 'item',
//             icon: <PeopleOutlineIcon />,
//           },
//           {
//             name: 'Loại tài khoản',
//             path: MENU_URL.CONFIG.ACCOUNTING.ACCOUNT_TYPE,
//             type: 'item',
//             icon: <PeopleOutlineIcon />,
//           },
//           {
//             name: 'Thẻ tài khoản',
//             path: MENU_URL.CONFIG.ACCOUNTING.ACCOUNT_TAG,
//             type: 'item',
//             icon: <PeopleOutlineIcon />,
//           },
//           {
//             name: 'Sổ cái',
//             path: MENU_URL.CONFIG.ACCOUNTING.LEDGER,
//             type: 'item',
//             icon: <PeopleOutlineIcon />,
//           },
//         ],
//       },

//       {
//         name: 'Quản lý',
//         path: '/accounting/config/manage',
//         type: 'group',
//         icon: <PeopleOutlineIcon />,
//         children: [
//           {
//             name: 'Làm tròn tiền',
//             path: MENU_URL.CONFIG.MANAGE.CASH_ROUNDING,
//             type: 'item',
//             icon: <PeopleOutlineIcon />,
//           },
//           {
//             name: 'Năm tài chính',
//             path: MENU_URL.CONFIG.MANAGE.FISCAL_YEAR,
//             type: 'item',
//             icon: <PeopleOutlineIcon />,
//           },
//         ],
//       },
//     ],
//   },
// ]
export interface MenuProps {
  isAdmin?: boolean
  nameMenu?: string
  listItem?: any[]
}
const iconDemo='https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp'
export const listMenuRoutes: MenuProps[] = [
  {
    nameMenu: 'Danh mục',
    listItem: [
      { name: 'Nhà sách tiki', icon: iconDemo, path: '#' },
      { name: 'Nhà sách tiki', icon: iconDemo, path: '#' },
      { name: 'Nhà sách tiki', icon: iconDemo, path: '#' },
      { name: 'Nhà sách tiki', icon: iconDemo, path: '#' },
      { name: 'Nhà sách tiki', icon: iconDemo, path: '#' },
      { name: 'Nhà sách tiki', icon: iconDemo, path: '#' },
    ],
  },
  {
    nameMenu: 'Sản phẩm nổi bật',
    listItem: [
      { name: 'Nhà sách tiki', icon: iconDemo, path: '#' },
      { name: 'Nhà sách tiki', icon: iconDemo, path: '#' },
      { name: 'Nhà sách tiki', icon: iconDemo, path: '#' },
      { name: 'Nhà sách tiki', icon: iconDemo, path: '#' },
      { name: 'Nhà sách tiki', icon: iconDemo, path: '#' },
      { name: 'Nhà sách tiki', icon: iconDemo, path: '#' },
    ],
  },
  {
    nameMenu: "Bán hàng cùng Tiki",
    listItem: []
  }
]
