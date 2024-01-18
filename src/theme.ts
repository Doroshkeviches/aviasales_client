import { PaletteColorOptions, createTheme, styled } from '@mui/material';
import image from './assets/plane1.png';

export const GlobalStyles = styled('div')({
  body: {
    margin: 0,
    padding: 0,
  },
});
declare module '@mui/material' {
  interface Color {
    main: string;
  }
}
declare module '@mui/material' {
  interface CustomPalette {
    ['white']?: PaletteColorOptions;
    ['bright-midnight']?: PaletteColorOptions;
    ['miami-marmelade']?: PaletteColorOptions;
    ['flame-red']?: PaletteColorOptions;
    ['perfect-landing']?: PaletteColorOptions;
    ['greenish-blue']?: PaletteColorOptions;
    ['grey']?: PaletteColorOptions;
    ['default']?: PaletteColorOptions;
    ['black']?: PaletteColorOptions
  }
  interface Palette extends CustomPalette { }
  interface PaletteOptions extends CustomPalette { }
  interface SwitchPropsColorOverrides {
    'bright-midnight': true;
    default: true;
  }
}
declare module '@mui/material' {
  interface ButtonPropsColorOverrides {
    default: true;
  }

  interface ButtonPropsVariantOverrides {
    google: true;
  }

  interface ButtonPropsVariantOverrides {
    card: true;
  }
}
declare module '@mui/material/styles' {
  interface TypographyVariants {
    t1: React.CSSProperties;
    t2: React.CSSProperties;
    t3: React.CSSProperties;
    t4: React.CSSProperties;
    t5: React.CSSProperties;
    t6: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    t1?: React.CSSProperties;
    t2?: React.CSSProperties;
    t3?: React.CSSProperties;
    t4?: React.CSSProperties;
    t5?: React.CSSProperties;
    t6?: React.CSSProperties;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    t1: true;
    t2: true;
    t3: true;
    t4: true;
    t5: true;
    t6: true;
  }
}
declare module '@mui/material' {
  interface StackPropsVariantOverrides {
    row: true;
    className: true;
  }
}

export const colors = {
  primary: '#031074', // dark-blue
  primaryPressed: '#041492', // blue
  primaryDisabled: '#6872BD', // light-blue

  secondary: '#000000', // orange
  orange: '#F8931F', // orange
  success: '#0c8d4f', // green
  error: '#F44336',
  successBlend: '#0c8d60', // blend green
  errorBlend: '#88292F', // blend red

  brightGrey: '#EBEFF2',
  lightGrey: '#D1D1D1',
  grey: '#5E6B74',
  greyPressed: '#D8E0E6',
  greyDisabled: '#D8E0E6',

  blue: '#002ead',
  black: '#000000',
  white: '#FFFFFF',
  whitesmoke: '#F5F5F5',
};

enum Fonts {
  primary = 'Quicksand, sans-serif',
  secondary = 'Oswald, sans-serif',
}

enum CursorType {
  Auto = 'auto',
  Default = 'default',
  None = 'none',
  ContextMenu = 'context-menu',
  Help = 'help',
  Pointer = 'pointer',
  Progress = 'progress',
}

enum FontSize {
  H1 = 30,
  H2 = 24,
  H3 = 20,
  H4 = 18,
  H5 = 16,
  H6 = 14,
  T1 = 16,
  T2 = 16,
  T3 = 16,
  T4 = 16,
  T5 = 14,
  T6 = 12,
  T7 = 10,
}

enum FontWeight {
  Normal = 'normal',
  Lighter = 'lighter',
  Bold = 'bold',
  Bolder = 'bolder',
  Medium = 'medium',
  SemiBold = '500',
}

