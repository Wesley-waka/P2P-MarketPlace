/** @type {import('tailwindcss').Config} */
export const content = [
  "./components/**/*.{js,vue,ts}",
  "./layouts/**/*.vue",
  "./pages/**/*.vue",
  "./plugins/**/*.{js,ts}",
  "./app.vue",
  "./error.vue",
];
export const theme = {
  extend: {
    fontFamily: {
      manropeBold: ['Manrope-Bold'],
      manropeRegular: ['Manrope-Regular'],
      manropeMedium: ['Manrope-Medium'],
      manropeSemiBold: ['Manrope-SemiBold'],
      manropeExtraBold: ['Manrope-ExtraBold'],
      manropeExtraLight: ['Manrope-ExtraLight'],
      manropeLight: ['Manrope-Light'],
      merriWeather: ['Merriweather-Regular'],
      merriWeatherBold: ['Merriweather-Bold'],
      merriWeatherLight: ['Merriweather-Light'],
      merriWeatherItalic: ['Merriweather-Italic'],
      merriWeatherBoldItalic: ['Merriweather-BoldItalic'],
      merriWeatherLightItalic: ['Merriweather-LightItalic'],
      merriWeatherBlack: ['Merriweather-Black'],
      merriWeatherBlackItalic: ['Merriweather-BlackItalic'],
      merriWeatherRegular: ['Merriweather-Regular'],
      avenirBlack: ['AvenirLTStd-Black'],
      avenirBook: ['AvenirLTStd-Book'],
      avenirRoman: ['AvenirLTStd-Roman'],


    },
    colors: {
      'orangeBright': '#ff461e',
      'orangeTint': '#ff623e',
      'plumBright': '#2f1c54',
      'plumTint': '#4a3970',
      'hibiBright': '#f8285f',
      'hibiTint': '#fa4a78',

      // Add more custom colors here
    },
  }
};
