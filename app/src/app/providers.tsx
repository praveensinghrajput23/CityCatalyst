"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { Open_Sans, Poppins } from "next/font/google";
const poppins = Poppins({ weight: "500", subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

export const theme = extendTheme({
  colors: {
    brand: "#2351DC",
    tertiary: "#7A7B9A",
    borderOverlay: "#E6E7FF",
    contentSecondary: "#232640",
    interactiveSecondary: "#F17105",
    interactiveTertiary: "#24BE00",
    backgroundNeutral: "#E8EAFB",
    brandScheme: {
      100: "#C5CBF5",
      500: "#2351DC",
    },
  },
  fonts: {
    heading: "var(--font-poppins)",
    body: "var(--font-opensans)",
  },
  components: {
    Button: {
      baseStyle: {
        textTransform: "uppercase",
        borderRadius: 50,
      },
      variants: {
        outline: {
          border: "2px solid",
          borderColor: "#2351DC",
          color: "#2351DC",
          _hover: {
            transform: "scale(0.98)",
            borderColor: "#5a7be0",
            color: "#5a7be0",
          },
          _active: {
            borderColor: "#899ee0",
            color: "#899ee0",
          },
          _loading: {
            opacity: 0.8,
          },
        },
        solid: {
          bg: "#2351DC",
          color: "white",
          _hover: {
            transform: "scale(0.98)",
            bg: "#5a7be0",
          },
          _active: {
            bg: "#899ee0",
          },
          _loading: {
            opacity: 0.8,
            _hover: {
              bg: "#5a7be0",
            },
          },
        },
        ghost: {
          color: "#5a7be0",
        },
      },
    },
    Link: {
      baseStyle: {
        color: "#2351DC",
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 8,
        },
      },
    },
    Tag: {
      variants: {
        brand: {
          container: {
            px: 3,
            py: 1,
            borderRadius: "full",
            borderColor: "backgroundNeutral",
            borderWidth: 1,
            color: "backgroundNeutral",
          },
          label: {
            color: "contentSecondary",
            fontSize: "14",
            borderWidth: 0,
            mt: -0.5,
          },
        },
      },
      defaultProps: {
        variant: "brand",
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-poppins: ${poppins.style.fontFamily};
            --font-opensans: ${openSans.style.fontFamily};
          }
        `}
      </style>
      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </>
  );
}