export const theme = createTheme({
  typography: {
    allVariants: {
      cursor: CursorType.Default,
      fontFamily: Fonts.primary,
    },

    h1: {
      fontSize: FontSize.H1,
      fontWeight: FontWeight.Normal,
      lineHeight: '2.167',
      '&.main': {
        color: colors.whitesmoke,
      },
      '@media (max-width: 785px)': {
        lineHeight: '1.6',
        fontSize: FontSize.H2,
      },
      '@media (max-width: 520px)': {
        lineHeight: '1.4',
        fontSize: FontSize.H3,
      },
      '@media (max-width: 460px)': {
        lineHeight: '1.2',
        fontSize: FontSize.H4,
      },
      '@media (max-width: 360px)': {
        lineHeight: '1',
        fontSize: FontSize.H6,
      },
    },
    h2: {
      fontSize: FontSize.H2,
      fontWeight: FontWeight.Normal,
      lineHeight: '1.6',
      '&.main': {
        color: colors.whitesmoke,
      },
      '@media (max-width: 785px)': {
        lineHeight: '1.5',
        fontSize: FontSize.H3,
      },
      '@media (max-width: 520px)': {
        lineHeight: '1.3',
        fontSize: FontSize.H4,
      },
      '@media (max-width: 460px)': {
        lineHeight: '1.2',
        fontSize: FontSize.H5,
      },
      '@media (max-width: 360px)': {
        lineHeight: '1',
        fontSize: FontSize.H6,
      },
    },
    h3: {
      fontSize: FontSize.H3,
      fontWeight: FontWeight.Normal,
      lineHeight: '1.5',
      '&.main': {
        color: colors.whitesmoke,
      },
    },
    h4: {
      fontSize: FontSize.H4,
      fontWeight: FontWeight.Normal,
      lineHeight: '1.428571',
      '&.main': {
        color: colors.whitesmoke,
      },
      '&.navlink': {
        fontWeight: FontWeight.SemiBold,
        color: colors.black,
      },
    },
    h5: {
      fontSize: FontSize.H5,
      fontWeight: 'normal',
      lineHeight: '1.4',
      '&.main': {
        color: colors.whitesmoke,
      },
      '&.forget-password': {
        color: colors.whitesmoke,
        cursor: CursorType.Pointer,
        marginLeft: 'auto',
      },
      '&.personal-info': {
        fontWeight: FontWeight.SemiBold,
        cursor: CursorType.Pointer,
        color: colors.primaryPressed,
      },
      '@media (max-width: 1100px)': {
        lineHeight: '1.2',
        fontSize: FontSize.H6,
      },
      '@media (max-width: 785px)': {
        lineHeight: '1.2',
        fontSize: FontSize.T6,
      },
      '@media (max-width: 460px)': {
        lineHeight: '1',
        fontSize: FontSize.T7,
      },
    },
    h6: {
      fontSize: FontSize.H6,
      fontWeight: FontWeight.Lighter,
      lineHeight: '1.3333',
      '&.main': {
        color: colors.whitesmoke,
      },
      '&.forget-password': {
        marginLeft: 'auto',
        cursor: 'pointer',
        fontWeight: FontWeight.SemiBold,
        color: colors.whitesmoke,
      },
    },
    t1: {
      fontSize: FontSize.T1,
      fontWeight: FontWeight.Bold,
    },
    t2: {
      fontSize: FontSize.T2,
      fontWeight: FontWeight.SemiBold,
    },
    t3: {
      fontSize: FontSize.T3,
      fontWeight: FontWeight.Normal,
    },
    t4: {
      fontSize: FontSize.T4,
      fontWeight: FontWeight.SemiBold,
    },
    t5: {
      fontSize: FontSize.T5,
      fontWeight: FontWeight.Normal,
    },
    t6: {
      fontSize: FontSize.T6,
      fontWeight: FontWeight.Normal,
    },
  },
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    error: {
      main: colors.error,
    },
    success: {
      main: colors.success,
    },
    default: {
      main: colors.blue,
    },
    white: {
      main: colors.white,
    },
    black: {
      main: colors.black
    }
  },
  components: {
    MuiTextField: {
      // styleOverrides: {
      //   root: {
      //     '& .MuiSvgIcon-root': {
      //       color: colors.whitesmoke,
      //     },
      //     '& .MuiInputLabel-root': {
      //       fontFamily: Fonts.primary,
      //       color: `${colors.whitesmoke}`, // Цвет текста label
      //       borderColor: colors.whitesmoke,
      //     },
      //     '& .MuiOutlinedInput-root': {
      //       cursor: 'pointer',
      //       borderColor: colors.whitesmoke, // Цвет рамки

      //       '& fieldset': {
      //         borderColor: colors.whitesmoke, // Цвет рамки
      //       },
      //       '&:hover fieldset': {
      //         cursor: CursorType.Pointer,
      //         borderColor: colors.whitesmoke, // Цвет рамки
      //       },
      //       '&.Mui-focused fieldset': {
      //         borderColor: colors.whitesmoke, // Цвет рамки при фокусе (нажатии)
      //       },
      //       '& input': {
      //         cursor: CursorType.Pointer,
      //         maxWidth: '100%',
      //         color: colors.whitesmoke, // Цвет текста внутри input
      //         fontFamily: Fonts.primary,
      //       },
      //     },
      //   },
      // },
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            "& label": {
              color: colors.whitesmoke,
              fontFamily: "Source Sans 3 Regular",
              fontSize: "16px",
            },
            "&:hover label": {
              color: colors.whitesmoke,
              fontFamily: "Source Sans 3 Regular",
              fontSize: "16px",
            },
            '& .MuiSvgIcon-root': {
              color: colors.whitesmoke,
            },
            '& .MuiFocused': {
              color: colors.whitesmoke,
              borderColor: colors.whitesmoke,
            },
            '& .MuiFormLabel-root': {
              fontFamily: Fonts.primary,
              color: colors.whitesmoke, // Цвет текста label
              borderColor: colors.whitesmoke,
              '& MuiInputLabel-root.Mui-focused': {
                color: colors.whitesmoke, // Цвет текста label
                borderColor: colors.whitesmoke,
              }
            },
            '& .MuiOutlinedInput-root': {
              cursor: 'pointer',
              borderColor: colors.whitesmoke, // Цвет рамки

              '& fieldset': {
                borderColor: colors.whitesmoke, // Цвет рамки
              },
              '&:hover fieldset': {
                cursor: CursorType.Pointer,
                borderColor: colors.whitesmoke, // Цвет рамки
              },
              '&:hover label': {
                cursor: CursorType.Pointer,
                borderColor: colors.whitesmoke, // Цвет рамки
              },
              "& fieldset:disabled": {
                borderColor: "transparent",
              },
              "& .MuiOutlinedInput-root": {
                "& input": {
                  padding: "16px",
                },
                "& input:disabled": {
                  borderColor: colors.whitesmoke,
                  backgroundColor: colors.whitesmoke,
                },

                "& fieldset": {
                  color: colors.whitesmoke,
                  fontSize: "10px",
                },
                "& ::placeholder": {
                  color: colors.whitesmoke,
                  fontSize: "14px",
                },

                "& fieldset:disabled": {
                  borderColor: colors.whitesmoke,
                  color: colors.whitesmoke,
                },
                "&:hover fieldset": {
                  borderColor: colors.whitesmoke,
                  color: colors.whitesmoke,
                  borderRadius: "4px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: colors.whitesmoke,
                  color: colors.whitesmoke,
                  borderRadius: "4px",
                },
              },
              '& input': {
                cursor: CursorType.Pointer,
                maxWidth: '100%',
                color: colors.whitesmoke, // Цвет текста внутри input
                borderColor: colors.whitesmoke,
                fontFamily: Fonts.primary,
              },
            }
          }
        },
        {
          props: { variant: 'outlined', color: "secondary" },
          style: {
            "& label": {
              color: colors.black,
              fontFamily: "Source Sans 3 Regular",
              fontSize: "16px",
            },
            "&:hover label": {
              color: colors.black,
              fontFamily: "Source Sans 3 Regular",
              fontSize: "16px",
            },
            '& .MuiSvgIcon-root': {
              color: colors.black,
            },
            '& .MuiFocused': {
              color: colors.black,
              borderColor: colors.black,
            },
            '& .MuiFormLabel-root': {
              fontFamily: Fonts.primary,
              color: `${colors.black}`, // Цвет текста label
              borderColor: colors.black,
              '& MuiInputLabel-root.Mui-focused': {
                color: `${colors.black}`, // Цвет текста label
                borderColor: colors.black,
              }
            },
            '& .MuiOutlinedInput-root': {
              cursor: 'pointer',
              borderColor: colors.black, // Цвет рамки

              '& fieldset': {
                borderColor: colors.black, // Цвет рамки
              },
              '&:hover fieldset': {
                cursor: CursorType.Pointer,
                borderColor: colors.black, // Цвет рамки
              },
              '&:hover label': {
                cursor: CursorType.Pointer,
                borderColor: colors.black, // Цвет рамки
              },
              "& fieldset:disabled": {
                borderColor: "transparent",
              },
              "& .MuiOutlinedInput-root": {
                "& input": {
                  padding: "16px",
                },
                "& input:disabled": {
                  borderColor: colors.black,
                  backgroundColor: colors.black,
                },

                "& fieldset": {
                  color: colors.black,
                  fontSize: "10px",
                },
                "& ::placeholder": {
                  color: colors.black,
                  fontSize: "14px",
                },

                "& fieldset:disabled": {
                  borderColor: colors.black,
                  color: colors.black,
                },
                "&:hover fieldset": {
                  borderColor: colors.black,
                  color: colors.black,
                  borderRadius: "4px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: colors.black,
                  color: colors.black,
                  borderRadius: "4px",
                },
              },
              '& input': {
                cursor: CursorType.Pointer,
                maxWidth: '100%',
                color: colors.black, // Цвет текста внутри input
                borderColor: colors.black,
                fontFamily: Fonts.primary,
              },
            }
          }
        },
      ]
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '&.form-control-search': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: colors.grey,
            padding: '40px 0px',
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          width: '100%',
          lineHeight: 1.2,
          margin: 0,
          paddingTop: 6,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {},
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: FontWeight.Normal,
            fontFamily: Fonts.primary,
            color: colors.whitesmoke,
            backgroundColor: colors.primary,
          },
        },
        {
          props: {
            variant: 'contained',
            color: 'default',
          },
          style: {
            padding: '8px 16px',
            textTransform: 'capitalize',
            textAlign: 'center',
            color: colors.whitesmoke,
            backgroundColor: colors.primary,

            '&:hover': {
              backgroundColor: colors.orange,
            },

            '&:active': {
              backgroundColor: colors.orange,
            },
            '&:disabled': {
              color: colors.white,
              backgroundColor: colors.orange,
            },
          },
        },
        {
          props: {
            variant: 'contained',
            color: 'primary',
            className: 'flight-search',
          },
          style: {
            backgroundColor: colors.primary,
            maxWidth: '35%',
            padding: '12px 16px 12px 16px',
            textTransform: 'capitalize',
            textAlign: 'center',
            '&:hover': {
              backgroundColor: colors.primaryPressed,
            },
            '&:active': {
              backgroundColor: colors.primaryPressed,
            },
            '&:disabled': {
              color: colors.white,
              backgroundColor: colors.primaryDisabled,
            },
          },
        },
        {
          props: {
            variant: 'contained',
            color: 'success',
          },
          style: {
            minWidth: '80px',
            backgroundColor: colors.primary,
            padding: '6px 12px',
            textTransform: 'capitalize',
            textAlign: 'center',

            '@media (max-width: 785px)': {
              minWidth: '40px',
              padding: '3px 12px',
              lineHeight: '1.4',
              fontSize: 14,
            },
            '@media (max-width: 460px)': {
              padding: '3px 8px',
              lineHeight: '1.2',
              fontSize: 12,
            },
            '@media (max-width: 360px)': {
              padding: '3px 6px',
              lineHeight: '1',
              fontSize: 10,
            },
            '&:hover': {
              backgroundColor: colors.success,
            },
            '&:active': {
              backgroundColor: colors.success,
            },
            '&:disabled': {
              color: colors.white,
              backgroundColor: colors.primaryDisabled,
            },
          },
        },
        {
          props: {
            variant: 'contained',
            color: 'error',
          },
          style: {
            padding: '4px 8px',
            textTransform: 'capitalize',
            textAlign: 'center',
            color: colors.whitesmoke,
            backgroundColor: colors.errorBlend,

            '&:hover': {
              backgroundColor: colors.error,
            },

            '&:active': {
              backgroundColor: colors.error,
            },
            '&:disabled': {
              color: colors.white,
              backgroundColor: colors.error,
            },
          },
        },
      ],
    },
    MuiStack: {
      styleOverrides: {
        root: {
          '&.page-stack': {
            flexDirection: 'column',
            minWidth: '100%',
          },
          '&.cities-search-stack': {
            paddingTop: 20,
            minWidth: '35%',
            gap: 18,
            flexWrap: 'wrap',
          },
          '&.paths-stack': {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 40,
            gap: 20,
            '@media (max-width: 785px)': {
              padding: 25,
            },
            '@media (max-width: 460px)': {
              padding: 20,
            },
          },
          '&.flights-element-stack': {
            backgroundColor: colors.whitesmoke,
            justifyContent: 'space-between',
            height: '20%',
            padding: 20,
            borderRadius: 8,
            width: '55%',

            '@media (max-width: 1100px)': {
              width: '65%',
            },

            '@media (max-width: 785px)': {
              padding: 10,
              width: '75%',
            },
            '@media (max-width: 460px)': {
              padding: 5,
              width: '85%',
            },
            '@media (max-width: 360px)': {
              padding: 2,
              width: '95%',
            },
          },
          '&.price-stack': {
            alignItems: 'center',
            width: '15%',
            padding: 10,
            gap: 10,
            flexDirection: 'column',

            '@media (max-width: 460px)': {
              padding: 5,
              justifyContent: 'center',
            },
          },
          '&.path-stack': {
            minWidth: '180px',
            padding: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          '&.path-stack-outlook': {
            flexDirection: 'column',
            padding: 20,
            width: '25vw',

            '@media (max-width: 785px)': {
              padding: 10,
            },
            '@media (max-width: 460px)': {
              padding: 5,
            },
          },
          '&.transfer-path': {
            width: '100%',
            borderTop: `1px solid ${colors.black}`,
            padding: 0,
            borderRadius: 0,
          },
          '&.elem-transfer-path': {
            width: '100%',
            height: '3px',
            padding: 0,
            backgroundColor: colors.black,
            borderRadius: 0,
            cursor: CursorType.Pointer,
          },
          '&.path-transfers-stack': {
            borderTop: `1px solid ${colors.black}`,
            justifyContent: 'space-between',
            gap: '15%',

            '@media (max-width: 785px)': {
              gap: '10%',
            },
          },
          '&.plane-icon-stack': {
            padding: 0,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
          },
          '&.users-stack': {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            width: '100%',
            padding: '20px 0',
            gap: 20,
          },
          '&.auth-stack': {
            flexDirection: 'column',
            borderRadius: 24,
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            padding: '30px 10px 100px',
            width: '25vw',
            minHeight: '45vh',
          },
          '&.users-search-stack': {
            display: 'flex',
            gap: 10,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: colors.grey,
            padding: '40px 0px',
          },
          '&.tickets-search-stack': {
            display: 'flex',
            gap: 10,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.grey,
            padding: '40px 0px',
          },
          '&.user-edit-stack': {
            display: 'flex',
            gap: 16,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: colors.grey,
            padding: 20,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          '&.flight-card': {
            backgroundColor: colors.white,
          },
          '&.user-card': {
            backgroundColor: colors.whitesmoke,
            width: '35%',
            '@media (max-width: 1100px)': {
              width: '60%',
            },
          },
          '&.ticket-card': {
            backgroundColor: colors.whitesmoke,
            width: '35%',
            '@media (max-width: 1100px)': {
              width: '60%',
            },
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 10,
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          '&.MuiCardActions-root': {
            padding: '0px 10px 10px',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          padding: 0,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: colors.lightGrey,
          // maxWidth: 'false',
          // minHeight: '100vh',
          // minWidth: '100%',
          // justifyContent: 'center',
          padding: 0,

          '.auth': {
            display: 'flex',
            minHeight: '100vh',
            minWidth: '100%',
            justifyContent: 'center',
            padding: 0,
            alignItems: 'center',
          },

          '@media (min-width: 1200px)': {
            maxWidth: '100%',
          },
          '@media (min-width: 600px)': {
            padding: 0,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          minWidth: '20%',
          '& .MuiSelect-select': {
            padding: '4px 8px',
          },
          '@media (max-width: 1000px)': {},
          '@media (max-width: 460px)': {},
          '@media (max-width: 360px)': {},
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {},
      },
    },
  },
});
