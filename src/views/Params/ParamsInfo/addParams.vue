<template>
  <div class="">
    <el-dialog title="添加规格参数" :visible=dialogable ref="ruleForm" width="70%">
      <TreeGoods @sendTreeData='sendTreeData' />
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog" type="primary" size="normal">取消</el-button>
        <el-button type="primary" @click="innerVisible = true" size="normal" :disabled="isdisable">确定</el-button>
      </span>
      <!-- 内弹框 -->
      <el-dialog width="50%" title="商品规格参数配置" :visible.sync="innerVisible" append-to-body>
        <div style="margin-bottom:10px;">当前选中的是：{{ this.treeData.name }}</div>

        <el-button type="primary" @click="addDomain">新增规格列表</el-button>
        <hr>
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">

          <el-form-item v-for=" (item, index) in dynamicValidateForm.groups" :label=item.title :key="index"
            :prop="item.title" :rules="{
              required: true, message: '域名不能为空', trigger: 'blur'
            }">
            <div class="itemx">
              <el-input v-model="item.title"></el-input>
              <el-button @click.prevent="addChildren(index)">增加子组</el-button>
              <el-button @click.prevent="removeitem(index)">删除</el-button>
            </div>
            <!-- 
            内层的表单项
            -->
            <el-form-item v-for="(ele, i) in item.children" :label=ele.title :key="i" :prop="ele.title" :rules="{
              required: true, message: '域名不能为空', trigger: 'blur'
            }">
              <div class="itemchildren">
                <el-input v-model="ele.title"></el-input>
                <el-button @click.prevent="removeChildren(index, i)">删除</el-button>
              </div>
            </el-form-item>

          </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('dynamicValidateForm')" >确定</el-button>
          <el-button type="primary" @click="innerVisible=false">取消</el-button>
        </span>
      </el-dialog>

    </el-dialog>
  </div>
</template>

<script>
import TreeGoods from '@/views/Goods/TreeGoods.vue'
import antiShake from '@/components/clickThrottle'
export default {
  name: 'AddParams',

  components: { TreeGoods },
  props: ['dialogable'],
  data() {

    return {
      isdisable: true,//设置确定按钮是否可用
      paramsForm: {
        itemCatId: '',
        specsName: '',
        paramData: ''
      },
      innerVisible: false,//内弹框
      treeData: {//tree数据
        cid: '',
        id: '',
        name: ''
      },
      dynamicValidateForm: {//商品参数规格配置
        groups: [

        ],

      }
    }
  },
  methods: {
    sendTreeData(val) {
      console.log(this.treeData)
      this.treeData = val
      this.isdisable = false
    },
    closeDialog() {
      // this.dialogable=false
      this.$emit('closeDialog')
    },
    //提交表单数据
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            if(antiShake()){
              //console.log('提交的规格参数',this.dynamicValidateForm.groups)
          this.$api.addPramas({
            itemCatId: this.treeData.cid,
            specsName: this.treeData.name,
            paramData: JSON.stringify(this.dynamicValidateForm.groups)
          }).then(res => {
            if (res.data.status == 200) {
              this.$message.success('添加成功')
              //清空数据
               this.paramsForm={
                itemCatId: '',
                specsName: '',
                paramData: ''
              },
              this.treeData={//tree数据
                  cid: '',
                  id: '',
                  name: ''
                },
                this.dynamicValidateForm.groups=[],
                this.isdisable=true,
              this.innerVisible = false
              this.$parent.http(1);
              this.$emit('closeDialog')
            }
          })
            }else{
              console.log('事件不能够重复提交')
            }
           
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    /* 增加子组件 */
    addChildren(index) {
      this.dynamicValidateForm.groups[index].children.push({
        value: '',
        title: ''
      })
    },
    /* 
    删除子组 */
    removeChildren(index, i) {
      this.dynamicValidateForm.groups[index].children.splice(i, 1)
    },
    removeitem(index) {

      this.dynamicValidateForm.groups.splice(index, 1)

    },
    addDomain() {
      this.dynamicValidateForm.groups.push({
        value: '',
        title: '',
        children: []
      });
    }
  }
}
</script>

<style lang="less" scoped>
.itemx {
  display: flex;
  margin-bottom: 10px;

  button {

    flex: 1;
    margin-left: 10px;
  }
}

.itemchildren {
  margin-left: 15%;
  display: flex;
  margin-bottom: 10px;

  button {
    flex: 1;
    margin-left: 10px;
  }
}
</style>
