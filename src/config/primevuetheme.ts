import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

const preset = {
  semantic: {
    primary: {
      50: '{zinc.50}',
      100: '{zinc.100}',
      200: '{zinc.200}',
      300: '{zinc.300}',
      400: '{zinc.400}',
      500: '{zinc.500}',
      600: '{zinc.600}',
      700: '{zinc.700}',
      800: '{zinc.800}',
      900: '{zinc.900}',
      950: '{zinc.950}',
    },
  },
}

const Noir = definePreset(Aura, preset)
const themeConfig = {
  theme: {
    preset: Noir,
  },
}
export default themeConfig
