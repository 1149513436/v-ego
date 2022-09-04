<!-- 属性load加载时自动执行
    :props="props"配置选项，是一个对象，里面有
    lable:指定结点标签为结点对象的属性值，可以配合数据的参数，和table里面的prop一个用法
    children  指定子树为节点对象的某个属性值
    isLeaf 指定是否为叶子结点，仅在lazy属性下有效

    ：load='loadNode'
        加载子树数据的方法，仅当lazy属性为TRUE是生效4自动执行函数--异步请求数据
        lazy
        是否懒加载子节点，需要与load配合使用
        show-checkbox 结点是否能够被选择
    accordion:每次打开只展开一个节点
 -->

<template>

    <el-tree
    :props="props"
    :load="loadNode" 
    accordion  
    @node-click="nodeClick"
    lazy>
</el-tree>

</template>

<script>
  export default {
    data() {
      return {
        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
      };
    },
    methods: {
       /* 点击tree获取数据，就是回调函数，有三个参数 */
      nodeClick(data){
           // console.log(data,node)
            this.$emit('sendTreeData',data)
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
            //进入页面默认请求第一层tree
            this.$api.getSelectCategory()
            .then(res=>{
              console.log(res.data.result)
              return resolve(res.data.result);
            })
          
        }
        if (node.level >= 1) {
            //请求当前点击的tree
            this.$api.getSelectCategory({
                id:node.data.cid 
            })
            .then(res=>{
                if(res.data.status===200){
                    return resolve(res.data.result);
                }else{
                    return resolve([])
                }
              
            })
            
        }
            
      },
     
    }
  };
</script>