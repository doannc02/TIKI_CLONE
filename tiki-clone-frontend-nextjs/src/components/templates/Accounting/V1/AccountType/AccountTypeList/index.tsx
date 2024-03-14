import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { CustomTable } from '@/components/organism/TableCustom'
import { MENU_URL } from '@/routes'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import useAccountTag from './useAccountType'
import { Action } from '@/components/molecules/Action'
import { GREEN, ORANGE } from '@/components/layouts/WrapLayout/ModeTheme/colors'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogImportFile } from '../../../Dialog/DialogImportFile'
import { exportAccountTypeFile } from '@/service/accounting/accountType/importFile/exportAccountTypeTemplateFile'
import { importAccountTypeFile } from '@/service/accounting/accountType/importFile/importAccountTypeFile'
import Image from 'next/image'
import { DialogImportHistoryType } from '../../../Dialog/DialogImportHistoryType'

const AccountTypeList = () => {
  const { t } = useTranslation('accounting/account-type')

  const [values, handles] = useAccountTag()

  const {
    methodForm,
    columns,
    tableData,
    totalPages,
    size,
    page,
    isLoadingTable,
  } = values
  const { control } = methodForm

  const { onSubmit, onChangePageSize, onReset, refetch } = handles
  const router = useRouter()
  const { showDialog } = useDialog()

  return (
    <PageContainer
      title={
        <div className='flex justify-between w-full'>
          <div className='flex flex-col justify-center'>
            <Typography variant='subtitle1'>{t('title')}</Typography>
          </div>
          <ButtonCustom
            theme='submit'
            variant='contained'
            textTransform='none'
            height={38}
            onClick={() =>
              router.push(`${MENU_URL.CONFIG.ACCOUNTING.ACCOUNT_TYPE}/addNew`)
            }
          >
            {t('common:btn.add')}
          </ButtonCustom>
        </div>
      }
    >
      <div className='flex flex-col'>
        <form onSubmit={onSubmit} className='flex flex-col'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <CoreInput
                control={control}
                name='search'
                label={t('common:form.search.label')}
                placeholder={t('common:form.search.placeholder')}
                genus='small'
                inputProps={{
                  maxLength: 50,
                }}
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

        <div className='flex w-full flex-row-reverse mt-10'>
          <div
            className='flex items-center cursor-pointer'
            onClick={() =>
              showDialog(
                <DialogImportFile
                  fetchDataExport={exportAccountTypeFile}
                  fetchDataImport={importAccountTypeFile}
                  refetch={refetch}
                  label='Update loại tài khoản'
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
          <div
            className='flex items-center cursor-pointer mx-5'
            onClick={() => showDialog(<DialogImportHistoryType />)}
          >
            <Image
              src={require('@/assets/svg/clockWiseIcon.svg')}
              alt='import'
              width={16}
              height={16}
            />
            <Typography style={{ color: ORANGE, marginLeft: '2px' }}>
              Lịch sử Import
            </Typography>
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
              pathname: `${MENU_URL.CONFIG.ACCOUNTING.ACCOUNT_TYPE}/[id]`,
              query: {
                id,
                actionType: 'VIEW',
              },
            })
          }}
        />
      </div>
    </PageContainer>
  )
}

export default AccountTypeList
