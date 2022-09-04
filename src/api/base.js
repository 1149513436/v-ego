

const base={
    goodsList:'/api/api/projectList' ,//商品列表
    search:'/api/api/search' ,  //商品搜索
    selectCategory :'/api/api/backend/itemCategory/selectItemCategoryByParentId', //类目选择
    uploadUrl:'/api/api/upload' ,//图片上传 post 请求
    addGoods:'api/api/backend/item/insertTbItem',// 添加商品
    deleteGoods:'api/api/backend/item/deleteItemById', //删除商品
    updateGoods:'/api/api//backend/item/updateTbItem',//编辑商品
    getLogin:'/api/api/login',//登录接口
    statistical:'/api/api/statistical',
    sellTotal:'/api/api/sellTotal',
    params:'/api/api/backend/itemParam/selectItemParamAll',//规格包装
    searchParams:'/api/api/params/search',//搜索规格参数
    addPramas:'/api/api/backend/itemParam/insertItemParam',//添加规格参数
}


export default base;