import {
  GRAY_SCALE,
  GREY,
} from '@/components/layouts/WrapLayout/ModeTheme/colors'
import { PAGE_SIZE } from '@/helper/contain'
import { errorMsg } from '@/helper/message'
import { PageResponse } from '@/service/type'
import CloseIcon from '@mui/icons-material/Close'
import {
  Autocomplete,
  AutocompleteProps,
  Chip,
  CircularProgress,
  FilterOptionsState,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material'
import { useDebounce } from '@uidotdev/usehooks'
import { get } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'

export interface FormControlAutoCompleteProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> extends Omit<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    'renderInput' | 'options'
  > {
  control: any
  name: string
  genus?: 'normal' | 'small'
  label: ReactNode
  placeholder: string
  rules?: any
  disabled?: boolean
  readOnly?: boolean
  labelPath?: string
  labelPath2?: string
  valuePath?: string
  isHasMessageError?: boolean
  helperText?: string
  required?: boolean
  params?: any
  variant?: 'outlined' | 'filled' | 'standard'
  isViewProp?: boolean
  exceptValues?: any[]
  fetchDataFn: (val: any) => Promise<PageResponse<any>>
  onChangeValue?: (val: any) => void
  onAfterChangeValue?: () => void
}

const CoreAutoCompleteAPI: <
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(
  prop: FormControlAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>
) => React.ReactElement<
  FormControlAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>
> = (props) => {
  const { t } = useTranslation()

  const {
    control,
    name,
    multiple,
    placeholder,
    rules,
    label,
    genus = 'normal',
    disabled,
    readOnly,
    labelPath = 'name',
    labelPath2,
    valuePath = 'id',
    isHasMessageError = true,
    helperText,
    required,
    params,
    variant = 'outlined',
    isViewProp,
    exceptValues,
    fetchDataFn,
    onChangeValue,
    onAfterChangeValue,
    ...restProps
  } = props

  const router = useRouter()
  const { actionType } = router.query
  const isView = isViewProp !== undefined ? isViewProp : actionType === 'VIEW'

  const [page, setPage] = useState(0)
  const [isClick, setIsClick] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [search, setSearch] = useState('')
  const debounceSearch = useDebounce(search, 700)
  const [data, setData] = useState<any>([])
  const [dataPage0, setDataPage0] = useState<any>([])

  const convertParam = JSON.stringify(params)
  const convertExceptValues = JSON.stringify(exceptValues)

  const handleSearchData = useCallback(async () => {
    setIsLoading(true)
    const data = await fetchDataFn({
      page: 0,
      size: PAGE_SIZE,
      search: debounceSearch,
      ...(params ? params : {}),
    })

    if (data && Array.isArray(data.data.content)) {
      const dataValue = [
        ...data.data.content.map((item: any) => ({
          ...item,
          [labelPath]: item[labelPath],
          [valuePath]: item[valuePath],
        })),
      ]

      setData(() =>
        exceptValues
          ? dataValue.filter((obj) => {
              return !exceptValues.some(
                (item: any) => item[valuePath] === obj[valuePath]
              )
            })
          : dataValue
      )
    }

    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch, fetchDataFn, convertParam])

  const handleFetchData = useCallback(
    async (isPreApply: boolean, pageOption?: number) => {
      try {
        setIsLoading(true)
        const pageValue = pageOption ?? page

        if (pageValue !== 0 && pageValue >= totalPages) {
          setIsLoading(false)
          return
        }
        const data = await fetchDataFn({
          page: pageValue,
          size: PAGE_SIZE,
          ...(params ? params : {}),
        })

        if (data && Array.isArray(data.data.content)) {
          const dataValue = data.data.content.map((item: any) => ({
            ...item,
            [labelPath]: item[labelPath],
            [valuePath]: item[valuePath],
          }))

          if (pageValue === 0) {
            setDataPage0(dataValue)
          }

          setData((pre: any) => {
            const newVal = [...(isPreApply ? pre : []), ...dataValue]

            return exceptValues
              ? newVal.filter((obj) => {
                  return !exceptValues.some(
                    (item: any) => item[valuePath] === obj[valuePath]
                  )
                })
              : newVal
          })

          setTotalPages(data.data.totalPages)
        }

        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        errorMsg(error)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchDataFn, page, totalPages, convertParam]
  )

  useEffect(() => {
    try {
      if (isClick) handleFetchData(false)
    } catch (error) {
      errorMsg(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClick, convertParam, convertExceptValues])

  useEffect(() => {
    if (isClick) {
      if (debounceSearch) {
        handleSearchData()
      } else {
        setPage(() => 0)
        setData(dataPage0)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch, convertParam])

  const handleSCroll = async (e: any) => {
    const listboxNode = e.currentTarget
    const currentHeight = listboxNode.scrollTop + listboxNode.clientHeight

    if (listboxNode.scrollHeight - currentHeight <= 1) {
      setPage((prev) => prev + 1)
      handleFetchData(true, page + 1)
    }
  }

  return (
    <div
      onClick={() => {
        if (!readOnly && !disabled && !isView && !isClick) setIsClick(true)
      }}
    >
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => {
          return (
            <Autocomplete
              multiple={multiple}
              value={value ?? null}
              sx={{
                '& .MuiAutocomplete-popupIndicator': {
                  display: isView ? 'none' : '',
                },
              }}
              options={data}
              disabled={disabled}
              readOnly={readOnly || isView}
              loading={isLoading}
              noOptionsText={t('form.autocomplete.no_options')}
              onBlur={onBlur}
              onChange={(e, value: any) => {
                onChange(value)
                if (onChangeValue) onChangeValue(value)
                if (onAfterChangeValue) onAfterChangeValue()
                setIsClick(false)
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant='outlined'
                    style={{
                      borderRadius: 4,
                      height: 26,
                      borderColor: GRAY_SCALE,
                      color: GREY,
                    }}
                    label={get(option, labelPath)}
                    {...getTagProps({ index })}
                    deleteIcon={<CloseIcon />}
                    key={index}
                  />
                ))
              }
              isOptionEqualToValue={(option, value) => {
                if (value instanceof Object) {
                  return get(option, valuePath) === get(value, valuePath)
                }
                return get(option, valuePath) === value
              }}
              getOptionLabel={(option) => {
                return (
                  (labelPath2
                    ? get(option, labelPath2) + ' - ' + get(option, labelPath)
                    : get(option, labelPath)) ?? ''
                )
              }}
              renderOption={(props, option: any) => {
                return (
                  <li {...props}>
                    <Typography variant='body2' title={get(option, labelPath)}>
                      {labelPath2
                        ? get(option, labelPath2) +
                          ' - ' +
                          get(option, labelPath)
                        : get(option, labelPath)}
                    </Typography>
                  </li>
                )
              }}
              filterOptions={(options, params: FilterOptionsState<any>) => {
                setSearch(params.inputValue)
                return options
              }}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    variant={isView ? 'standard' : variant}
                    inputRef={ref}
                    label={label}
                    error={!!(error || helperText)}
                    helperText={error && isHasMessageError && error.message}
                    placeholder={
                      (multiple ? !!value?.length : !!value)
                        ? ''
                        : placeholder ||
                          t('form.autocomplete.placeholder', {
                            label,
                          }).toString()
                    }
                    InputLabelProps={{
                      // ...params.InputLabelProps,
                      // ...params.InputLabelProps,
                      shrink: true,
                      required,
                    }}
                    InputProps={{
                      notched: true,
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {isLoading ? (
                            <CircularProgress color='inherit' size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                      ...(genus === 'small'
                        ? {
                            style: {
                              minHeight: '38px',
                              padding: '2px 60px 2px 5px',
                            },
                          }
                        : {}),
                    }}
                  />
                  {helperText && <FormHelperText>{helperText}</FormHelperText>}
                </>
              )}
              ListboxProps={{
                onScroll: (e) => {
                  handleSCroll(e)
                },
              }}
              {...restProps}
            />
          )
        }}
        rules={rules}
      />
    </div>
  )
}

export default React.memo(CoreAutoCompleteAPI)
