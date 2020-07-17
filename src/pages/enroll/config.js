// 表单配置

/*
（选手姓名， 
性别， 
作品标题， 
作品简介， 
联系方式， 
参赛作品（图片或视频， 根据后台规则决定是图片还是视频）
*/

const form = {
  list: [
    {
      // 渲染组件
      el: 'van-field',
      // 组件类型 只有当组件是输入框时  才有该值  其它组件则为空
      type: 'text',
      // 表单标识符
      name: 'name',
      // 
      label: '姓名',
      placeholder: '请填写姓名',
      // 绑定的对象属性
      vModel: {name: ''},
      // 校验规则
      rules: [
        { required: true, message: '请填写姓名' }
      ]
    },
    {
      // 渲染组件
      el: 'van-radio-group',
      // 排列方向
      direction: 'horizontal',
      label: '性别',
      radios: [
        // 表单标识符 radio时 此值为每一个radio的value
        {name: 1, label: '男', disabled: false, shape: 'round'},
        {name: 0, label: '女', disabled: false, shape: 'round'},
      ],

      // 绑定的对象属性
      vModel: {'sex': 1},
      // 校验规则
      rules: [
        
      ]
    },

    {
      // 渲染组件
      el: 'van-field',
      type: 'text',
      // 表单标识符
      name: 'title',
      // 
      label: '作品名称',
      placeholder: '请填写作品名称',
      // 绑定的对象属性
      vModel: {'title': ''},
      // 校验规则
      rules: [
        { required: true, message: '请填写作品名称' }
      ]
    },

    {
      // 渲染组件
      el: 'van-field',
      type: 'textarea',
      // 表单标识符
      name: 'sub',
      // 
      label: '作品简介',
      placeholder: '请填写作品简介',
      // 绑定的对象属性
      vModel: {'sub': ''},
      // 校验规则
      // rules: [
      //   { required: true, message: '请填写作品简介' }
      // ]
    },
    
    {
      // 渲染组件
      el: 'van-field',
      type: 'tel',
      // 表单标识符
      name: 'phone',
      // 
      label: '联系方式',
      placeholder: '请填写联系方式',
      // 绑定的对象属性
      vModel: {'phone': ''},
      // 校验规则
      rules: [
        { required: true, message: '请填写联系方式' }
      ]
    },

    {
      hidden: true,
      // 渲染组件
      el: 'van-uploader',
      type: 'image',
      // 表单标识符
      name: 'video_img',
      errMsg: '请上传正确的格式',
      // 
      label: '视频封面',
      // 绑定的对象属性
      vModel: {'video_img': null},
      multiple: true,
      maxCount: 1,
      maxSize: "5 * 1024 * 1024"
    },

    {
      // 渲染组件
      el: 'van-uploader',
      type: 'image',
      // 表单标识符
      name: 'file',
      errMsg: '请上传正确的格式',
      // 
      label: '作品上传',
      // 绑定的对象属性
      vModel: {'file': null},
      multiple: true,
      maxCount: 1,
      maxSize: "10 * 1024 * 1024"
    },
  ]
}


export default form