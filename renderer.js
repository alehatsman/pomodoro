const Vue = require('vue/dist/vue.js');

Vue.component('btn', {
  props: ['className'],
  template: `
    <button class="btn" :class="className" v-on:click="$emit('click')">
      <slot></slot>
    </button>
  `,
});

Vue.filter('minutes', function (value) {
  if (!value) return ''
  let minutes = Math.floor(value / 60);
  let seconds = (value - minutes * 60);
  return `${minutes} : ${seconds < 10 ? '0' + seconds : seconds}`;
});

Vue.component('timer', {
  props: ['className', 'time'],
  template: `
    <div class="timer" :class="className">
      {{ time | minutes }}
    </div>
  `,
});

const STATE_NOT_STARTED = 'STATE_NOT_STARTED';
const STATE_IN_PROGRESS = 'STATE_IN_PROGRESS';
const STATE_PAUSED = 'STATE_PAUSED';
const DEFAULT_TIME = 25 * 60;

Vue.component('control', {
  props: ['className', 'state', 'start', 'pause', 'stop'],
  template: `
    <div class="control" :class="className">
      <btn v-if="state === 'STATE_NOT_STARTED'" class="control__start" v-on:click="start()">START</btn>
      <btn v-if="state === 'STATE_IN_PROGRESS'" class="control__start" v-on:click="pause()">PAUSE</btn>
      <btn v-if="state === 'STATE_PAUSED'" class="control__start" v-on:click="start()">RESUME</btn>      
      <btn class="control__stop" v-on:click="stop()">STOP</btn>
    </div>
  `,
});

Vue.component('tomato', {
  template: `
    <img src="tomato.svg">
    </img>
  `
});

const app = new Vue({
  el: '#app',
  data: {
    state: STATE_NOT_STARTED,
    time: DEFAULT_TIME,
    interval: null,
  },
  template: `
    <div class="pomodo">
      <timer class="pomodo__timer" :time="time">
      </timer>
      <control class="pomodo__control" 
               :state="state" 
               :start="start" 
               :pause="pause"
               :stop="stop">
      </control>
    </div>
  `,
  methods: {
    start() {
      this.state = STATE_IN_PROGRESS;
      this.interval = setInterval(() => {
        this.time = this.time - 1;
      }, 1000);
    },

    pause() {
      this.clearInterval()
      this.state = STATE_PAUSED;
    },

    stop() {
      this.clearInterval();
      this.time = DEFAULT_TIME;
      this.state = STATE_NOT_STARTED;
    },

    clearInterval() {
      clearInterval(this.interval);
      this.interval = null;
    },
  },
});
