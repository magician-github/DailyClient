import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    name:'home',
    redirect:'/loginAndReg/login'
    // component:()=>import(/* webpackChunkName:'loginReg' */ '@/views/loginAndReg'),
  },
  {
    path:'/home',
    name:'home',
    component:()=>import(/* webpackChunkName:'weixin' */ '@/views/Home'),
    redirect:'/home/weixin',
    children:[
      {
        path:'time',
         name:'weixin',
        component:()=>import(/* webpackChunkName:'weixin' */ '@/views/time')
      },
      {
        path:'work',
        name:'work',
        component:()=>import(/* webpackChunkName:'txl' */ '@/views/work')
    
      },
      {
        path:'create',
        name:'faxian',
        component:()=>import(/* webpackChunkName:'faxian' */ '@/views/create')
    
      },
      {
        path:'man',
        name:'man',
        component:()=>import(/* webpackChunkName:'faxian' */ '@/views/man')
    
      },
      {
        path:'news',
        name:'news',
        component:()=>import(/* webpackChunkName:'news' */ '@/views/news')
    
      },
      {
        path:'newsDetail',
        name:'news',
        component:()=>import(/* webpackChunkName:'news' */ '@/views/newsDetail')
    
      },
      {
        path:'me',
        name:'me',
        component:()=>import(/* webpackChunkName:'me' */ '@/views/me')
    
      }
    ]
  },
  {
    path:'/detail/:id',
    name:'detail',
    component:()=>import(/* webpackChunkName:'detail' */ '@/views/detail'),
    meta:{
      msg:'这是路由元信息'
    }
  },
  {
    path:'/addEveryDay',
    name:'addEveryDay',
    component:()=>import(/* webpackChunkName:'addEveryDay' */ '@/views/addEveryDay'),
    meta:{
      msg:'这是路由元信息'
    }
  },
  {
    path:'/loginAndReg/login',
    name:'loginAndReg',
    component:()=>import(/* webpackChunkName:'loginReg' */ '@/views/loginAndReg'),
    meta:{
      msg:'这是路由元信息'
    }
  },
  {
    path:'/updatePwd',
    name:'updatePwd',
    component:()=>import(/* webpackChunkName:'updatePwd' */ '@/views/updatePwd'),
    meta:{
      msg:'这是路由元信息'
    }
  },
  {
    path:'/*',
    name:'notFound',
    component:()=>import(/* webpackChunkName:'notFound' */ '@/views/notFound'),
  },
  
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to,from,next)=>{
  let token = localStorage.getItem("token")//验证登录状态
  if(token){//判断是否登录
    next()
  }

  else{
    if(to.path!=='/loginAndReg/login'){
      next({path:'/loginAndReg/login'})
    }else{
      next()
    }
  }
})

export default router;
