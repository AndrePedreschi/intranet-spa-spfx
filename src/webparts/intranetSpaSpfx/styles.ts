import { createGlobalStyle } from "styled-components";

export const GlobalFonts = createGlobalStyle`

/* @font-face {
    font-family: 'Poppins';
    src: url('./fonts/Poppins/Poppins-ThinItalic.eot');
    src: url('./fonts/Poppins/Poppins-ThinItalic.eot') format('embedded-opentype'),
        url('./fonts/Poppins/Poppins-ThinItalic.woff2') format('woff2'),
        url('./fonts/Poppins/Poppins-ThinItalic.woff') format('woff'),
        url('./fonts/Poppins/Poppins-ThinItalic.ttf') format('truetype'),
        url('./fonts/Poppins/Poppins-ThinItalic.svg#Poppins-ThinItalic') format('svg');
    font-weight: 100;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Poppins';
    src: url('./fonts/Poppins/Poppins-SemiBold.eot');
    src: url('./fonts/Poppins/Poppins-SemiBold.eot') format('embedded-opentype'),
        url('./fonts/Poppins/Poppins-SemiBold.woff2') format('woff2'),
        url('./fonts/Poppins/Poppins-SemiBold.woff') format('woff'),
        url('./fonts/Poppins/Poppins-SemiBold.ttf') format('truetype'),
        url('./fonts/Poppins/Poppins-SemiBold.svg#Poppins-SemiBold') format('svg');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Poppins';
    src: url('./fonts/Poppins/Poppins-SemiBoldItalic.eot');
    src: url('./fonts/Poppins/Poppins-SemiBoldItalic.eot') format('embedded-opentype'),
        url('./fonts/Poppins/Poppins-SemiBoldItalic.woff2') format('woff2'),
        url('./fonts/Poppins/Poppins-SemiBoldItalic.woff') format('woff'),
        url('./fonts/Poppins/Poppins-SemiBoldItalic.ttf') format('truetype'),
        url('./fonts/Poppins/Poppins-SemiBoldItalic.svg#Poppins-SemiBoldItalic') format('svg');
    font-weight: 600;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Poppins';
    src: url('./fonts/Poppins/Poppins-Black.eot');
    src: url('./fonts/Poppins/Poppins-Black.eot') format('embedded-opentype'),
        url('./fonts/Poppins/Poppins-Black.woff2') format('woff2'),
        url('./fonts/Poppins/Poppins-Black.woff') format('woff'),
        url('./fonts/Poppins/Poppins-Black.ttf') format('truetype'),
        url('./fonts/Poppins/Poppins-Black.svg#Poppins-Black') format('svg');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Poppins';
    src: url('./fonts/Poppins/Poppins-Thin.eot');
    src: url('./fonts/Poppins/Poppins-Thin.eot') format('embedded-opentype'),
        url('./fonts/Poppins/Poppins-Thin.woff2') format('woff2'),
        url('./fonts/Poppins/Poppins-Thin.woff') format('woff'),
        url('./fonts/Poppins/Poppins-Thin.ttf') format('truetype'),
        url('./fonts/Poppins/Poppins-Thin.svg#Poppins-Thin') format('svg');
    font-weight: 100;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Poppins';
    src: url('./fonts/Poppins/Poppins-BlackItalic.eot');
    src: url('./fonts/Poppins/Poppins-BlackItalic.eot') format('embedded-opentype'),
        url('./fonts/Poppins/Poppins-BlackItalic.woff2') format('woff2'),
        url('./fonts/Poppins/Poppins-BlackItalic.woff') format('woff'),
        url('./fonts/Poppins/Poppins-BlackItalic.ttf') format('truetype'),
        url('./fonts/Poppins/Poppins-BlackItalic.svg#Poppins-BlackItalic') format('svg');
    font-weight: 900;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Poppins';
    src: url('./fonts/Poppins/Poppins-ExtraLight.eot');
    src: url('./fonts/Poppins/Poppins-ExtraLight.eot') format('embedded-opentype'),
        url('./fonts/Poppins/Poppins-ExtraLight.woff2') format('woff2'),
        url('./fonts/Poppins/Poppins-ExtraLight.woff') format('woff'),
        url('./fonts/Poppins/Poppins-ExtraLight.ttf') format('truetype'),
        url('./fonts/Poppins/Poppins-ExtraLight.svg#Poppins-ExtraLight') format('svg');
    font-weight: 200;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Poppins';
    src: url('./fonts/Poppins/Poppins-ExtraBold.eot');
    src: url('./fonts/Poppins/Poppins-ExtraBold.eot') format('embedded-opentype'),
        url('./fonts/Poppins/Poppins-ExtraBold.woff2') format('woff2'),
        url('./fonts/Poppins/Poppins-ExtraBold.woff') format('woff'),
        url('./fonts/Poppins/Poppins-ExtraBold.ttf') format('truetype'),
        url('./fonts/Poppins/Poppins-ExtraBold.svg#Poppins-ExtraBold') format('svg');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Poppins';
    src: url('./fonts/Poppins/Poppins-ExtraBoldItalic.eot');
    src: url('./fonts/Poppins/Poppins-ExtraBoldItalic.eot') format('embedded-opentype'),
        url('./fonts/Poppins/Poppins-ExtraBoldItalic.woff2') format('woff2'),
        url('./fonts/Poppins/Poppins-ExtraBoldItalic.woff') format('woff'),
        url('./fonts/Poppins/Poppins-ExtraBoldItalic.ttf') format('truetype'),
        url('./fonts/Poppins/Poppins-ExtraBoldItalic.svg#Poppins-ExtraBoldItalic') format('svg');
    font-weight: bold;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Poppins';
    src: url('./fonts/Poppins/Poppins-BoldItalic.eot');
    src: url('./fonts/Poppins/Poppins-BoldItalic.eot') format('embedded-opentype'),
        url('./fonts/Poppins/Poppins-BoldItalic.woff2') format('woff2'),
        url('./fonts/Poppins/Poppins-BoldItalic.woff') format('woff'),
        url('./fonts/Poppins/Poppins-BoldItalic.ttf') format('truetype'),
        url('./fonts/Poppins/Poppins-BoldItalic.svg#Poppins-BoldItalic') format('svg');
    font-weight: bold;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Poppins';
    src: url('./fonts/Poppins/Poppins-Bold.eot');
    src: url('./fonts/Poppins/Poppins-Bold.eot') format('embedded-opentype'),
        url('./fonts/Poppins/Poppins-Bold.woff2') format('woff2'),
        url('./fonts/Poppins/Poppins-Bold.woff') format('woff'),
        url('./fonts/Poppins/Poppins-Bold.ttf') format('truetype'),
        url('./fonts/Poppins/Poppins-Bold.svg#Poppins-Bold') format('svg');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Poppins';
    src: url('./fonts/Poppins/Poppins-ExtraLightItalic.eot');
    src: url('./fonts/Poppins/Poppins-ExtraLightItalic.eot') format('embedded-opentype'),
        url('./fonts/Poppins/Poppins-ExtraLightItalic.woff2') format('woff2'),
        url('./fonts/Poppins/Poppins-ExtraLightItalic.woff') format('woff'),
        url('./fonts/Poppins/Poppins-ExtraLightItalic.ttf') format('truetype'),
        url('./fonts/Poppins/Poppins-ExtraLightItalic.svg#Poppins-ExtraLightItalic') format('svg');
    font-weight: 200;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Poppins';
    src: url('./fonts/Poppins/Poppins-LightItalic.eot');
    src: url('./fonts/Poppins/Poppins-LightItalic.eot') format('embedded-opentype'),
        url('./fonts/Poppins/Poppins-LightItalic.woff2') format('woff2'),
        url('./fonts/Poppins/Poppins-LightItalic.woff') format('woff'),
        url('./fonts/Poppins/Poppins-LightItalic.ttf') format('truetype'),
        url('./fonts/Poppins/Poppins-LightItalic.svg#Poppins-LightItalic') format('svg');
    font-weight: 300;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Poppins';
    src: url('./fonts/Poppins/Poppins-Light.eot');
    src: url('./fonts/Poppins/Poppins-Light.eot') format('embedded-opentype'),
        url('./fonts/Poppins/Poppins-Light.woff2') format('woff2'),
        url('./fonts/Poppins/Poppins-Light.woff') format('woff'),
        url('./fonts/Poppins/Poppins-Light.ttf') format('truetype'),
        url('./fonts/Poppins/Poppins-Light.svg#Poppins-Light') format('svg');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Poppins';
    src: url('./fonts/Poppins/Poppins-Italic.eot');
    src: url('./fonts/Poppins/Poppins-Italic.eot') format('embedded-opentype'),
        url('./fonts/Poppins/Poppins-Italic.woff2') format('woff2'),
        url('./fonts/Poppins/Poppins-Italic.woff') format('woff'),
        url('./fonts/Poppins/Poppins-Italic.ttf') format('truetype'),
        url('./fonts/Poppins/Poppins-Italic.svg#Poppins-Italic') format('svg');
    font-weight: normal;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Poppins';
    src: url('./fonts/Poppins/Poppins-MediumItalic.eot');
    src: url('./fonts/Poppins/Poppins-MediumItalic.eot') format('embedded-opentype'),
        url('./fonts/Poppins/Poppins-MediumItalic.woff2') format('woff2'),
        url('./fonts/Poppins/Poppins-MediumItalic.woff') format('woff'),
        url('./fonts/Poppins/Poppins-MediumItalic.ttf') format('truetype'),
        url('./fonts/Poppins/Poppins-MediumItalic.svg#Poppins-MediumItalic') format('svg');
    font-weight: 500;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Poppins';
    src: url('./fonts/Poppins/Poppins-Medium.eot');
    src: url('./fonts/Poppins/Poppins-Medium.eot') format('embedded-opentype'),
        url('./fonts/Poppins/Poppins-Medium.woff2') format('woff2'),
        url('./fonts/Poppins/Poppins-Medium.woff') format('woff'),
        url('./fonts/Poppins/Poppins-Medium.ttf') format('truetype'),
        url('./fonts/Poppins/Poppins-Medium.svg#Poppins-Medium') format('svg');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Poppins';
    src: url('./fonts/Poppins/Poppins-Regular.eot');
    src: url('./fonts/Poppins/Poppins-Regular.eot') format('embedded-opentype'),
        url('./fonts/Poppins/Poppins-Regular.woff2') format('woff2'),
        url('./fonts/Poppins/Poppins-Regular.woff') format('woff'),
        url('./fonts/Poppins/Poppins-Regular.ttf') format('truetype'),
        url('./fonts/Poppins/Poppins-Regular.svg#Poppins-Regular') format('svg');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
} */

/* @font-face {
    font-family: 'Roboto';
    src: url('./fonts/Roboto/Roboto-Black.eot');
    src: url('./fonts/Roboto/Roboto-Black.eot') format('embedded-opentype'),
        url('./fonts/Roboto/Roboto-Black.woff2') format('woff2'),
        url('./fonts/Roboto/Roboto-Black.woff') format('woff'),
        url('./fonts/Roboto/Roboto-Black.ttf') format('truetype'),
        url('./fonts/Roboto/Roboto-Black.svg#Roboto-Black') format('svg');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Roboto';
    src: url('./fonts/Roboto/Roboto-Bold.eot');
    src: url('./fonts/Roboto/Roboto-Bold.eot') format('embedded-opentype'),
        url('./fonts/Roboto/Roboto-Bold.woff2') format('woff2'),
        url('./fonts/Roboto/Roboto-Bold.woff') format('woff'),
        url('./fonts/Roboto/Roboto-Bold.ttf') format('truetype'),
        url('./fonts/Roboto/Roboto-Bold.svg#Roboto-Bold') format('svg');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Roboto';
    src: url('./fonts/Roboto/Roboto-BlackItalic.eot');
    src: url('./fonts/Roboto/Roboto-BlackItalic.eot') format('embedded-opentype'),
        url('./fonts/Roboto/Roboto-BlackItalic.woff2') format('woff2'),
        url('./fonts/Roboto/Roboto-BlackItalic.woff') format('woff'),
        url('./fonts/Roboto/Roboto-BlackItalic.ttf') format('truetype'),
        url('./fonts/Roboto/Roboto-BlackItalic.svg#Roboto-BlackItalic') format('svg');
    font-weight: 900;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Roboto';
    src: url('./fonts/Roboto/Roboto-LightItalic.eot');
    src: url('./fonts/Roboto/Roboto-LightItalic.eot') format('embedded-opentype'),
        url('./fonts/Roboto/Roboto-LightItalic.woff2') format('woff2'),
        url('./fonts/Roboto/Roboto-LightItalic.woff') format('woff'),
        url('./fonts/Roboto/Roboto-LightItalic.ttf') format('truetype'),
        url('./fonts/Roboto/Roboto-LightItalic.svg#Roboto-LightItalic') format('svg');
    font-weight: 300;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Roboto';
    src: url('./fonts/Roboto/Roboto-Italic.eot');
    src: url('./fonts/Roboto/Roboto-Italic.eot') format('embedded-opentype'),
        url('./fonts/Roboto/Roboto-Italic.woff2') format('woff2'),
        url('./fonts/Roboto/Roboto-Italic.woff') format('woff'),
        url('./fonts/Roboto/Roboto-Italic.ttf') format('truetype'),
        url('./fonts/Roboto/Roboto-Italic.svg#Roboto-Italic') format('svg');
    font-weight: normal;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Roboto';
    src: url('./fonts/Roboto/Roboto-Light.eot');
    src: url('./fonts/Roboto/Roboto-Light.eot') format('embedded-opentype'),
        url('./fonts/Roboto/Roboto-Light.woff2') format('woff2'),
        url('./fonts/Roboto/Roboto-Light.woff') format('woff'),
        url('./fonts/Roboto/Roboto-Light.ttf') format('truetype'),
        url('./fonts/Roboto/Roboto-Light.svg#Roboto-Light') format('svg');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Roboto';
    src: url('./fonts/Roboto/Roboto-MediumItalic.eot');
    src: url('./fonts/Roboto/Roboto-MediumItalic.eot') format('embedded-opentype'),
        url('./fonts/Roboto/Roboto-MediumItalic.woff2') format('woff2'),
        url('./fonts/Roboto/Roboto-MediumItalic.woff') format('woff'),
        url('./fonts/Roboto/Roboto-MediumItalic.ttf') format('truetype'),
        url('./fonts/Roboto/Roboto-MediumItalic.svg#Roboto-MediumItalic') format('svg');
    font-weight: 500;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Roboto';
    src: url('./fonts/Roboto/Roboto-Regular.eot');
    src: url('./fonts/Roboto/Roboto-Regular.eot') format('embedded-opentype'),
        url('./fonts/Roboto/Roboto-Regular.woff2') format('woff2'),
        url('./fonts/Roboto/Roboto-Regular.woff') format('woff'),
        url('./fonts/Roboto/Roboto-Regular.ttf') format('truetype'),
        url('./fonts/Roboto/Roboto-Regular.svg#Roboto-Regular') format('svg');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Roboto';
    src: url('./fonts/Roboto/Roboto-ThinItalic.eot');
    src: url('./fonts/Roboto/Roboto-ThinItalic.eot') format('embedded-opentype'),
        url('./fonts/Roboto/Roboto-ThinItalic.woff2') format('woff2'),
        url('./fonts/Roboto/Roboto-ThinItalic.woff') format('woff'),
        url('./fonts/Roboto/Roboto-ThinItalic.ttf') format('truetype'),
        url('./fonts/Roboto/Roboto-ThinItalic.svg#Roboto-ThinItalic') format('svg');
    font-weight: 100;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Roboto';
    src: url('./fonts/Roboto/Roboto-Thin.eot');
    src: url('./fonts/Roboto/Roboto-Thin.eot') format('embedded-opentype'),
        url('./fonts/Roboto/Roboto-Thin.woff2') format('woff2'),
        url('./fonts/Roboto/Roboto-Thin.woff') format('woff'),
        url('./fonts/Roboto/Roboto-Thin.ttf') format('truetype'),
        url('./fonts/Roboto/Roboto-Thin.svg#Roboto-Thin') format('svg');
    font-weight: 100;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Roboto';
    src: url('./fonts/Roboto/Roboto-BoldItalic.eot');
    src: url('./fonts/Roboto/Roboto-BoldItalic.eot') format('embedded-opentype'),
        url('./fonts/Roboto/Roboto-BoldItalic.woff2') format('woff2'),
        url('./fonts/Roboto/Roboto-BoldItalic.woff') format('woff'),
        url('./fonts/Roboto/Roboto-BoldItalic.ttf') format('truetype'),
        url('./fonts/Roboto/Roboto-BoldItalic.svg#Roboto-BoldItalic') format('svg');
    font-weight: bold;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Roboto';
    src: url('./fonts/Roboto/Roboto-Medium.eot');
    src: url('./fonts/Roboto/Roboto-Medium.eot') format('embedded-opentype'),
        url('./fonts/Roboto/Roboto-Medium.woff2') format('woff2'),
        url('./fonts/Roboto/Roboto-Medium.woff') format('woff'),
        url('./fonts/Roboto/Roboto-Medium.ttf') format('truetype'),
        url('./fonts/Roboto/Roboto-Medium.svg#Roboto-Medium') format('svg');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
} */

`;
