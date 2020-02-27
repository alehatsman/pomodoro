<script>
  export let onStartClick
  export let onStopClick
  export let onPauseClick
  export let isTimerInProgress
</script>

<main>
  <div class="container">
    {#if !isTimerInProgress}
      <button class="start" on:click={onStartClick}>
        START
      </button>
    {:else}
      <button class="pause" on:click={onPauseClick}>
        PAUSE 
      </button>
    {/if}
    <button class="stop" on:click={onStopClick}>
      STOP
    </button>
  </div>
</main>

<style>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  button {
    padding: 10px 50px;
    background: white;
    border: none;
    border-radius: 5px;
    font-size: 36px;
    font-weight: 200;
    color: white;
  }

  button.start {
    background-color: #4CAF50;
  }

  button.pause {
    background-color: #FFCA28;
  }

  button.stop {
    background-color: #B71C1C;
  }

  button:not(:first-child) {
    margin-left: 10px;
  }
</style>
