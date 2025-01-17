import i18n from '../../i18n'

export const themes = [
  {
    name: 'light'
  },
  {
    name: 'dark'
  },
  {
    name: 'graphite'
  },
  {
    name: 'material-dark'
  },
  {
    name: 'ulysses'
  },
  {
    name: 'one-dark'
  }
]

export const autoSwitchThemeOptions = () => {
  return [{
    label: i18n.t('preferences.theme.autoSwitchTheme.atStartup'), // Always
    value: 0
  }, /* {
    label: i18n.t('preferences.theme.autoSwitchTheme.onlyAtRuntime'),
    value: 1
  }, */ {
    label: i18n.t('preferences.theme.autoSwitchTheme.never'),
    value: 2
  }]
}
