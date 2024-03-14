import {
  BLACK,
  GREEN,
  ORANGE,
  PRIMARY,
  RED,
  WHITE,
} from '@/components/layouts/WrapLayout/ModeTheme/colors'
import {
  ButtonConfig,
  CompanyConfig,
  FontConfig,
  ThemeColorConfig,
} from '@/redux/type'

const themeColorDefaultConfig: ThemeColorConfig = {
  layout: 'layout1',
  theme: 'THEME_1',
  firstMainColor: PRIMARY,
  secondMainColor: BLACK,
  thirdMainColor: '#E2E2E2',
  fourthMainColor: '#E2E2E2',
  successColor: GREEN,
  errorColor: RED,
  warningColor: ORANGE,
}

const fontDefaultConfig: FontConfig = {
  typeFont: 'Roboto',

  h1Color: '#242424',
  h1Font: 'Roboto',
  h1Size: 3.5,

  h2Color: '#242424',
  h2Font: 'Roboto',
  h2Size: 2.75,

  h3Color: '#242424',
  h3Font: 'Roboto',
  h3Size: 1.875,

  h4Color: '#242424',
  h4Font: 'Roboto',
  h4Size: 1.625,

  h5Color: '#242424',
  h5Font: 'Roboto',
  h5Size: 1.5,

  h6Color: '#242424',
  h6Font: 'Roboto',
  h6Size: 1.1875,

  subtitle1Color: '#242424',
  subtitle1Font: 'Roboto',
  subtitle1Size: 1,

  subtitle2Color: '#242424',
  subtitle2Font: 'Roboto',
  subtitle2Size: 0.9375,

  body1Color: '#242424',
  body1Font: 'Roboto',
  body1Size: 1,

  body2Color: '#242424',
  body2Font: 'Roboto',
  body2Size: 0.8125,

  captionColor: '#242424',
  captionFont: 'Roboto',
  captionSize: 0.75,
}

const buttonDefaultConfig: ButtonConfig = {
  submitButton: {
    textColor: WHITE,
    hoverTextColor: WHITE,
    backgroundColor: PRIMARY,
    backgroundHoverColor: PRIMARY,
    borderColor: PRIMARY,
    borderHoverColor: PRIMARY,
  },
  draftButton: {
    textColor: '#747475',
    hoverTextColor: '#747475',
    backgroundColor: WHITE,
    backgroundHoverColor: WHITE,
    borderColor: '#DFE0EB',
    borderHoverColor: '#DFE0EB',
  },
  rejectButton: {
    textColor: '#747475',
    hoverTextColor: '#747475',
    backgroundColor: WHITE,
    backgroundHoverColor: WHITE,
    borderColor: '#DFE0EB',
    borderHoverColor: '#DFE0EB',
  },
  resetButton: {
    textColor: '#FF4956',
    hoverTextColor: '#FF4956',
    backgroundColor: WHITE,
    backgroundHoverColor: WHITE,
    borderColor: '#FF4956',
    borderHoverColor: '#FF4956',
  },
}

const companyConfig: CompanyConfig = {
  id: 0,
  username: '',
  timezone: '',
  symbol: '',
  currency: 'VND',
  position: 'RIGHT',
  language: 'vn',
  decimalSeparator: 'COMMA',
  thousandSeparator: 'DOTS',
  floatRounding: 2,
  code: '',
  name: '',
  countryId: 0,
  country: '',
  languageId: 0,
  languageCode: '',
  activated: true,
  parentId: null,
  parent: null,
  description: '',
  currencyId: 0,
  logo: '',
  phone: '',
  email: '',
  taxCode: '',
  address: '',
}

const defaultValue = {
  themeColorDefaultConfig,
  fontDefaultConfig,
  buttonDefaultConfig,
  companyConfig,
}

export default defaultValue
