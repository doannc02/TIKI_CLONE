import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { GREEN } from '@/components/layouts/WrapLayout/ModeTheme/colors'
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
import useAccountBalance from './useAccountBalance'

const AccountBalance = () => {
  const { t } = useTranslation('accounting/account-balance')

  const [values, handles] = useAccountBalance()

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

  const { onSubmit, onChangePageSize, onReset } = handles
  return (
    <PageContainer
      title={
        <div className='flex justify-between w-full'>
          <div className='flex flex-col justify-center'>
            <Typography variant='subtitle1'>{t('title')}</Typography>
          </div>
          <ButtonCustom
            onClick={() => {
              router.push(`${MENU_URL.BALANCE.ACCOUNT_BALANCE}/addNew`)
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
                name='account'
                label='Số tài khoản'
                labelPath2='code'
                placeholder='Chọn số tài khoản'
                fetchDataFn={getAccountList}
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

        {/* <div className='flex w-full flex-row-reverse  mt-10'>
          <div className='flex items-center cursor-pointer' onClick={() => {}}>
            <Action actionList={['export']} />
            <Typography
              variant='body1'
              style={{
                color: GREEN,
              }}
            >
              Xuất file excel
            </Typography>
          </div>
        </div> */}

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

export default AccountBalance
