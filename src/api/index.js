
/**
 *请求的方法,这些都是直接return 结果的
 */
import axios from "axios";
import base from './base'
//node.js中的
// const qs=require('querystring')

 const api={

    /* 登录接口 */
    login(params){
        return axios.post(base.getLogin,params)
    },

    /**
     * 商品列表
     */
    getGoodsList(params){
        return axios.get(base.goodsList,{
            params
        })
    },
    // 搜索商品的数据
    getSearch(params){ 
        return axios.get(base.search,{params})
    },
    //类目选择
    getSelectCategory(params ){
        return axios.get(base.selectCategory,{params})
    },

    /* 添加商品
     */
    addGoods(params){ //params是一个对象
        return axios.get(base.addGoods,{
            params
        })
    },
/* 
 删除商品 id
 */
 deleteGoods(params){
    return axios.get(base.deleteGoods,{params})
},
/* 
编辑商品 比更新商品多了一个id
 */
updateGoods(params){
    return axios.get(base.updateGoods,{params})
},

/**
    * 统计数据
    */
 getStatistical() {
    return axios.get(base.statistical)
},
/**
 * 销量对比
 */
getSellTotal() {
    return axios.get(base.sellTotal)
},

/* 
规格参数 */

getParams(params){
    return axios.get(base.params,{params})
},

/* 
搜索框搜索规格参数 */

searchParams(params){
    return axios.get(base.searchParams,{params})
},

//添加规格参数
addPramas(params){
    return axios.get(base.addPramas,{params})
},


 }
 
 export default api;