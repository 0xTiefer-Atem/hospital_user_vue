import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../components/home/Home');
const Login = () => import('../components/login/Login');
const Index = () =>import('../components/index/Index');
const Appointment = () => import('../components/appointment/Appointment');
const Payment = () => import('../components/payment/Payment');
const Registered = () => import('../components/registered/Registered');

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const routes = [
  {
    path:'/personal',
    component: Home,
    children: [
      {
        path: '',
        redirect: 'index'
      },
      {
        path: 'index',
        component: Index
      },
      {
        path: 'login',
        component: Login
      },
      {
        path: 'appointment',
        component: Appointment
      },
      {
        path: 'payment',
        component: Payment
      },
      {
        path: 'registered',
        component: Registered
      }
    ]
  },
  {
    path: '/front',

  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router
