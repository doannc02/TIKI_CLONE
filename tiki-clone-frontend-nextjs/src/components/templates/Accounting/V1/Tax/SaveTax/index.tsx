import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import CoreInput from '@/components/atoms/CoreInput'
import CoreSwitch from '@/components/atoms/CoreSwitch'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { PRIMARY } from '@/components/layouts/WrapLayout/ModeTheme/colors'
import { TopAction } from '@/components/molecules/TopAction'
import PageContainer from '@/components/organism/PageContainer'
import { CustomTable } from '@/components/organism/TableCustom'
import {
  scopeTypeWithAllSelect,
  taxComputeTypeSelect,
  taxTypeList,
} from '@/enum'
import { MENU_URL } from '@/routes'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import DialogDeleteTax from '../DialogDeleteTax'
import useSaveTag from './useSaveTag'

const SaveTax = () => {
  const { t } = useTranslation('accounting/tax')
  const [values, handles] = useSaveTag()
  const {
    id,
    control,
    isUpdate,
    isLoadingSubmit,
    methodForm,
    columns1,
    tableData1,
    columns2,
    tableData2,
    countryList,
    isLoadingCountrySelect,
    isView,
  } = values

  const router = useRouter()
  const { actionType } = router.query
  const { showDialog } = useDialog()
  const { watch } = methodForm
  const { onSubmit, onCancel, append1, append2 } = handles

  return (
    <PageContainer
      title={
        <div className='flex justify-between w-full'>
          <CoreBreadcrumbs
            textCurrent={
              isUpdate
                ? actionType === 'VIEW'
                  ? t('common:detail')
                  : t('common:btn.edit')
                : t('common:btn.add')
            }
            textPrev={t('title')}
          />

          {!router.asPath.includes('/addNew') && (
            <TopAction
              actionList={isView ? ['edit', 'delete'] : ['delete']}
              onEditAction={() => {
                router.replace({
                  pathname: `${MENU_URL.CONFIG.ACCOUNTING.TAX}/[id]`,
                  query: {
                    id,
                  },
                })
              }}
              onDeleteAction={() =>
                showDialog(
                  <DialogDeleteTax
                    id={Number(id)}
                    refetch={() => {
                      router.push({
                        pathname: MENU_URL.CONFIG.ACCOUNTING.TAX,
                      })
                    }}
                  />
                )
              }
            />
          )}
        </div>
      }
    >
      <form onSubmit={onSubmit}>
        <div className='block bg-[#ffffff] mt-17 rounded-xl max-w-[900px] mx-auto'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreInput
                control={control}
                name='name'
                label='Tên loại thuế'
                placeholder='Nhập tên loại thuế'
                inputProps={{
                  maxLength: 250,
                }}
                required
                rules={{ required: t('common:validation.required') }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreAutocomplete
                control={control}
                name='scopeType'
                label='Phạm vi sử dụng thuế'
                placeholder='Chọn phạm vi sử dụng thuế'
                required
                options={scopeTypeWithAllSelect}
                rules={{ required: t('common:validation.required') }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreAutocomplete
                control={control}
                name='type'
                label='Kiểu thuế'
                placeholder='Chọn kiểu thuế'
                required
                options={taxTypeList}
                rules={{ required: t('common:validation.required') }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreAutocomplete
                control={control}
                name='taxComputeType'
                label='Cách tính thuế theo'
                placeholder='Chọn cách tính thuế theo'
                required
                options={taxComputeTypeSelect}
                rules={{ required: t('common:validation.required') }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreInput
                control={control}
                name='sequence'
                type='number'
                label='Độ ưu tiên'
                placeholder='Nhập độ ưu tiên'
                required
                rules={{ required: t('common:validation.required') }}
              />
            </Grid>

            {['FIXED', 'PERCENT'].includes(watch('taxComputeType')) && (
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <CoreInput
                  control={control}
                  name='amount'
                  label='Số tiền'
                  type='number'
                  placeholder='Nhập số tiền'
                  InputProps={{
                    endAdornment: (
                      <Typography variant='body2'>
                        {watch('taxComputeType') === 'PERCENT' ? '%' : ''}
                      </Typography>
                    ),
                  }}
                  rules={{
                    validate: {
                      isCheck: () =>
                        (['FIXED', 'PERCENT'].includes(
                          watch('taxComputeType')
                        ) &&
                          watch('amount')) ||
                        t('common:validation.required'),
                    },
                  }}
                />
              </Grid>
            )}

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <CoreInput
                multiline
                control={control}
                name='description'
                label='Mô tả'
                placeholder='Mô tả'
                inputProps={{
                  maxLength: 1000,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <CoreSwitch control={control} name='isActive' />
            </Grid>
          </Grid>
        </div>

        {watch('taxComputeType') === 'GROUP_OF_TAXES' && (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ marginTop: '20px' }}
          >
            <Typography variant='h6'>Phân phối</Typography>
            <CustomTable
              className='mt-10'
              columns={actionType === 'VIEW' ? columns1.slice(0, -1) : columns1}
              data={tableData1}
              paginationHidden={true}
              showInfoText={false}
            />

            {actionType !== 'VIEW' && (
              <div
                className='flex items-center text-[#213660] px-10 py-8'
                style={{
                  borderBottom: '1px solid #DFE0EB',
                  borderLeft: '1px solid #DFE0EB',
                  borderRight: '1px solid #DFE0EB',
                }}
              >
                <div
                  className='cursor-pointer'
                  onClick={() => {
                    append1({
                      taxId: null,
                      taxComputeType: null,
                      sequence: null,
                    })
                  }}
                >
                  <Typography
                    variant='body1'
                    style={{
                      fontWeight: 500,
                      color: PRIMARY,
                    }}
                  >
                    Thêm
                  </Typography>
                </div>
              </div>
            )}
          </Grid>
        )}

        {['FIXED', 'PERCENT'].includes(watch('taxComputeType')) && (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ marginTop: '20px' }}
          >
            <Typography variant='h5'>
              Phân phối thuế vào tài khoản kế toán
            </Typography>
            <CustomTable
              className='mt-10'
              columns={actionType === 'VIEW' ? columns2.slice(0, -1) : columns2}
              data={tableData2}
              paginationHidden={true}
              showInfoText={false}
            />
            {actionType !== 'VIEW' && (
              <div
                className='flex items-center text-[#213660] px-10 py-8'
                style={{
                  borderBottom: '1px solid #DFE0EB',
                  borderLeft: '1px solid #DFE0EB',
                  borderRight: '1px solid #DFE0EB',
                }}
              >
                <div
                  className='cursor-pointer'
                  onClick={() => {
                    append2({
                      sequence: null,
                      percent: null,
                      accountId: null,
                      accountTagId: null,
                    })
                  }}
                >
                  <Typography
                    variant='body1'
                    style={{
                      fontWeight: 500,
                      color: PRIMARY,
                    }}
                  >
                    Thêm
                  </Typography>
                </div>
              </div>
            )}
          </Grid>
        )}

        {watch('taxComputeType') === 'GROUP_OF_TAXES' ? null : (
          <>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ marginTop: '30px' }}
            >
              <Typography variant='h5'>Thiết lập nâng cao</Typography>
            </Grid>

            <div className='block bg-[#ffffff] mt-17 mx-10 rounded-xl'>
              <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={10} md={5} lg={3.5}>
                  <CoreAutocomplete
                    control={control}
                    name='countryId'
                    label='Quốc gia'
                    placeholder='Chọn quốc gia'
                    labelPath='name'
                    valuePath='id'
                    loading={isLoadingCountrySelect}
                    options={countryList ? countryList.data.content : []}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  style={{ paddingTop: '10px' }}
                >
                  <CoreCheckbox
                    name='isIncludedPrice'
                    control={control}
                    label={'Giá bao gồm thuế'}
                    onChangeValue={(checked: boolean) => {
                      if (checked) {
                        methodForm.setValue('isAffectingBase', true)
                      }
                    }}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  style={{ paddingTop: '10px' }}
                >
                  <CoreCheckbox
                    name='isAffectingBase'
                    control={control}
                    label='Tác động đến giá trị tính thuế kế tiếp'
                    onChangeValue={(checked: boolean) => {
                      if (!checked) {
                        methodForm.setValue('isIncludedPrice', false)
                      }
                    }}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  style={{ paddingTop: '10px' }}
                >
                  <CoreCheckbox
                    name='baseIsAffected'
                    control={control}
                    label='Giá trị tính thuế chịu tác động của thuế trước đó'
                  />
                </Grid>
              </Grid>
            </div>
          </>
        )}

        {actionType !== 'VIEW' && (
          <div className='space-x-12 text-center mt-10'>
            <ButtonCustom theme='cancel' onClick={onCancel}>
              {t('common:btn.cancel')}
            </ButtonCustom>
            <ButtonCustom
              theme='submit'
              type='submit'
              loading={isLoadingSubmit}
            >
              {isUpdate ? t('common:btn.save_change') : t('common:btn.add')}
            </ButtonCustom>
          </div>
        )}
      </form>
    </PageContainer>
  )
}

export default SaveTax
