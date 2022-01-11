<template>
  <div class="pref-keybindings">
    <h4>{{$t('preferences.keyBindings._title')}}</h4>
    <div class="keybinding-info">
      <span>
        {{$t('preferences.keyBindings.word1')}}<code>keybindings.json</code>{{$t('preferences.keyBindings.word2')}}
        <span class="link" @click="openKeybindingsDocumentation">{{$t('preferences.keyBindings.word3')}}</span>
        {{$t('preferences.keyBindings.word4')}}
      </span>

      <separator></separator>
      <el-button size="medium" @click="openKeybindingsFile">{{$t('preferences.keyBindings.openKeyBindingFile')}}</el-button>
    </div>
  </div>
</template>

<script>
import { ipcRenderer, shell } from 'electron'
import Compound from '../common/compound'
import Separator from '../common/separator'

export default {
  components: {
    Compound,
    Separator
  },
  data () {
    return {}
  },
  methods: {
    openKeybindingsDocumentation () {
      shell.openExternal('https://github.com/marktext/marktext/blob/master/docs/KEYBINDINGS.md')
    },
    openKeybindingsFile () {
      ipcRenderer.send('mt::open-keybindings-config')
    }
  }
}
</script>

<style scoped>
.pref-keybindings {
  & .keybinding-info {
    font-size: 14px;
    margin: 20px 0;
    color: var(--editorColor);
  }
  & .link {
    color: var(--themeColor);
    cursor: pointer;
  }
  & button.el-button {
    font-size: 13px;
  }
}
</style>
