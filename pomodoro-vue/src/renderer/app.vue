<template>
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
</template>

<script>
import {STATE_NOT_STARTED, STATE_IN_PROGRESS, STATE_PAUSED, TYPE_PROGRESS, TYPE_BREAK,
        DEFAULT_PROGRESS_TIME, DEFAULT_LONG_BREAK_TIME, DEFAULT_SHORT_BREAK_TIME} from './constants';

export default {
  el: '#app',
  data: {
    state: STATE_NOT_STARTED,
    type: TYPE_PROGRESS,
    time: DEFAULT_PROGRESS_TIME,
    interval: null,
    counter: 1,
    ring: new Audio('bell_ring.mp3'),
  },
  computed: {
    classObject: function () {
      return {
        pomodo: true,
        'pomodo--state--progress': this.type === TYPE_PROGRESS,
        'pomodo--state--break': this.type === TYPE_BREAK,
      }
    }
  },
  methods: {
    tick() {
      if (this.time === 0) {
        this.ring.play()
        this.clearInterval()  
        if (this.type === TYPE_PROGRESS) {
          this.startBreak()
        } else {
          this.state = STATE_NOT_STARTED
          this.time = DEFAULT_PROGRESS_TIME
          this.type = TYPE_PROGRESS
        }
        return
      }
      this.time = this.time - 1
    },

    startBreak() {
      this.type = TYPE_BREAK
      if (this.count % 4 === 0) {
        this.time = DEFAULT_LONG_BREAK_TIME
      } else {
        this.time = DEFAULT_SHORT_BREAK_TIME
      }
      this.start()
    },

    start() {
      this.state = STATE_IN_PROGRESS
      this.interval = setInterval(() => {
        this.tick()
      }, 1000)
    },

    pause() {
      this.clearInterval()
      this.state = STATE_PAUSED
    },

    stop() {
      this.clearInterval()
      this.time = DEFAULT_PROGRESS_TIME
      this.state = STATE_NOT_STARTED
      this.type = TYPE_PROGRESS
    },

    clearInterval() {
      clearInterval(this.interval)
      this.interval = null
    },
  },
}
</script>

<style scoped>
.pomodo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  color: white;
}

.pomodo--state--progress {
  background-color: var(--red-color);
}

.pomodo--state--break {
  background-color: var(--green-color);
}

.pomodo__timer {
  align-self: center;
}

.pomodo__control {
  align-self: center;
  margin-top: 10px;
}
</style>
