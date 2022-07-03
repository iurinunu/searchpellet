import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    // brand: {
    //   100: "#f7fafc",
    //   // ...
    //   900: "#1a202c",
    // },
    primary: '#0070f3',
    containerPrimary: 'rgb(205, 214, 228)',
    errorDefault: 'rgb(227, 121, 121)'
  },
  fonts: {
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700
  },
  components: {
    Link: {
        baseStyle: {
            _focus: {
                boxShadow: 'none'
            }
        }
    }
}

})

export default theme;