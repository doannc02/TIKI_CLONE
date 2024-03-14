import { DialogProvider } from '@/components/hooks/dialog/useDialog'
import { useAppSelector } from '@/redux/hook'
import { Components, Theme, ThemeOptions, createTheme } from '@mui/material'
import NextNProgress from 'nextjs-progressbar'
import { ReactElement, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot, useRecoilValue } from 'recoil'
import multipleLayout from '../MultipleLayouts'
import { layoutType } from '../MultipleLayouts/recoil'
import ModeTheme from './ModeTheme'
import { GRAY_SCALE, RED, WHITE } from './ModeTheme/colors'
import { useTranslation } from 'next-i18next'

const queryClient = new QueryClient()

export const WrapLayout = (page: ReactElement) => {
  const mainTheme = useAppSelector((state) => state.themeColorData)
  const fontConfig = useAppSelector((state) => state.fontData)

  const palette = {
    primary: {
      main: mainTheme.firstMainColor,
      dark: mainTheme.firstMainColor,
    },
    secondary: {
      main: mainTheme.secondMainColor,
      dark: mainTheme.secondMainColor,
    },
    success: {
      main: mainTheme.thirdMainColor,
      dark: mainTheme.thirdMainColor,
    },
    error: {
      main: mainTheme.errorColor,
      light: mainTheme.errorColor,
      dark: mainTheme.errorColor,
    },
    warning: {
      main: mainTheme.warningColor,
      light: mainTheme.warningColor,
      dark: mainTheme.warningColor,
    },
  }

  const typography = {
    fontFamily: [
      'Roboto',
      'Times New Roman',
      'Nunito',
      '-apple-system',
      'BlinkMacSystemFont',
      'sans-serif',
    ].join(','),
    allVariants: {
      fontSize: '1rem',
    },
    h1: {
      fontSize: `${fontConfig.h1Size}rem`,
      lineHeight: `${fontConfig.h1Size}rem`,
      color: fontConfig.h1Color,
      fontFamily: fontConfig.h1Font,
      fontWeight: 'light',
      '@media (max-width:640px)': {
        fontSize: '4.5rem',
      },
    },
    h2: {
      fontSize: `${fontConfig.h2Size}rem`,
      lineHeight: `${fontConfig.h2Size}rem`,
      color: fontConfig.h2Color,
      fontFamily: fontConfig.h2Font,
      fontWeight: 'light',
      '@media (max-width:640px)': {
        fontSize: '3.125rem',
      },
    },
    h3: {
      fontSize: `${fontConfig.h3Size}rem`,
      lineHeight: `${fontConfig.h3Size}rem`,
      color: fontConfig.h3Color,
      fontFamily: fontConfig.h3Font,
      fontWeight: 700,
      '@media (max-width:640px)': {
        fontSize: '1.75rem',
      },
    },
    h4: {
      fontSize: `${fontConfig.h4Size}rem`,
      lineHeight: `${fontConfig.h4Size}rem`,
      color: fontConfig.h4Color,
      fontFamily: fontConfig.h4Font,
      fontWeight: 700,
      '@media (max-width:640px)': {
        fontSize: '1.5rem',
      },
    },
    h5: {
      fontSize: `${fontConfig.h5Size}rem`,
      lineHeight: `${fontConfig.h5Size}rem`,
      color: fontConfig.h5Color,
      fontFamily: fontConfig.h5Font,
      fontWeight: 500,
      '@media (max-width:640px)': {
        fontSize: '1.375rem',
      },
    },
    h6: {
      fontSize: `${fontConfig.h6Size}rem`,
      lineHeight: `${fontConfig.h6Size}rem`,
      color: fontConfig.h6Color,
      fontFamily: fontConfig.h6Font,
      fontWeight: 500,
      '@media (max-width:640px)': {
        fontSize: '1.0625rem',
      },
    },
    subtitle1: {
      fontSize: `${fontConfig.subtitle1Size}rem`,
      lineHeight: `${fontConfig.subtitle1Size}rem`,
      color: fontConfig.subtitle1Color,
      fontFamily: fontConfig.subtitle1Font,
      fontWeight: 500,
      '@media (max-width:640px)': {
        fontSize: '0.875rem',
      },
    },
    subtitle2: {
      fontSize: `${fontConfig.subtitle2Size}rem`,
      lineHeight: `${fontConfig.subtitle2Size}rem`,
      color: fontConfig.subtitle2Color,
      fontFamily: fontConfig.subtitle2Font,
      fontWeight: 500,
      '@media (max-width:640px)': {
        fontSize: '0.75rem',
      },
    },
    body1: {
      fontSize: `${fontConfig.body1Size}rem`,
      lineHeight: `${fontConfig.body1Size}rem`,
      color: fontConfig.body1Color,
      fontFamily: fontConfig.body1Font,
      fontWeight: 'normal',
      '@media (max-width:640px)': {
        fontSize: '0.875rem',
      },
    },
    body2: {
      fontSize: `${fontConfig.body2Size}rem`,
      lineHeight: `${fontConfig.body2Size}rem`,
      color: fontConfig.body2Color,
      fontFamily: fontConfig.body2Font,
      '@media (max-width:640px)': {
        fontSize: '0.75rem',
      },
    },
    caption: {
      fontSize: `${fontConfig.captionSize}rem`,
      lineHeight: `${fontConfig.captionSize}rem`,
      color: fontConfig.captionColor,
      fontFamily: fontConfig.captionFont,
      '@media (max-width:640px)': {
        fontSize: '0.75rem',
      },
    },
  }

  const components: Components<Omit<Theme, 'components'>> = {
    MuiButton: {
      styleOverrides: {
        root: {
          margin: 'none',
          borderRadius: 6,
          ':hover': {
            opacity: 0.8,
          },
          minHeight: 36,
          ':disabled': {
            opacity: 0.7,
          },
        },
      },
      defaultProps: {
        disableElevation: true,
        variant: 'contained' as any,
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 4,
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        input: {
          padding: '4px 4px 4px 10px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        asterisk: {
          color: RED,
        },
      },
      defaultProps: {
        shrink: true,
        sx: {
          ...typography.body2,
          padding: '2px',
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          minHeight: 48,
          borderColor: GRAY_SCALE,
        },
        input: {
          padding: '14.663px',
        },
        notchedOutline: { borderColor: GRAY_SCALE },
      },
      defaultProps: {
        notched: true,
        sx: {
          ...typography.body2,
          borderRadius: '4px',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          paddingBottom: 7,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputProps: {
          style: {
            minHeight: 48,
          },
        },
      },
      styleOverrides: {
        root: {
          ...typography.body2,
        },
      },
    },
    MuiPopover: {},
    MuiPopper: {},
    MuiCardHeader: {
      styleOverrides: {
        action: {
          display: 'flex',
          flex: 1,
          justifyContent: 'flex-end',
          margin: 0,
        },
        content: {
          width: 'fit-content',
          flex: 'inherit',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        tag: {
          ...typography.body2,
          margin: '1px 3px',
          padding: 0,
        },
        hasPopupIcon: { padding: 0 },
        hasClearIcon: { padding: 0 },
        inputRoot: {
          padding: '3px 0 3px 10px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        container: {
          minWidth: 500,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: typography.body1.fontSize,
          lineHeight: 1.2,
          padding: '0.8rem',
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: '5px 0px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {},
      },
    },

    MuiGrid: {
      styleOverrides: {
        root: {
          margin: 0,
          width: '100%',
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: WHITE,
          boxShadow: '0px 0px 4px 0px rgba(114, 114, 114, 0.25)',
          borderRadius: '4px',
        },
      },
    },
  }

  const themeConfig: ThemeOptions = {
    palette,
    typography,
    components,
  }

  const theme = createTheme(themeConfig)

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ModeTheme theme={theme}>
          <Layout layouts={multipleLayout}>
            <NextNProgress color={mainTheme.firstMainColor} height={4} />
            <DialogProvider>{page}</DialogProvider>
          </Layout>
        </ModeTheme>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

const Layout = (props: any) => {
  const { layouts, children } = props
  const layoutRecoilValue = useRecoilValue(layoutType)

  const LayoutSwitch = useMemo(
    () => layouts[layoutRecoilValue],
    [layoutRecoilValue, layouts]
  )

  return <LayoutSwitch>{children}</LayoutSwitch>
}
