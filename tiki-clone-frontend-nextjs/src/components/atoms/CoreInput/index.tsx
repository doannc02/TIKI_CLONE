import {
  FormHelperText,
  OutlinedTextFieldProps,
  TextField,
} from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import NumberFormatCustom from './NumberFormatCustom'

interface Props
  extends Omit<OutlinedTextFieldProps, 'variant' | 'label' | 'placeholder'> {
  className?: string
  control: any
  name: string
  label?: string | null
  placeholder?: string | null
  InputLabelProps?: any
  inputProps?: any
  InputProps?: any
  required?: boolean
  readOnly?: boolean
  type?: string
  multiline?: boolean
  minRows?: number
  disabled?: boolean
  hidden?: boolean
  helperText?: any
  rules?: any
  variant?: 'outlined' | 'filled' | 'standard'
  genus?: 'small' | 'normal'
  disableDecimal?: boolean
  disableNegative?: boolean
  onKeyPress?: any
  decimalScale?: number
  hasMessageError?: boolean
  onAfterChangeValue?: any
  isViewProp?: boolean
  onChangeValue?: (val: any) => void
}

const CoreInput = (props: Props) => {
  const {
    className,
    control,
    name,
    label,
    placeholder,
    InputLabelProps,
    inputProps,
    InputProps,
    required,
    readOnly,
    type,
    multiline,
    minRows = 5,
    hidden,
    helperText,
    disabled,
    rules,
    variant = 'outlined',
    onBlur: onBlurAction,
    genus = 'normal',
    disableDecimal,
    disableNegative = true,
    onAfterChangeValue,
    decimalScale,
    hasMessageError = true,
    isViewProp,
    onChangeValue,
    ...restProps
  } = props

  const { t } = useTranslation('common')

  const router = useRouter()
  const { actionType } = router.query
  const isView = isViewProp !== undefined ? isViewProp : actionType === 'VIEW'

  let transform: any
  if (type === 'number') {
    transform = {
      input: (value: any) => value,
      output: (e: any) => {
        const output = e.target.value
        if (output === 0) return 0
        if (output === '' || output === null || output === undefined)
          return null
        else return Number.isNaN(output) ? null : Number(output)
      },
    }
  }

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => (
          <>
            <TextField
              fullWidth
              type={type === 'number' ? 'text' : type}
              label={label}
              placeholder={
                placeholder ||
                t('form.input.placeholder', { label: label?.toLowerCase() }) ||
                ''
              }
              variant={isView ? 'standard' : variant}
              onChange={(e) => {
                onChange(transform ? transform?.output(e) : e)
                if (onChangeValue) {
                  onChangeValue(e.target.value)
                }
                if (onAfterChangeValue) onAfterChangeValue()
              }}
              onBlur={(e) => {
                onBlur()
                onBlurAction && onBlurAction(e)
              }}
              value={transform ? transform?.input(value) : value}
              inputRef={ref}
              multiline={multiline}
              minRows={minRows}
              disabled={disabled}
              error={!!error}
              helperText={error && hasMessageError && error.message}
              InputLabelProps={{
                shrink: placeholder ? true : undefined,
                required,
                ...InputLabelProps,
              }}
              inputProps={{
                readOnly: isView || readOnly,
                disableDecimal: disableDecimal,
                disableNegative: disableNegative,
                decimalScale: decimalScale,
                ...inputProps,
              }}
              InputProps={{
                ...InputProps,
                ...(type === 'number' && {
                  inputComponent: NumberFormatCustom,
                }),
                ...(genus === 'small'
                  ? {
                      style: {
                        minHeight: '38px',
                        height: '38px',
                      },
                    }
                  : {}),
              }}
              {...restProps}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </>
        )}
        rules={!isView ? rules : {}}
      />
    </div>
  )
}

export default React.memo(CoreInput)
