import { createMuiTheme } from '@material-ui/core/styles';
// import 'typeface-source-sans-pro';

const theme = createMuiTheme({

    palette: {
        primary: {
            main: '#5A37FD',
            light: '#f0f0fc'
        },
        secondary: {
            main: '#13246D'
        },
        success: {
            main: '#009484'
        },
        neutral: {
            main: '#13246D'
        }
    },
    typography: {
        fontFamily: [
            '"Source Sans Pro"',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        button: {
            textTransform: 'none',
            fontWeight: 'bold'
        },
        h1: {
            color: '#5A37FD',
            fontWeight: 'bold',
            fontSize: '1.7rem',
        },
        h2: {
            color: '#5A37FD',
            fontWeight: 'bold',
            fontSize: '1.3rem',
        },
        h5: {
            fontWeight: 'bold',
            fontSize: '1.1rem',
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 'bold'
        },
        body2: {
            fontSize: '0.9rem'
        }
    },
    overrides: {
        MuiCssBaseline: {
            "@global": {
                body: {
                    backgroundImage: 'url(http://careersforyou.com.au/images/texture.png)',
                    backgroundRepeat: 'repeat',
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                    height: '100%',
                }
            }
        },
        MuiToolbar: {
            root: {
                height: 70
            }
        },
        MuiTypography: {
            root: {
                whiteSpace: 'pre-line' // in-case content has a \n character
            },

        },
        MuiButton: {
            contained: {
                boxShadow: 0,
                paddingTop: 10,
                paddingBottom: 10,
                // fontSize: '1rem'
            },
            outlined: {
                boxShadow: 0,
                paddingTop: 10,
                paddingBottom: 10,
                // fontSize: '1rem'
            }
        },
        MuiOutlinedInput: {
            root: {
                boxShadow: '8px 8px 0px 0px rgba(0, 0, 0, 0.05)',
                background: '#fff'
            }
        },
        MuiSelect: {
            root: {
                boxShadow: '8px 8px 0px 0px rgba(0, 0, 0, 0.05)',
                background: '#fff',
                width: '100%'
            }
        },
        MuiStepLabel: {
            label: {
                fontSize: '1.1rem'
            }
        }
    }
});

theme.shadows[1] = '8px 8px 0px 0px rgba(0, 0, 0, 0.05)';  // elevation = 4
theme.shadows[4] = '8px 8px 0px 0px rgba(0, 0, 0, 0.05)';  // elevation = 4

export default theme;
