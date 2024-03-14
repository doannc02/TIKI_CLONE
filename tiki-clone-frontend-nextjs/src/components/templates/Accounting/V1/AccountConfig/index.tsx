import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import PageContainer from '@/components/organism/PageContainer'
import { getAccountList } from '@/service/accounting/account/getList'
import { getAccountJournal } from '@/service/accounting/accountJournal/getList'
import { getCashRoundingList } from '@/service/accounting/cashRounding/getList'
import { getTaxList } from '@/service/accounting/tax/getList'
import { getCountryList } from '@/service/common/country/getList'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import MyCollapse from './MyCollapse'
import useAccountConfig from './useAccountConfig'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { useFieldArray } from 'react-hook-form'

const AccountConfig = () => {
  const { t } = useTranslation('accounting/account-config')
  const [values, handles] = useAccountConfig()

  const { methodForm, isLoadingSubmit } = values
  const { control } = methodForm

  const { onSubmit, onCancel } = handles
  const { fields : branchAcc, append, remove } = useFieldArray({
    name: `branchAccounting`,
    keyName: 'key',
    control,
  })
  return (
    <PageContainer
      title={
        <div className='flex w-full'>
          <div className='flex flex-col justify-center'>
            <Typography variant='subtitle1'>{t('title')}</Typography>
          </div>
        </div>
      }
      className='py-15 px-0'
    >
      <form onSubmit={onSubmit} className='flex flex-col pt-5'>
        <Grid
          container
          spacing={{ xs: 1, sm: 2, md: 3 }}
          style={{
            paddingLeft: '30px',
            paddingRight: '30px',
            paddingBottom: '30px',
          }}
        >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant='h6'>Khu vực kế toán</Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant='subtitle1'>
              Thuế, vị trí tài chính, biểu đồ tài khoản & báo cáo pháp lý cho
              quốc gia của bạn
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            style={{
              marginTop: '12px',
            }}
          >
            <CoreAutoCompleteAPI
              control={control}
              name='country'
              label='Quốc gia'
              placeholder='Chọn package'
              valuePath='id'
              labelPath='name'
              fetchDataFn={getCountryList}
            />
          </Grid>
        </Grid>

        <MyCollapse title='Hóa đơn khách hàng'>
          <Grid
            container
            spacing={{ xs: 1, sm: 2, md: 3 }}
            style={{
              padding: '30px',
            }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant='h6'>Làm tròn tiền</Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant='subtitle1' color='#747475'>
                Xác định giá trị đồng tiền nhỏ nhất của loại tiền tệ được sử
                dụng để thanh toán bằng tiền mặt
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginTop: '12px',
              }}
            >
              <CoreAutoCompleteAPI
                control={control}
                name='cashRounding'
                placeholder='Chọn phương thức làm tròn'
                label='Phương thức làm tròn'
                fetchDataFn={getCashRoundingList}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant='h6'>Thuế mặc định</Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant='subtitle1' color='#747475'>
                Thuế mặc định áp dụng cho các giao dịch hiện tại
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginTop: '12px',
              }}
            >
              <CoreAutoCompleteAPI
                control={control}
                name='saleDefaultTax'
                label='Thuế bán hàng'
                placeholder='Chọn sales tax'
                fetchDataFn={getTaxList}
                params={{
                  type: 'SALE',
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginTop: '12px',
              }}
            >
              <CoreAutoCompleteAPI
                control={control}
                name='purchaseDefaultTax'
                label='Thuế mua hàng'
                placeholder='Chọn purchase tax'
                fetchDataFn={getTaxList}
                params={{
                  type: 'PURCHASE',
                }}
              />
            </Grid>
          </Grid>
        </MyCollapse>

        <MyCollapse title='Hệ thống tài khoản'>
          <Grid
            container
            spacing={{ xs: 1, sm: 2, md: 3 }}
            style={{
              padding: '30px',
            }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant='subtitle1'>Sổ kế toán mặc định:</Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginTop: '12px',
              }}
            >
              <CoreAutoCompleteAPI
                control={control}
                name='saleDefaultJournal'
                placeholder='Chọn sổ'
                label='Sổ kế toán mua hàng'
                fetchDataFn={getAccountJournal}
                params={{
                  type: 'PURCHASE',
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginTop: '12px',
              }}
            >
              <CoreAutoCompleteAPI
                control={control}
                name='purchaseDefaultJournal'
                placeholder='Chọn sổ'
                label='Sổ kế toán bán hàng'
                fetchDataFn={getAccountJournal}
                params={{
                  type: 'SALE',
                }}
              />
            </Grid>
          </Grid>
        </MyCollapse>

        <MyCollapse title='Các tài khoản mặc định'>
          <Grid
            container
            spacing={{ xs: 1, sm: 2, md: 3 }}
            style={{
              padding: '30px',
            }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant='subtitle1'>
                Gửi các giao dịch ngân hàng và thanh toán trong:
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginTop: '12px',
              }}
            >
              <CoreAutoCompleteAPI
                control={control}
                name='internalTransferAccount'
                placeholder='Chọn tài khoản'
                label='Điều chuyển nội bộ'
                labelPath2='code'
                fetchDataFn={getAccountList}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant='subtitle1'>Gửi giảm giá trong:</Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginTop: '12px',
              }}
            >
              <CoreAutoCompleteAPI
                control={control}
                name='discountGainAccount'
                label='Chiết khấu tiền mặt tăng'
                placeholder='Chọn tài khoản'
                labelPath2='code'
                fetchDataFn={getAccountList}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginTop: '12px',
              }}
            >
              <CoreAutoCompleteAPI
                control={control}
                name='discountLossAccount'
                label='Giảm giá tiền mặt lỗ'
                placeholder='Chọn tài khoản'
                labelPath2='code'
                fetchDataFn={getAccountList}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant='subtitle1'>Thay đổi tỷ giá tiền:</Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginTop: '12px',
              }}
            >
              <CoreAutoCompleteAPI
                control={control}
                name='incomeCurrencyExchangeAccount'
                label='Ghi nhận thay đổi tỷ giá tiền'
                placeholder='Chọn tài khoản'
                labelPath2='code'
                fetchDataFn={getAccountList}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant='subtitle1'>Thay đổi tỷ giá tiền:</Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginTop: '12px',
              }}
            >
              <CoreAutoCompleteAPI
                control={control}
                name='incomeAccount'
                label='Tài khoản thu nhập'
                placeholder='Chọn tài khoản'
                labelPath2='code'
                fetchDataFn={getAccountList}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginTop: '12px',
              }}
            >
              <CoreAutoCompleteAPI
                control={control}
                name='expenseAccount'
                label='Tài khoản chi phí'
                placeholder='Chọn tài khoản'
                labelPath2='code'
                fetchDataFn={getAccountList}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginTop: '12px',
              }}
            >
              <CoreAutoCompleteAPI
                control={control}
                name='receivableAccount'
                label='Tai khoan ghi nhận doanh thu bán hàng'
                placeholder='Chọn tài khoản'
                labelPath2='code'
                fetchDataFn={getAccountList}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginTop: '12px',
              }}
            >
              <CoreAutoCompleteAPI
                control={control}
                name='payableAccount'
                label='Tài khoản ghi nhận chi phí mua hàng'
                placeholder='Chọn tài khoản'
                labelPath2='code'
                fetchDataFn={getAccountList}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                marginTop: '12px',
              }}
            >
              <CoreAutoCompleteAPI
                control={control}
                name='posReceivableAccount'
                label='Tài khoản ghi nhận doanh thu bán lẻ'
                placeholder='Chọn tài khoản'
                labelPath2='code'
                fetchDataFn={getAccountList}
              />
            </Grid>
          </Grid>
        </MyCollapse>

        <MyCollapse title='Hình thức hạch toán cho chi nhánh'>
          <Grid
            container
            spacing={{ xs: 1, sm: 2, md: 3 }}
            style={{
              padding: '30px',
            }}
          >
            {/* <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant='subtitle1'>Sổ kế toán mặc định:</Typography>
            </Grid> */}

            {branchAcc.length > 0 ? (
              (branchAcc ?? []).map((item, index) => {
                return (
                  <>
                    <Grid
                      container
                      spacing={{ xs: 1, sm: 2, md: 3 }}
                      style={{
                        padding: '30px',
                      }}
                    >
                      {' '}
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        style={{
                          marginTop: '12px',
                        }}
                      >
                        <CoreInput
                          control={control}
                          name={`branchAccounting.${index}.branch.name`}
                          isViewProp={true}
                          label='Tên chi nhánh'
                          genus='small'
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        style={{
                          marginTop: '12px',
                        }}
                      >
                        <CoreAutocomplete
                          label='Hình thức hạch toán'
                          control={control}
                          name={`branchAccounting.${index}.accountingForm`}
                          options={[
                            { label: 'Phụ thuộc', value: 'DEPENDENCE' },
                            { label: 'Độc lập', value: 'INDEPENDENCE' },
                          ]}
                        />
                      </Grid>
                    </Grid>
                  </>
                )
              })
            ) : (
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography>Chưa có chi nhánh nào.</Typography>
              </Grid>
            )}
          </Grid>
        </MyCollapse>

        <div className='space-x-12 text-center mt-10'>
          <ButtonCustom theme='cancel' onClick={onCancel}>
            {t('common:btn.cancel')}
          </ButtonCustom>
          <ButtonCustom theme='submit' type='submit' loading={isLoadingSubmit}>
            {t('common:btn.save_change')}
          </ButtonCustom>
        </div>
      </form>
    </PageContainer>
  )
}

export default AccountConfig
