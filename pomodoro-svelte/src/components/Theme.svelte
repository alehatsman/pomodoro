<script type="ts">
  import { setContext, onMount, afterUpdate } from 'svelte'
  import { writable } from 'svelte/store'

  export let theme = {}

  const setRootColors = theme => {
    for (let [prop, color] of Object.entries(theme)) {
      let varString = `--${prop}-color`
      document.documentElement.style.setProperty(varString, color)
    }
  }

  onMount(() => {
    setRootColors(theme)
  })

  afterUpdate(() => {
    setRootColors(theme)
  })
</script>

<slot></slot>
