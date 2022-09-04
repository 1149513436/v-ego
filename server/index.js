const express=require('express')
const app=express()
// post 请求表单数据
app.use(express.urlencoded({extended:true}))
const bodyparser =require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))
//使用静态文件托管拿到本项目下upload下的文件
app.use(express.static('upload'))
const router=require('./router')
app.use('/api',router)
app.listen(8989,()=>{
    console.log('8989启动成功')
})