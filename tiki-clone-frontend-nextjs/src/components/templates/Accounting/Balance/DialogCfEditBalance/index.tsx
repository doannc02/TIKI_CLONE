import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import useDialogDeleteBalance from './useDialogCfEditBalance'

export type Props = {
  id: number
  refetch: any
}

const DialogCfEditBalance = ({ id, refetch }: Props) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()
  const [values, handles] = useDialogDeleteBalance({ id, refetch })
  const { onSubmit } = handles

  return (
    <DialogCustom title='' onClose={hideDialog} width={520}>
      <Box className='flex justify-center px-25 m-auto align-middle text-center'>
        <Typography
          variant='h6'
          style={{
            lineHeight: 1.5,
          }}
        >
          Nếu chỉnh sửa dư nợ này sẽ ảnh hưởng tới những hóa đơn đã được tham
          chiếu thanh toán bởi số tiền này, bạn có xác nhận vẫn chỉnh sửa không?
        </Typography>
      </Box>

      <div className='flex justify-center gap-10 py-17'>
        <ButtonCustom
          height={46}
          theme='cancel'
          onClick={() => {
            hideDialog()
          }}
        >
          {t('common:btn.cancel')}
        </ButtonCustom>
        <ButtonCustom height={46} theme='submit' onClick={onSubmit}>
          {t('common:btn.confirm')}
        </ButtonCustom>
      </div>
    </DialogCustom>
  )
}

export default DialogCfEditBalance
