const Vue = require('vue/dist/vue.js');

const STATE_NOT_STARTED = 'STATE_NOT_STARTED';
const STATE_IN_PROGRESS = 'STATE_IN_PROGRESS';
const STATE_PAUSED = 'STATE_PAUSED';

const TYPE_PROGRESS = 'TYPE_PROGRESS';
const TYPE_BREAK = 'TYPE_BREAK';

const DEFAULT_PROGRESS_TIME = 25 * 60;
const DEFAULT_SHORT_BREAK_TIME = 5 * 60;
const DEFAULT_LONG_BREAK_TIME = 15 * 60;

Vue.component('btn', {
  props: ['className', 'theme'],
  template: `
    <button v-bind:class="classObject"
            v-on:click="$emit('click')">
      <slot></slot>
    </button>
  `,
  computed: {
    classObject: function () {
      return {
        btn: true,
        'btn--state--progress': this.theme === 'progress',
        'btn--state--break': this.theme === 'break',
      };
    }
  },
});

Vue.filter('minutes', function (value) {
  if (!value) return '00 : 00'
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

Vue.component('control', {
  props: ['className', 'state', 'type', 'start', 'pause', 'stop'],
  template: `
    <div class="control" :class="className">
      <btn v-if="state === '${STATE_NOT_STARTED}'" 
           class="control__start" 
           theme="btnTheme"
           v-on:click="start()">
        START
      </btn>
      <btn v-if="state === '${STATE_IN_PROGRESS}'" 
           class="control__start" 
           theme="btnTheme"
           v-on:click="pause()">
        PAUSE
      </btn>
      <btn v-if="state === '${STATE_PAUSED}'" 
           class="control__start" 
           theme="btnTheme"
           v-on:click="start()">
        RESUME
      </btn>      
      <btn class="control__stop" 
           theme="btnTheme"
           v-on:click="stop()">
        STOP
      </btn>
    </div>
  `,
  computed: {
    btnTheme: function() {
      return this.type === TYPE_PROGRESS ?
        'progress' : 'break';
    },
  },
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
    type: TYPE_PROGRESS,
    time: DEFAULT_PROGRESS_TIME,
    interval: null,
    counter: 1,
  },
  template: `
    <div v-bind:class="classObject">
      <timer class="pomodo__timer" 
             :time="time">
      </timer>
      <control class="pomodo__control" 
               :state="state" 
               :type="type"
               :start="start" 
               :pause="pause"
               :stop="stop">
      </control>
    </div>
  `,
  computed: {
    classObject: function () {
      return classObj = {
        pomodo: true,
        'pomodo--state--progress': this.type === TYPE_PROGRESS,
        'pomodo--state--break': this.type === TYPE_BREAK,
      };
    }
  },
  methods: {
    tick() {
      if (this.time === 0) {
        this.clearInterval();  
        if (this.type === TYPE_PROGRESS) {
          this.startBreak();
        } else {
          this.time = DEFAULT_PROGRESS_TIME;
          this.type = TYPE_PROGRESS;
        }
        return;
      }
      this.time = this.time - 1;
    },

    startBreak() {
      this.type = TYPE_BREAK;
      if (this.count % 4 === 0) {
        this.time = DEFAULT_LONG_BREAK_TIME;
      } else {
        this.time = DEFAULT_SHORT_BREAK_TIME;
      }
      this.start();
    },

    start() {
      this.state = STATE_IN_PROGRESS;
      this.interval = setInterval(() => {
        this.tick();
      }, 1000);
    },

    pause() {
      this.clearInterval()
      this.state = STATE_PAUSED;
    },

    stop() {
      this.clearInterval();
      this.time = DEFAULT_PROGRESS_TIME;
      this.state = STATE_NOT_STARTED;
      this.type = TYPE_PROGRESS;
    },

    clearInterval() {
      clearInterval(this.interval);
      this.interval = null;
    },
  },
});
