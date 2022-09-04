<template>
   <div class="home">
      <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
      <div class="header">
        <div class="item" v-for="item in totalData" :key="item.id">
            {{item.title}}
            <div class="num">{{item.total}}</div>
            
            <div class="bottom">今日销售额:{{item.current}}</div>
        </div>
      </div>
      <div class="content">
        <div class="time-info">
          <div class="title">月销售额</div>
        <div id="charts" style="width: 100%; height: 360px"></div>
        </div>
          <div class="area">地区分布</div>
      </div>

      <!-- 底部区域 -->
      <div class="footer">
        <div class="news">
          <div><h3 style="margin:12px;">最新内容</h3></div>
          <div class="ul">
          <ul >
              <li v-for="(item,index) in 4" :key="index">最新内容：{{index+1}}</li>
          </ul>
        </div>
        </div>
        
        <div class="newProducts">
          <div><h3 style="margin:12px;">最新产品</h3></div>
          <div class="ul">
          <ul >
              <li v-for="(item,index) in 4" :key="index">最新产品：{{index+1}}</li>
          </ul>
        </div>
        </div>
        <div class="entrance">
          <h3>快捷入口</h3>
         <div class="text">
          <div class="but">
                <el-button type="primary">产品管理</el-button>
                <el-button>消息管理</el-button>
                <el-button>内容管理</el-button>
          </div>
        
        </div>
          
        </div>
      </div>
   </div>
</template>

<script>
export default {
  name: 'HoMe',
  components: {},

  data(){
      return{
        totalData:[]
      }
  },
  mounted(){
    this.$api.getStatistical().then((res)=>{
      if(res.data.status===200){
        this.totalData=res.data.list
      }
        //console.log(res.data)
        //进度
    //销售数据量
    this.$api.getStatistical().then((res) => {
      console.log("销售数据量", res.data);
      //totalData
      if (res.data.status === 200) {
        this.totalData = res.data.list;
      }
    });
    //--销售比----------------------
    this.$api.getSellTotal().then((res) => {
      console.log(res.data);
      //获取x轴数据
      let xData = res.data.info.date;
      //获取数据
      let xResult = res.data.info.xResult;
      let titleArr = [];
      let data =[]

      xResult.forEach((ele) => {
        titleArr.push(ele.xName);
        ele.data.forEach(item=>{
          data.push(item.num)
        })
      });
      //折线 
      this.initCharts(xData,data.slice(0,6),data.slice(6,12),data.slice(12,18));
    });
    })
  },
  methods:{
     initCharts(data,data1,data2,data3) {
      let charts = this.$echarts.init(document.getElementById("charts"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["家具", "手机","家电"],
          left:100,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "家具",
            type: "line",
            smooth: true,
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data:data1,
          },
          {
            name: "手机",
            type: "line",
            smooth: true,
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: data2,
          },
          {
            name: "家电",
            type: "line",
            smooth: true,
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: data3,
          },
        ],
      };
      charts.setOption(option);
    },
  },
  }

</script>

<style lang="less">
.header{
display: flex;
}
.item{
  /* display: inline-block; */
  flex:1;
  margin-left: 20px;
  height: 100px;
  padding: 10px 20px;
   border-radius: 10px;
   color: #eee;
   font-weight: bold;
   position:relative ;
  
}
.item:nth-child(1){
    background-image: linear-gradient(#df887d, #88554d);
  }
  .item:nth-child(2){
    background-image: linear-gradient(#409eff, #2e556e);
  }
   .item:nth-child(3){
    background-image: linear-gradient(#b54fa8, #713c7a);
  }
   .item:nth-child(4){
    background-image: linear-gradient(#1cd2f1, #39717a);
  }
.num{
  padding-top: 10px;
  font-size: 22px;
}
.bottom{
 padding-top:10px;
  border-top: 1px solid rgb(246, 245, 245);
   bottom: 0;
      right: 0;
      left: 0;
          color: #fff;
          font-weight: normal;
}
.content{
  display: flex;
  height: 360px;
 margin: 20px;
}
.time-info{
  flex: 2;
  background: #fff;
    margin-right: 20px;
    padding: 10px;
}
.area{
  flex: 1;
 background: #2e556e;
    padding: 10px;
}

.footer{
  display: flex;
  margin: 20px;
  height: 160px;
}
.news{
  flex: 1;
 background-color:#fff;
}
.newProducts{
  flex: 1;
  background-color:#fff;
  margin-left: 20px;
}
.entrance{
  flex: 1;
  background-color:#fff;
  margin-left: 20px;
  
  
}
.ul{
  border-top: 1px solid black;
  margin-top: 10px;
  padding: 15px;
}
.text{
    display: flex;
    margin: 20px;
    flex:1;
    .but{
      flex:1
    }
  }
</style>
