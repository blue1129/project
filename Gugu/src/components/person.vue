<template>
    <div class="box">
        <h1>person</h1>
        <label for="title">标题</label><input type="text" name="title" id="" v-model="serTle">
        <label for="keyboard">关键字</label><input type="text" name="keyboard" id="" v-model="serKey">
        <label for="">文件时间</label><input type="date" name="" id="" v-model="data1">——<input type="date" name="" id="" v-model="data2">
        <button @click="searchIt">搜索</button><br>
        <input type="button" @click="newTodoit()" v-model="newTo" class="newtab">
        <div class="hav" v-show="newTodo"> <label for="newtitle">标题</label><input type="text" name="newtitle" id="" v-model="title">
        <label for="newkeyboard">关键字</label><input type="text" name="newkeyboard" v-model="keyboard" value=""><button @click="addTodo">确认添加</button></div>
        <table>
            <thead>
                <th>序号</th>
                <th>标题</th>
                <th>关键字</th>
                <th>文件时间</th>
                <th>操作</th>
            </thead>
            <tbody>
                <tr v-for="todo,index in todolist">
                <td>{{ index+1 }}</td>
                <td>{{ todo.title }}</td>
                <td>{{todo.keyboard }}</td>
                <td>{{ todo.date}}</td>
                <td><button>查看</button><button @click="removeTodo(todo)">删除</button></td>
                </tr>
            </tbody>
        </table>
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
                todos:JSON.parse(localStorage.getItem('todos')) || [],
                todolist:JSON.parse(localStorage.getItem('todos')) || []
            }
        },
        methods:{
            removeTodo(obj){
                console.log(111);
                this.todos=this.todos.filter((p)=>{
                    return p!==obj
                })
                this.todolist=this.todos.filter((p)=>{
                    return p!==obj
                })
            },
            addTodo(){
                var time = new Date()
                let tdate=time.toLocaleDateString()
                this.todos.unshift({id:nanoid(),title:this.title,keyboard:this.keyboard,date:tdate})
                // this.todos.unshift({id:nanoid(),title:this.title,keyboard:this.keyboard,date:'2023/3/2'})
                this.searchIt()
                this.title=''
                this.keyboard=''
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
            }
        },
        watch:{
            todos:{
            deep:true,
            handler(value){
                localStorage.setItem('todos',JSON.stringify(value))
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
    width: 75%;
    
}
table{
    width: 100%;
    text-align: center;
    
}
th{
    height: 70px;
    background-color:darkgrey;
}
td{
    height: 55px;
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