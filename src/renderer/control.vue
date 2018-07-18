<template>
  <div class="control" :class="className">
    <btn v-if="state === 'STATE_NOT_STARTED'" 
         class="control__left" 
         theme="btnTheme"
         v-on:click="start()">
    START
    </btn>
    <btn v-if="state === 'STATE_IN_PROGRESS'" 
         class="control__start" 
         theme="btnTheme"
         v-on:click="pause()">
    PAUSE
    </btn>
    <btn v-if="state === 'STATE_PAUSED'" 
         class="control__start" 
         theme="btnTheme"
         v-on:click="start()">
    RESUME
    </btn>      
    <btn class="control__right" 
         theme="btnTheme"
         v-on:click="stop()">
    STOP
    </btn>
  </div>
</template>

<script>
export default {
  props: ['className', 'state', 'type', 'start', 'pause', 'stop'],
  computed: {
    btnTheme: function() {
      return this.type === TYPE_PROGRESS ?
        'progress' : 'break'
    },
  },
}
</script>

<style scoped>
.control {
  display: flex;
}

.control__right {
  margin-left: 20px;
}
</style>
