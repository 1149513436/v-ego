<template>
    <div id="main"> 
    </div>
</template>
 
<script>
import E from 'wangeditor'
// const toolbar=DomEditor.getToolbar(this.editor)
export default {
    data() {
        return {
            editor: ''
        }
    },
    components: {},
    mounted() {
        this.editor = new E('#main')
        // 配置 onchange 回调函数
        this.editor.config.onchange =  newHtml=> {
           // console.log("change 之后最新的 html", newHtml);
            this.$emit('sendEditor',newHtml)
        };
        //取消自动获取焦点
        this.editor.config.focus=false
       this.editor.config.zIndex = 500
        // 配置触发 onchange 的时间频率，默认为 200ms
        this.editor.config.onchangeTimeout = 500; // 修改为 500ms
        this.editor.config.menus = ['key', 'head', 'link', 'italic', 'underline']
        this.editor.create()
       // console.log('@', this.editor)
       // console.log(this.editor.config.menus)
    }
}
</script>
 
<style>
</style>