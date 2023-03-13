<template>
    <div class="box">
        <h1>project</h1>
        <label for="title">项目名称</label><input type="text" name="title" id="" v-model="serTle">
        <label for="keyboard">项目关键字</label><input type="text" name="keyboard" id="" v-model="serKey">
        <label for="">项目时间</label><input type="date" name="" id="" v-model="data1">——<input type="date" name="" id="" v-model="data2">
        <button @click="searchIt">搜索</button><br>
        <input type="button" @click="newTodoit()" v-model="newTo" class="newtab">
        <div class="hav" v-show="newTodo"> <label for="newtitle">项目标题</label><input type="text" name="newtitle" id="" v-model="title">
        <label for="newkeyboard">关键字</label><input type="text" name="newkeyboard" v-model="keyboard" value=""><button @click="addTodo">确认添加</button></div>
        <table>
            <thead>
                <th>序号</th>
                <th>项目标题</th>
                <th>关键字</th>
                <th>文件时间</th>
                <th>操作</th>
            </thead>
            <tbody>
                <tr v-for="todo,index in dataShow">
                <td>{{ index+1 }}</td>
                <td>{{ todo.title }}</td>
                <td><span class="key">{{todo.keyboard }}</span></td>
                <td>{{ todo.date}}</td>
                <td><button>查看</button><button @click="removeTodo(todo)">删除</button></td>
                </tr>
            </tbody>
        </table>
        <input type="button" value="上一页" @click="prePage">
        <button v-for="i in pageNum" @click="page(i)" :style="{cursor: 'pointer', margin:'10px'}">{{ i }}</button>
        <input type="button" value="下一页" @click="nextPage">
    </div>
</template>
<script>
import {nanoid} from 'nanoid'

// import { mapState, mapMutations,mapGetters,mapActions } from 'vuex'
    export default{
        name:"person",
        data(){
            return {
                newTodo : false,
                title:'',
                newTo:"+新建",
                keyboard:'',
                serTle:'',
                serKey:'',
                data1:'',
                data2:'',
                todos:JSON.parse(localStorage.getItem('xtodos')) || [],
                todolist:JSON.parse(localStorage.getItem('xtodos')) || [],
                totalPage: [], // 所有分页的数据
                pageSize: 5, // 每页显示数量
                pageNum: 1,  // 共几页=所有数据/每页现实数量     
                dataShow: [], // 当前显示的数据  
                currentPage: 0 // 默认当前显示第一页
            }
        },
        created(){
            this.pageNum = Math.ceil(this.todolist.length / this.pageSize) || 1;//计算有多少页数据，默认为1
            console.log(this.pageNum);
            // 循环页面
            for (let i = 0; i < this.pageNum; i++) {
                // 每一页都是一个数组 形如 [['第一页的数据'],['第二页的数据'],['第三页数据']]
                // 根据每页显示数量 将后台的数据分割到 每一页,假设pageSize为2， 则第一页是1-2条，即slice(0,2)，第二页是3-4条，即slice(3,4)以此类推
                this.totalPage[i] = this.todolist.slice(this.pageSize * i, this.pageSize * (i + 1))
            }

            // 获取到数据后默认显示第一页内容
            this.dataShow = this.totalPage[this.currentPage];

          },
        methods:{
            initIt(){
                this.pageNum = Math.ceil(this.todolist.length / this.pageSize) || 1;//计算有多少页数据，默认为1
                console.log(this.pageNum);
                // 循环页面
                for (let i = 0; i < this.pageNum; i++) {
                    // 每一页都是一个数组 形如 [['第一页的数据'],['第二页的数据'],['第三页数据']]
                    // 根据每页显示数量 将后台的数据分割到 每一页,假设pageSize为2， 则第一页是1-2条，即slice(0,2)，第二页是3-4条，即slice(3,4)以此类推
                    this.totalPage[i] = this.todolist.slice(this.pageSize * i, this.pageSize * (i + 1))
                }

                // 获取到数据后默认显示第一页内容
                this.dataShow = this.totalPage[this.currentPage];
            },
            removeTodo(obj){
                
                this.todos=this.todos.filter((p)=>{
                    return p!==obj
                })
                this.todolist=this.todos.filter((p)=>{
                    return p!==obj
                })
                this.initIt()
            },
            addTodo(){
                var time = new Date()
                let tdate=time.toLocaleDateString()
                //列表末尾添加
                this.todos.push({id:nanoid(),title:this.title,keyboard:this.keyboard,date:tdate})
                // this.todos.unshift({id:nanoid(),title:this.title,keyboard:this.keyboard,date:'2023/3/2'})
                this.searchIt()
                this.title=''
                this.keyboard=''
                this.initIt()
            },
            newTodoit(e){
                this.newTodo=!this.newTodo
                if(this.newTodo){  
                                          
                    this.newTo = "-收起"
                }
                else{
                    this.newTo = "+新建"
                }
                // e.target.value="收起"
            },
            searchIt(){
                // let Data1= new Date(this.data1).valueOf();
                // let Data2 = new Date(this.data2).valueOf();
                let Data1 = Date.parse(this.data1)-86400000
                let Data2 = Date.parse(this.data2)
                console.log(Data1,Data2);
                this.todolist=this.todos.filter((p)=>{
                    return p.title.indexOf(this.serTle.trim())!==-1 && p.keyboard.indexOf(this.serKey.trim())!==-1
                })
                this.serTle=''
                this.serKey=''
                if( this.data1 !== '' && this.data2 !== ''){
                    this.todolist=this.todolist.filter((p)=>{
                       let str = Date.parse(p.date)
                       console.log(str);
                        return str >=  Data1 && str <= Data2 
                    })
                }
                else if(this.data1 !== '' || this.data2 !== ''){
                    this.todolist=this.todolist.filter((p)=>{
                       let str = Date.parse(p.date)
                        return str >=  Data1 || str <= Data2 
                    })
                }
                else{
                    this.todolist=this.todolist
                }
                this.data1=''
                this.data2=''
                this.initIt()
            },
            nextPage() {
              if (this.currentPage === this.pageNum - 1) 
                return ;
              this.dataShow = this.totalPage[++this.currentPage];
            },
            // 上一页
            prePage() {
              if (this.currentPage === 0) 
                return ;
              this.dataShow = this.totalPage[--this.currentPage];
            },
            // 点击页码
            page(i){
                this.currentPage = i
                this.dataShow = this.totalPage[i-1];
            }
        },
        watch:{
            todos:{
            deep:true,
            handler(value){
                localStorage.setItem('xtodos',JSON.stringify(value))
        }
      }
    },
        computed:{
            // ...mapState('Person',['todos'])
            
        },
        mounted(){
            // localStorage.setItem('todos',JSON.stringify([{id:'001',title:"软件测试",keyboard:"测试",date:'2022/02/02'}]))
        }
    }
</script>
<style scoped>
.box{
    float:left;
    width: 80%;
    margin-left: 20px;
}
table{
    width: 100%;
    text-align: center;
    background-color:white;
}
th{
    height: 70px;
    background-color:darkgrey;
}
td{
    height: 55px;
    border-bottom: 1px solid darkgrey;
}
.key{
    display: inline-block;
    width: 60px;
    height: 35px;
    line-height: 35px;
    font-size:14px;
    background-color: rgb(83, 125, 83);
    color:white;
}
.newtab{
    float:left;
    margin-left: 50px;
}
button{
    background-color:dodgerblue;
    color:aliceblue;
}
</style>