import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Element from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import chinese from './chinese'
import English from './English'
Vue.use(VueI18n)


const messages={
    en:{
       ...English,
        ...enLocale
    },
    zh:{
       ...chinese,
        ...zhLocale
    }
}

const i18n =new VueI18n({
    locale:'zh',
    messages, //语言环境
})

//兼容写法
Vue.use(Element,{
    i18n:(key,value)=>i18n.t(key,value)
})

//导出
export default i18n

