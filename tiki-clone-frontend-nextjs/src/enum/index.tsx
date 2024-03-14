export const accountJournalType = [
  {
    label: 'Bán hàng',
    value: 'SALE',
  },
  {
    label: 'Mua hàng',
    value: 'PURCHASE',
  },
  {
    label: 'Tiền mặt',
    value: 'CASH',
  },
  {
    label: 'Ngân hàng',
    value: 'BANK',
  },
  {
    label: 'Thông tin khác',
    value: 'GENERAL',
  },
]

export const paymentStatusEnum = [
  {
    label: 'Chưa thanh toán',
    value: 'NOT_PAYMENT',
  },
  {
    label: 'Đảo ngược',
    value: 'REVERSE',
  },
  {
    label: 'Thanh toán 1 phần',
    value: 'PARTIAL_PAYMENT',
  },
  {
    label: 'Đã thanh toán',
    value: 'PAID',
  },
]

export const paymentMethodSelect = [
  { label: 'Ngân hàng', value: 'BANK' },
  {
    label: 'Tiền mặt',
    value: 'CASH',
  },
]

export const partnerType = [
  { label: 'Khách hàng', value: 'CUSTOMER' },
  {
    label: 'Nhà cung cấp',
    value: 'VENDOR',
  },
]

export const scopeCustomerTypeSelect = [
  {
    label: 'Hóa đơn bán hàng trong nước',
    value: 'DOMESTICALLY',
  },
  {
    label: 'Hóa đơn bán hàng xuất khẩu',
    value: 'EXPORTED',
  },
]

export const scopeProviderTypeSelect = [
  {
    label: 'Hóa đơn mua hàng trong nước',
    value: 'DOMESTICALLY',
  },
  {
    label: 'Hóa đơn mua hàng quốc tế',
    value: 'EXPORTED',
  },
]

export const scopeTypeWithAllSelect = [
  {
    label: 'Hóa đơn bán hàng trong nước',
    value: 'DOMESTICALLY',
  },
  {
    label: 'Hóa đơn bán hàng xuất khẩu',
    value: 'EXPORTED',
  },
  {
    label: 'Cả 2',
    value: 'ALL',
  },
]

export const invoicePrintTypeConfig = [
  {
    label: 'Hóa đơn thanh toán',
    value: 'A_INVOICE_PAYMENT',
  },
  {
    label: 'Hóa đơn hoàn tiền khách hàng',
    value: 'A_INVOICE_REFUND_CUSTOMER',
  },
  {
    label: 'Phiếu thu',
    value: 'A_RECEIPT',
  },
  {
    label: 'Phiếu chi',
    value: 'A_EXPENSE',
  },
  {
    label: 'Hóa đơn mua hàng',
    value: 'A_PURCHASE_INVOICE',
  },
  {
    label: 'Hóa đơn hoàn tiền nhà cung cấp',
    value: 'A_PROVIDER_REFUND_INVOICE',
  },
  {
    label: 'Dự trù vật tư',
    value: 'P_PROCUREMENT_OF_MATERIALS',
  },
  {
    label: 'Báo giá đơn mua',
    value: 'P_REQUEST_FOR_QUOTATION',
  },
  {
    label: 'Tổng hợp báo giá đơn mua',
    value: 'P_SUMMARY_OF_QUOTATION',
  },
  {
    label: 'Lệnh xuất hàng đơn bán',
    value: 'S_ORDERS',
  },
  {
    label: 'Báo giá đơn bán',
    value: 'S_QUOTATIONS',
  },
  {
    label: 'Đơn đặt hàng đơn bán',
    value: 'S_ORDER',
  },
  {
    label: 'Hàng hóa bị trả lại',
    value: 'S_RETURNED_GOODS_ORDER',
  },
  {
    label: 'Phiếu nhập kho cho nhân viên kho',
    value: 'W_EMPLOYEE_IMPORT_WAREHOUSE',
  },
  {
    label: 'Phiếu nhập kho cho nhân viên bán hàng',
    value: 'W_SALE_EMPLOYEE_IMPORT_WAREHOUSE',
  },
  {
    label: 'Phiếu xuất kho cho nhân viên kho',
    value: 'W_EMPLOYEE_EXPORT_WAREHOUSE',
  },
  {
    label: 'Phiếu xuất kho cho nhân viên bán hàng',
    value: 'W_SALE_EXPORT_IMPORT_WAREHOUSE',
  },
]

export const taxTypeList = [
  {
    label: 'Mua hàng',
    value: 'PURCHASE',
  },
  {
    label: 'Bán hàng',
    value: 'SALE',
  },
  {
    label: 'Khác',
    value: 'NONE',
  },
]

export const taxComputeTypeSelect = [
  {
    label: 'Giá cố định',
    value: 'FIXED',
  },
  {
    label: 'Phần trăm',
    value: 'PERCENT',
  },
  {
    label: 'Nhóm thuế',
    value: 'GROUP_OF_TAXES',
  },
]

export const statusPolicyType = [
  {
    label: 'Nháp',
    value: 'DRAFT',
  },
  {
    label: 'Chờ phê duyệt',
    value: 'AWAITING',
  },
  {
    label: 'Đã duyệt',
    value: 'APPROVE',
  },
  {
    label: 'Từ chối',
    value: 'REJECT',
  },
]

export const timeType = [
  {
    label: 'Ngày',
    value: 'DAYS',
  },
  {
    label: 'Tháng',
    value: 'MONTH',
  },
  {
    label: 'Năm',
    value: 'YEAR',
  },
]

export const statusType = [
  { label: 'Nháp', value: 'DRAFT' },
  { label: 'Chờ phê duyệt', value: 'PENDING_APPROVAL' },
  { label: 'Sắp diễn ra', value: 'UPCOMING' },
  { label: 'Đang diễn ra', value: 'EFFECTIVE' },
  { label: 'Lưu trữ', value: 'ARCHIVED' },
]
