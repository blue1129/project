import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import person from '../components/person'
import project from '../components/project'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children:
        [
          {
            path:"per",
            name:"person",
            component:person
          },
          {
            path:"gonc",
            name:"project",
            component:project
          }
        ]
      
    }
  ]
})
