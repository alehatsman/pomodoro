import Vue from 'vue/dist/vue.js'
import btn from './btn.vue'
import timer from './timer.vue'
import control from './control.vue'
import app from './app.vue'
import '../../assets/index.css'

Vue.component('btn', btn)
Vue.component('timer', timer)
Vue.component('control', control)

new Vue(app)
