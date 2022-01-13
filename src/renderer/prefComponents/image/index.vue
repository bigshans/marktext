<template>
  <div class="pref-image">
    <h4>{{ $t('preferences.image._title') }}</h4>
    <section class="image-ctrl">
      <div>{{ $t('preferences.image.imageInsertAction._title') }}
        <el-tooltip class='item' effect='dark' :content="$t('preferences.image.imageInsertAction._notice')" placement='top-start'>
          <i class="el-icon-info"></i>
        </el-tooltip>
      </div>
      <el-radio-group v-model="imageInsertAction">
        <el-radio label="upload">{{ $t('preferences.image.imageInsertAction.upload') }}</el-radio>
        <el-radio label="folder">{{ $t('preferences.image.imageInsertAction.folder') }}</el-radio>
        <el-radio label="path">{{ $t('preferences.image.imageInsertAction.path') }}</el-radio>
      </el-radio-group>
    </section>
    <separator></separator>
    <section class="image-folder">
      <text-box
        :description="$t('preferences.image.localImageFolderAction._title')"
        :input="imageFolderPath"
        :regexValidator="/^(?:$|([a-zA-Z]:)?[\/\\].*$)/"
        :defaultValue="folderPathPlaceholder"
        :onChange="value => modifyImageFolderPath(value)"
      ></text-box>
      <div>
        <el-button size="mini" @click="modifyImageFolderPath()">{{ $t('preferences.image.localImageFolderAction.modify') }}</el-button>
        <el-button size="mini" @click="openImageFolder">{{ $t('preferences.image.localImageFolderAction.open') }}</el-button>
      </div>
    </section>

    <compound>
      <template #head>
        <bool
          :description="$t('preferences.image.imagePreferRelativeDirectory')"
          more="https://github.com/marktext/marktext/blob/develop/docs/IMAGES.md"
          :bool="imagePreferRelativeDirectory"
          :onChange="value => onSelectChange('imagePreferRelativeDirectory', value)"
        ></bool>
      </template>
      <template #children>
        <text-box
          :description="$t('preferences.image.imageRelativeDirectoryName')"
          :input="imageRelativeDirectoryName"
          :regexValidator="/^(?:$|(?![a-zA-Z]:)[^\/\\].*$)/"
          :defaultValue="relativeDirectoryNamePlaceholder"
          :onChange="value => onSelectChange('imageRelativeDirectoryName', value)"
        ></text-box>
      </template>
    </compound>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { shell } from 'electron'
import Bool from '../common/bool'
import Compound from '../common/compound'
import Separator from '../common/separator'
import TextBox from '../common/textBox'

export default {
  components: {
    Bool,
    Compound,
    Separator,
    TextBox
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      imageFolderPath: state => state.preferences.imageFolderPath,
      imagePreferRelativeDirectory: state => state.preferences.imagePreferRelativeDirectory,
      imageRelativeDirectoryName: state => state.preferences.imageRelativeDirectoryName
    }),
    imageInsertAction: {
      get: function () {
        return this.$store.state.preferences.imageInsertAction
      },
      set: function (value) {
        const type = 'imageInsertAction'
        this.$store.dispatch('SET_SINGLE_PREFERENCE', { type, value })
      }
    },
    folderPathPlaceholder: {
      get: function () {
        return this.$store.state.preferences.imageFolderPath || ''
      }
    },
    relativeDirectoryNamePlaceholder: {
      get: function () {
        return this.$store.state.preferences.imageRelativeDirectoryName || 'assets'
      }
    }
  },
  methods: {
    openImageFolder () {
      shell.openPath(this.imageFolderPath)
    },
    modifyImageFolderPath (value) {
      return this.$store.dispatch('SET_IMAGE_FOLDER_PATH', value)
    },
    onSelectChange (type, value) {
      this.$store.dispatch('SET_SINGLE_PREFERENCE', { type, value })
    }
  }
}
</script>

<style>
.pref-image {
  & .image-ctrl {
    font-size: 14px;
    margin: 20px 0;
    color: var(--editorColor);
    & label {
      display: block;
      margin: 20px 0;
    }
  }
}
</style>
