<script lang="ts">
  export let radius: number
  export let progress: number
  export let stroke: number

  $: normalizedRadius  = radius - (stroke * 2)
  $: circumference = normalizedRadius * 2 * Math.PI
  $: strokeDashoffset = circumference - progress / 100 * circumference
</script>

<svg
  class="circle"
  width="{ radius * 2 }"
  height="{ radius * 2 }"
>
  <circle
    class="circle__static-line"
    fill="transparent"
    stroke-width="{stroke}"
    r="{normalizedRadius}"
    cx="{radius}"
    cy="{radius}"
  />
  <circle
    class="circle__progress-line circle__progress-line--progress"
    fill="transparent"
    stroke-linecap="round"
    stroke-dasharray="{circumference + ' ' + circumference}"
    style="stroke-dashoffset: {strokeDashoffset};"
    stroke-width="{stroke}"
    r="{normalizedRadius}"
    cx="{radius}"
    cy="{radius}"
  />
</svg>

<style>
  .circle {
  }

  .circle__static-line {
    stroke: var(--font-color);
  }

  .circle__progress-line {
    stroke: var(--bg-color);
  }

  .circle__progress-line--progress {
    transition: 0.35s stroke-dashoffset;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }
</style>
