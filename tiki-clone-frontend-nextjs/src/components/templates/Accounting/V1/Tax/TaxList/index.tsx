import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { CustomTable } from '@/components/organism/TableCustom'
import { scopeTypeWithAllSelect, taxTypeList } from '@/enum'
import { MENU_URL } from '@/routes'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import useTaxList from './useTaxList'

const TaxList = () => {
  const { t } = useTranslation('accounting/tax')

  const [values, handles] = useTaxList()

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

  const { onSubmit, onChangePageSize, onReset } = handles
  const router = useRouter()
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
              router.push(`${MENU_URL.CONFIG.ACCOUNTING.TAX}/addNew`)
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
            <Grid item xs={12} sm={12} md={4} lg={4}>
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

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='scopeTypePaging'
                label='Phạm vi sử dụng thuế'
                placeholder='Chọn phạm vi sử dụng thuế'
                options={scopeTypeWithAllSelect}
                genus='small'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='type'
                label='Kiểu thuế'
                placeholder='Chọn kiểu thuế'
                options={taxTypeList}
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

        <CustomTable
          className='mt-15'
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
              pathname: `${MENU_URL.CONFIG.ACCOUNTING.TAX}/[id]`,
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

export default TaxList
