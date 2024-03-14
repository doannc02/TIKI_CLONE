import useCurrency from '@/components/icons/Currency'
import { BLACK } from '@/components/layouts/WrapLayout/ModeTheme/colors'
import { useAppSelector } from '@/redux/hook'
import { Typography } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'

type Props = {
  amount: number
  variant?: Variant
  color?: string
  className?: string
  classNameSymbol?: string
  sizeOfSymbol?: number
  showSymbolCurrency?: boolean
  showCurrencyName?: boolean
}

export const CurrencyFormatCustom = (props: Props) => {
  const { thousandSeparator, floatRounding, position, symbol, currency } =
    useAppSelector((state) => state.companyConfigData)

  const {
    amount,
    color = BLACK,
    className = '',
    classNameSymbol = '',
    variant = 'body1',
    sizeOfSymbol = 15,
    showSymbolCurrency,
    showCurrencyName,
  } = props

  const type = thousandSeparator === 'COMMA' ? 'en-US' : 'de-DE'

  const formatNumberIntl = new Intl.NumberFormat(type, {
    maximumFractionDigits: floatRounding ?? 2,
  })

  const { currencyList } = useCurrency({
    height: sizeOfSymbol,
    width: sizeOfSymbol,
  })

  if (showSymbolCurrency) {
    const currency = currencyList.find((item) => item.id === symbol)

    if (currency)
      return (
        <div className='flex gap-2 items-center'>
          {position === 'LEFT' && (
            <div className={classNameSymbol}>{currency.icon}</div>
          )}

          <Typography variant={variant} className={className} style={{ color }}>
            {formatNumberIntl.format(amount)}
          </Typography>

          {position === 'RIGHT' && (
            <div className={classNameSymbol}>{currency.icon}</div>
          )}
        </div>
      )
  }

  if (showCurrencyName) {
    return (
      <div className='flex gap-2 items-center'>
        {position === 'LEFT' && (
          <Typography variant={variant} className={className} style={{ color }}>
            {`${currency} ${formatNumberIntl.format(amount)}`}
          </Typography>
        )}

        {position === 'RIGHT' && (
          <Typography variant={variant} className={className} style={{ color }}>
            {`${formatNumberIntl.format(amount)} ${currency} `}
          </Typography>
        )}

        {!position && (
          <Typography variant={variant} className={className} style={{ color }}>
            {formatNumberIntl.format(amount)}
          </Typography>
        )}
      </div>
    )
  }

  return (
    <Typography variant={variant} className={className} style={{ color }}>
      {formatNumberIntl.format(amount)}
    </Typography>
  )
}
