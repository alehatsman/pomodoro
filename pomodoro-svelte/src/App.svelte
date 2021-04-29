<script lang="ts">
  import formatTime from './formatTime'
  import Modes from './components/Modes.svelte'
  import Timer from './components/Timer.svelte'
  import Theme from './components/Theme.svelte'

  const modes = {
    focus: { 
      defaultTime: 25 * 60,
      colors: {
        bg: '#ed665a',
        font: '#ecf2ff',
      }
    },
    short: {
      defaultTime: 5 * 60,
      colors: {
        bg: '#43ad37',
        font: '#ecf2ff',
      }
    },
    long: {
      defaultTime: 15 * 60,
      colors: {
        bg: '#2c84d8',
        font: '#ecf2ff',
      }
    }
  }

  let currentMode:string = 'focus'
  let theme = modes[currentMode].colors
  let defaultTime = modes[currentMode].defaultTime
  let time = defaultTime
  let progress = 0 
  let intervalId = null
  let title = 'Deepfocus'
  $: document.title = title

  const bellAudio = new Audio('/sounds/bell.mp3');
  const clickAudio = new Audio('/sounds/click.mp3');

  const onModeChange = (mode: string) => {
    stop()
    progress = 0
    const m = modes[mode]
    time = m.defaultTime
    currentMode = mode
    defaultTime = m.defaultTime
    theme = m.colors
  }

  const onTick = () => {
    time -= 1
    // progress = 100 - time / defaultTime * 100
    title = `${formatTime(time)} - Deepfocus`

    if (time === 0) {
      stop()
      bellAudio.play()
    }
  }

  const start = () => {
    intervalId = setInterval(onTick, 1000)
  }

  const stop = () => {
    clearInterval(intervalId)
    intervalId = null
    time = defaultTime
    title = 'Deepfocus'
  }

  const toggle = () => {
    clickAudio.play();
    if (intervalId) {
      stop()
    } else {
      start()
    }
  }
</script>

<Theme theme={theme}>
  <main>
    <Modes
      currentMode={currentMode}
      onSwitch={(mode) => onModeChange(mode) }
    />
    <Timer 
      time={time} 
      progress={progress} 
    />
    <button on:click={toggle}>
      {#if !intervalId}
        Start
      {:else}
        Stop
      {/if}
    </button>
  </main>
</Theme>

<style>
	:global(html, body) {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background: var(--bg-color);
    transition: background 1s ease;
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  button {
    background-color: var(--bg-color);
    transition: background-color 1s ease;
    filter: brightness(120%);
    padding: 15px 50px;
    opacity: 0.89;
    border: none;

    box-sizing: border-box;
    border-radius: 34px;
    outline: none;

    font-family: Open Sans;
    font-style: normal;
    font-weight: 300;
    font-size: 24px;
    line-height: 27px;
    display: flex;
    align-items: center;
    text-align: center;
    text-transform: uppercase;
    color: #FFFFFF;
    cursor: pointer;
  }
</style>
