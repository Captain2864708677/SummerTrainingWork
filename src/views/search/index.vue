<template>
    <div>
        <!--<div class="icon-back-div">-->

            <van-row class="van-row1">
                <van-col span="2">
                    <van-icon color="white" size="0.5rem" class="icon-back" name="arrow-left" @click="back"/>
                </van-col>
                <van-col span="1">&nbsp</van-col>
                <van-col span="17">
                    <van-search
                            class="header_search"
                            v-model="query.findItem"
                            :clearable="true"
                            placeholder="输入关键字查询商品"
                            @click="tohistory"/>
                </van-col>
                <van-col span="4">
                    <div class="search-btn" @click="search">搜索</div>
                </van-col>
            </van-row>

        <!--</div>-->

        <!-- 推荐标签 -->

        <!--历史记录列表-->
        <div class="history-card" v-if="show1">
            <div class="title-font">&nbsp</div>
            <div class="title-font">-------------------- 搜索历史 --------------------</div>
            <div class="title-font">&nbsp</div>
            <van-list>
                <div class="cell-font" v-for="item in histories" :key="item">
                    <van-row @click="choose(item)">
                        <van-col span="2"></van-col>
                        <van-col span="8">{{item}}</van-col>
                        <van-col span="12"></van-col>
                        <van-col span="2">
                            <van-icon color="#aaaaaa" name="cross" @click="remove(item)"/>
                        </van-col>
                    </van-row>
                    <div class="split">
                        <img  :src=" require( '../../assets/split.png')"/>
                    </div>
                </div>
                <div class="clear-font" @click="clear">清空历史记录</div>
            </van-list>

        </div>

        <router-view></router-view>

        <div v-if="showlist">
            <tab
                    :aim="query.findItem">
            </tab>
        </div>

    </div>
</template>

<script>
    import tab from '../tab'
    export default {
        name: "SearchIndex",
        components:{
            tab
        },
        data(){
            return{
                histories:[
                    '衬'
                ],
                query: {
                    findItem:''
                },
                showlist:false,//搜索结果列表显示隐藏
                show1:true,//历史记录显示隐藏
                count:''
            }
        },
        methods:{
          back(){
            this.$router.push("../homepage")
          },
            clear(){
              this.histories = []
            },
            remove(name){
              this.histories.some((item,i)=>{
                    if(item == name){
                        this.histories.splice(i,1)
                        return true
                    }
                  }
              )
            },
            choose(item){
                this.query.findItem = item
            },
            search(){
              if(this.show1 === true){
                  this.showlist = true
                  this.show1 = false
              }

              if(typeof(this.query.findItem) != "undefined" && (this.histories.indexOf(this.findItem)!=-1)){//搜索关键字不为空且历史记录中不存在
                  this.histories.unshift(this.query.findItem)
                  console.log('findItem',this.query.findItem)
                  // this.$router.push({path:'../tab',query:{select:this.findItem}})
              }
            },
            tohistory(){
              this.showlist = false
                this.show1 = true
            }
        },
    }
</script>

<style scoped lang="less">
    .van-row1{
        background: #C22B2E;
        border-radius: 0 0 .2rem .2rem;
    }
    .clear-font{
        color: dodgerblue;
        font-size: .25rem;
        text-align: center;
        margin: 0 0 0 0;
    }
    .split{
        /*display: inline-block;*/
        align:center;
        width:.1rem;
        height: 20px;
        margin: 0 0 5px 5px;
    }
    .cell-split{
        font-size: 0.01rem;
        color: #eeeeee;
        text-align: center;
    }
    .cell-font{
        color: #777777;
        text-align: left;
        font-size: .3rem;
    }
    .title-font{
        font-size: .2rem;
        /*font-weight: bolder;*/
        color: #aaaaaa;
        margin: 0 0 0 0;
    }
    .history-card{
        text-align: center;
    }
    .icon-back{
        size: 0.5rem;
        margin: 0.2rem 0 0 0;
    }
    .search-btn{
        margin: .45rem 0 .5rem .1rem;
        width: .8rem;
        height: .45rem;
        text-align: center;
        border: 1px solid red;
        border-radius: .1rem;
        font-size: .3rem;
        background: white;
        color:#C22B2E;
        /*font-weight: bolder;*/
    }
.header_search{
    width: 5rem;
    height: 1rem;
    font-size: 0.5rem;
    margin: 0.2rem 0 0.05rem 0;
    padding: 0;
    background: #C22B2E;
    /*border-radius: .2rem;*/
}
</style>