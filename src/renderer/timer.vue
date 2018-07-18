<template>
  <div class="timer" :class="className">
    {{ formattedTime }}
  </div>
</template>

<script>
function formatNumber(v) {
  if (v < 10) {
    return '0' + v
  } else {
    return v
  }
}

function formatTime(time) {
  if (!time) return '00 : 00'
  let minutes = Math.floor(time / 60)
  let seconds = (time - minutes * 60)
  return `${formatNumber(minutes)} : ${formatNumber(seconds)}`
}

export default {
  props: ['className', 'time'],
  computed: {
    formattedTime: function() {
      return formatTime(this.time) 
    }
  }
}
</script>

<style scoped>
.timer {
  font-size: 5rem;
  font-weight: 100;
}
</style>
