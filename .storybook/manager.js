import { addons } from '@storybook/addons'
import { themes } from '@storybook/theming'
import logo from '../public/images/inctagram-logo.png'

addons.setConfig({
  theme: {
    ...themes.light,
    brandTitle: 'INCTAGRAM',
    brandUrl: 'https://inctagram-woad.vercel.app',
    brandImage: logo,
    brandTarget: '_blank',
    colorPrimary: '#0048ff',
  },
})
