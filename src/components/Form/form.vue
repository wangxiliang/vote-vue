<template>
  <div>
    <van-form @submit="onSubmit">
      <template v-for="form in formList" >
        <template v-if="form.el == 'van-field' && !form.hidden">
          <van-field
            :key="form.modelName"
            v-model="formData[form.modelName]"
            :name="form.name"
            :label="form.label"
            :type="form.type"
            :placeholder="form.placeholder"
            :rules="form.rules"
          ></van-field>
        </template>

        <template v-if="form.el == 'van-radio-group' && !form.hidden">
          <van-field :key="form.modelName" :name="form.modelName" :label="form.label">
            <template #input>
              <van-radio-group :direction="form.direction" v-model="formData[form.modelName]">
                <van-radio 
                v-for="radio in form.radios" 
                :key="radio.name" 
                :name="radio.name">{{radio.label}}</van-radio>
                
              </van-radio-group>
            </template>
          </van-field>
         
        </template>

        <template v-if="form.el == 'van-uploader' && !form.hidden">
          <van-field :key="form.modelName" 
          :name="form.modelName" 
          :label="form.label"
          @click-right-icon="handleClickInfoIcon(form)"
          extra="视频格式支持只支持mp4">
            <template #input>
              <van-uploader
                :accept="form.type + '/*'"
                v-model="fileList[form.name]"
                :multiple="form.multiple"
                :max-count="form.maxCount"
                :max-size="form.maxSize"
                @oversize="onOversize"
                :before-read="beforeRead.bind(this, form.type)"
              />

              <van-button 
              v-if="form.type == 'video'" size="small" 
              native-type="button"
              @click="handleClickPlayVideo"  
              type="info">预览视频</van-button>
              
            </template>

            <template #right-icon>
              <van-icon name="info-o" size="1.3rem" color="red"/>
            </template>
          </van-field>
        </template>

      </template>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>

    <van-dialog v-model="show" :show-cancel-button="false">
      <div style="padding: 10px">
        <video :src="videoSrc" controls="controls" width="100%" height="300"></video>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'Form',
  props: {
    forms: {
      type: Array,
      default: () => ([]),
      required: true
    }
  },

  data() {
    return {
      formData: {

      },
      formList: [],
      
      fileList: {
        video_img: [],
        file: [],
      },
      videoSrc: '',
      show: false,
      // 上传提示
      upInfo: {
        video_img: {
          image: {
            maxSize: '视频封面大小限制在',
            image: '封面格式支持：jpg、png、gif'
          }
          
        },
        file: {
          image: {
            maxSize: '图片大小限制在',
            image: '图片格式支持：jpg、png、gif'
          },
          video: {
            maxSize: '视频大小限制在',
            video: '视频格式请上传mp4格式'
          }
        },
      }
    }
  },
  mounted() {
    let formData = {

    }

    let formList = []
    let toast = this.UTtoastLoading()
    this.forms.forEach(item => {
      let key = Object.keys(item.vModel)
      let o = item
      o.modelName = key[0]
      formList.push(o)

      let keyy = key[0]
      formData[keyy] = item.vModel[keyy]
      // if(item.el == 'van-uploader') this.fileList[item.name] = []
    })

    
    this.formList = formList
    this.formData = formData
    this.$nextTick(() => {
      setTimeout(() => {
        this.UTtoastClose(toast)
      }, 1500)
    })
    
  },
  methods: {
    handleClickPlayVideo() {
      if(!this.videoSrc){
        this.$toast('请先选择视频文件')
        return
      } 
      this.show = true
    },
    onSubmit(e) {

      this.$emit('handleSubmit', e)
    },

    // 点击右侧图标
    handleClickInfoIcon(e) {
      console.log('触发', e);
      let type = e.type
      let name = e.name
      let size = parseInt(e.maxSize)

      let message = `
        ${this.upInfo[name][type].maxSize}${size}M内，
        ${this.upInfo[name][type][type]}
      `
      this.$dialog.alert({
        title: '提示',
        message
      })
    },

    // 文件超出大小
    onOversize(file) {
      this.$emit('handleFileOversize', file)
    },

    // 上传前处理
    beforeRead(vali, file) {
      console.log(file);
      let type = file.type.split('/')[0]
      let msg = {
        'image': '图片',
        'video': '视频'
      }
      console.log(type, vali);
      
      if (type !== vali) {
        this.UTtoastFail(`请上传正确的${msg[vali]}格式`)
        return false;
      }

      if(type == 'video') {
        var fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        let that = this
        fileReader.onload = function (e) {
          that.videoSrc = e.currentTarget.result
        }
      }
      
      return true;
    },
  },
}
</script>

<style>

</style>