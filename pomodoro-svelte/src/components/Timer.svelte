<script type="ts">
  import Circle from './Circle.svelte'
  import formatTime from '../formatTime'

  export let time: number
  export let progress: number
</script>

<div class="timer">
  <!--
  <div class="timer__progress">
    <Circle 
      radius={250} 
      stroke={10} 
      progress={progress}
    />
  </div>
  -->
  <span class="timer__time">
    {formatTime(time)}
  </span>
</div>

<style>
  .timer {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    /*
    width: 500px;
    height: 500px;
    */
  }

  .timer__progress {
    position: absolute;
  }

  .timer__time {
    font-family: monospace;
    font-style: normal;
    font-weight: 200;
    font-size: 170px;
    line-height: 132px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -10px;
    color: var(--font-color);
    user-select: none;
  }
</style>
