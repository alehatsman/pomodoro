<script>
  export let time 

  function formatNumber(segment) {
    return segment < 10 ? `0${segment}` : `${segment}`
  }

  function formatTime(time) {
    const mins = Math.floor(time / 60)
    const seconds = time % 60

    return `${formatNumber(mins)}:${formatNumber(seconds)}`
  }
</script>

<main>
  <div>
    <h1>{formatTime(time)}</h1>
  </div>
</main>

<style>
  h1 {
		color: white;
		text-transform: uppercase;
		font-size: 5em;
		font-weight: 200;
	}
</style>
