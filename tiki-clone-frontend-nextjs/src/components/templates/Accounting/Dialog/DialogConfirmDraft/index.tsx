import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Box, TextField, Typography } from '@mui/material'
import useDialogConfirmDraft from './useDialogConfirmDraft'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export type Props = {
  id: number
  type: 'INVOICE' | 'PAYMENT'
  refetch: any
}

const DialogConfirmDraft = ({ id, refetch, type }: Props) => {
  const [reason, setReason] = useState('')
  const { t } = useTranslation()
  const { hideDialog } = useDialog()
  const [values, handles] = useDialogConfirmDraft({ id, type, refetch, reason })
  const { isLoading } = values
  const { handleConfirmDraft } = handles

  return (
    <DialogCustom title='' onClose={hideDialog} width={800}>
      <Box className='flex justify-center px-25 m-auto align-middle text-center'>
        {type === 'INVOICE' && (
          <Typography
            variant='h6'
            style={{
              lineHeight: 1.5,
            }}
          >
            Bạn có chắc chắn muốn đặt lại trạng thái hóa đơn về Nháp ?
          </Typography>
        )}

        {type === 'PAYMENT' && (
          <Typography
            variant='h6'
            style={{
              lineHeight: 1.5,
            }}
          >
            Bạn có chắc chắn muốn đặt lại trạng thái thanh toán về Nháp ?
          </Typography>
        )}
      </Box>
      <Box className='px-10 mt-5'>
        <TextField
          InputProps={{ style: { padding: 0 } }}
          className='w-full'
          multiline
          placeholder='Nhập lý do từ chối'
          label='Lý do từ chối'
          inputProps={{ maxLength: 255 }}
          required
          rows={5}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
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
          <ButtonCustom
            height={46}
            theme='submit'
            loading={isLoading}
            onClick={(val: any) => handleConfirmDraft(val)}
          >
            {t('common:btn.confirm')}
          </ButtonCustom>
        </div>
      </Box>
    </DialogCustom>
  )
}

export default DialogConfirmDraft
