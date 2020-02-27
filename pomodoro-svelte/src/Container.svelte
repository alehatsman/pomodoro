<script>
  import Display from './Display.svelte'
  import Control from './Control.svelte'

  const DEFAULT_TIME = 25 * 60

  let time = DEFAULT_TIME
  let timer

  function startTimer() {
    if (timer) {
      return
    }
    timer = setInterval(() => {
      time -= 1
      if (time === 0) {
        onStopClick()
      }
    }, 1000)
  }

  function stopTimer() {
    clearInterval(timer)
    timer = null
  }

  function resetTime() {
    time = DEFAULT_TIME
  }

  function stopAndResetTimer() {
    if (time !== DEFAULT_TIME) {
      resetTime()
    }

    if (timer) {
      stopTimer()
    }
  }
</script>

<main>
  <div class="container">
    <Display time={time} />
    <Control 
      isTimerInProgress={!!timer}
      onStartClick={startTimer} 
      onPauseClick={stopTimer}
      onStopClick={stopAndResetTimer} 
    />
  </div>
</main>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 10px;

    padding: 20px;

    width: 450px;
    height: 350px;
    background-color: #F44336;
  }
</style>
