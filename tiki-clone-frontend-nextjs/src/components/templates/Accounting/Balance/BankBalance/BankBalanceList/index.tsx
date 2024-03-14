import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { GREEN, ORANGE } from '@/components/layouts/WrapLayout/ModeTheme/colors'
import { Action } from '@/components/molecules/Action'
import PageContainer from '@/components/organism/PageContainer'
import { CustomTable } from '@/components/organism/TableCustom'
import { MENU_URL } from '@/routes'
import { getAccountList } from '@/service/accounting/account/getList'
import { getCurrencyOfCompany } from '@/service/common/company/getListCurrency'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { BalanceTotal } from './BalanceTotal'
import useBankBalanceList from './useBankBalanceList'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogImportFile } from '../../../Dialog/DialogImportFile'
import { exportAccountTypeFile } from '@/service/accounting/accountType/importFile/exportAccountTypeTemplateFile'
import { importAccountTypeFile } from '@/service/accounting/accountType/importFile/importAccountTypeFile'
import { importBankBalanceFile } from '@/service/accounting/accountMoveLine/importFile/importBankBalanceFile'
import { exportBankBalanceFile } from '@/service/accounting/accountMoveLine/importFile/exportBankBalanceFile'
import { DialogImportHistoryBankBalance } from '../../DialogImportHistoryBankBalace'

const BankBalanceList = () => {
  const { t } = useTranslation('accounting/bank-balance')

  const [values, handles] = useBankBalanceList()

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
  const { showDialog } = useDialog()

  const { onSubmit, onChangePageSize, onReset, refetch } = handles
  return (
    <PageContainer
      title={
        <div className='flex justify-between w-full'>
          <div className='flex flex-col justify-center'>
            <Typography variant='subtitle1'>{t('title')}</Typography>
          </div>
          <ButtonCustom
            onClick={() => {
              router.push(`${MENU_URL.BALANCE.BANK_BALANCE}/addNew`)
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
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name='searchBankAccount'
                label='Tìm kiếm theo STK'
                placeholder={t('common:form.search.placeholder')}
                genus='small'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name='account'
                label='Số tài khoản'
                placeholder='Chọn số tài khoản'
                params={{
                  code: 'BANK',
                }}
                labelPath2='code'
                fetchDataFn={getAccountList}
                genus='small'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
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
              onClick={() => showDialog(<DialogImportHistoryBankBalance />)}
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
              onClick={() =>
                showDialog(
                  <DialogImportFile
                    fetchDataExport={exportBankBalanceFile}
                    fetchDataImport={importBankBalanceFile}
                    refetch={refetch}
                    label='Update danh sách số dư tài khoản ngân hàng'
                  />
                )
              }
            >
              <Action actionList={['export']} />
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
              pathname: `${MENU_URL.BALANCE.BANK_BALANCE}/[id]`,
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

export default BankBalanceList
