import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { GREEN, ORANGE } from '@/components/layouts/WrapLayout/ModeTheme/colors'
import { Action } from '@/components/molecules/Action'
import PageContainer from '@/components/organism/PageContainer'
import { CustomTable } from '@/components/organism/TableCustom'
import { useCheckPath } from '@/path'
import { MENU_URL } from '@/routes'
import { getCurrencyOfCompany } from '@/service/common/company/getListCurrency'
import { getPartnerList } from '@/service/common/partner/getListTiny'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { BalanceTotal } from './BalanceTotal'
import useCustomerDebtBalanceList from './useCOPBalanceList'
import { DialogImportFile } from '../../../Dialog/DialogImportFile'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { importDeclareBalanceApi } from '@/service/accounting/accountMoveLineCusImport/saveImpDeclareBalance'
import { getExCusDeclareBalanceDetail } from '@/service/accounting/accountMoveLineCusImport/getExCusDeclareBalDetail'
import DialogViewHisImport from '../../../Dialog/DialogViewHistoryImport'
import { getExVenDeclareBalanceDetail } from '@/service/accounting/accountMoveLineVenderImport/getVendorBalanceExport'
import { importVendorDeclareBalanceApi } from '@/service/accounting/accountMoveLineVenderImport/saveVendorBalanceImport'

const COPBalanceList = () => {
  const { t } = useTranslation('accounting/cop-balance')

  const { showDialog } = useDialog()

  const [values, handles] = useCustomerDebtBalanceList()

  const {
    queryPage,
    methodForm,
    columns,
    tableData,
    totalPages,
    size,
    page,
    isLoadingTable,
    totalData,
  } = values
  const { control } = methodForm

  const router = useRouter()

  const { balanceTypePath } = useCheckPath()

  const { onSubmit, onChangePageSize, onReset, refetch } = handles
  return (
    <PageContainer
      title={
        <div className='flex justify-between w-full'>
          <div className='flex flex-col justify-center'>
            <Typography variant='subtitle1'>
              {balanceTypePath === 'CUSTOMER'
                ? t('title_customer')
                : t('title_provider')}
            </Typography>
          </div>
          <ButtonCustom
            onClick={() => {
              router.push(`${MENU_URL.BALANCE[balanceTypePath]}/addNew`)
            }}
            theme='submit'
            textTransform='none'
            height={36}
          >
            {t('common:btn.add')}
          </ButtonCustom>
        </div>
      }
    >
      <div className='flex flex-col'>
        <form onSubmit={onSubmit} className='flex flex-col'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreAutoCompleteAPI
                control={control}
                name='partner'
                label={
                  balanceTypePath === 'CUSTOMER' ? 'Khách hàng' : 'Nhà cung cấp'
                }
                placeholder={
                  balanceTypePath === 'CUSTOMER'
                    ? 'Chọn khách hang'
                    : 'Chọn nhà cung cấp'
                }
                fetchDataFn={getPartnerList}
                params={
                  balanceTypePath === 'CUSTOMER'
                    ? { isCustomer: true }
                    : {
                        isVendor: true,
                      }
                }
                genus='small'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreAutoCompleteAPI
                control={control}
                name='currency'
                label='Tiền tệ'
                placeholder='Chọn tiền tệ'
                fetchDataFn={getCurrencyOfCompany}
                genus='small'
              />
            </Grid>
          </Grid>

          <div className='flex justify-center mt-15'>
            <div className='m-5'>
              <ButtonCustom
                onClick={onReset}
                theme='reset'
                textTransform='none'
                height={36}
              >
                Reset
              </ButtonCustom>
            </div>
            <div className='m-5'>
              <ButtonCustom
                theme='submit'
                type='submit'
                textTransform='none'
                height={36}
              >
                {t('common:Search')}
              </ButtonCustom>
            </div>
          </div>
        </form>

        <div className='flex justify-between items-center my-5'>
          <div></div>
          <div className='flex  mt-10 gap-8'>
            <div
              className='flex items-center cursor-pointer'
              onClick={() => {
                showDialog(
                  <DialogViewHisImport
                    isCustomer={balanceTypePath === 'CUSTOMER' ? true : false}
                  />
                )
              }}
            >
              <Action actionList={['history']} />
              <Typography
                variant='body1'
                style={{
                  color: ORANGE,
                }}
              >
                Lịch sử import
              </Typography>
            </div>
            {/* <div
              className='flex items-center cursor-pointer'
              onClick={() => {}}
            >
              <Action actionList={['export']} />
              <Typography
                variant='body1'
                style={{
                  color: GREEN,
                }}
              >
                Xuất file excel
              </Typography>
            </div> */}
            <div
              className='flex items-center cursor-pointer'
              onClick={() => {
                balanceTypePath === 'CUSTOMER'
                  ? showDialog(
                      <DialogImportFile
                        fetchDataExport={getExCusDeclareBalanceDetail}
                        fetchDataImport={importDeclareBalanceApi}
                        refetch={refetch}
                        label='Update danh sách số công nợ khách hàng'
                      />
                    )
                  : showDialog(
                      <DialogImportFile
                        fetchDataExport={getExVenDeclareBalanceDetail}
                        fetchDataImport={importVendorDeclareBalanceApi}
                        refetch={refetch}
                        label='Update danh sách số công nợ nhà cung cấp'
                      />
                    )
              }}
            >
              <Action actionList={['import']} />
              <Typography
                variant='body1'
                style={{
                  color: GREEN,
                }}
              >
                Nhập file excel
              </Typography>
            </div>
          </div>
        </div>

        <CustomTable
          className='mt-5'
          columns={columns}
          data={tableData}
          onChangePageSize={onChangePageSize}
          paginationHidden={tableData.length < 1}
          totalPages={totalPages}
          page={page}
          size={size}
          isLoading={isLoadingTable}
          isShowColumnStt
          onRowClick={(id: number) => {
            router.push({
              pathname: `${MENU_URL.BALANCE[balanceTypePath]}/[id]`,
              query: {
                id,
                actionType: 'VIEW',
              },
            })
          }}
          actionTable={
            totalData ? (
              <BalanceTotal
                isFlag={!!queryPage?.currency}
                creditTotal={totalData.totalCredit}
                debitTotal={totalData.totalDebit}
                totalSourceDebit={totalData.totalSourceDebit}
                totalSourceCredit={totalData.totalSourceCredit}
              />
            ) : null
          }
        />
      </div>
    </PageContainer>
  )
}

export default COPBalanceList
