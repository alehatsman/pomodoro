<script type="ts">
  export let currentMode: string
  export let onSwitch: (mode: string) => void

  const modes = [ 
    { id: 'focus', text: 'Focus' },
    { id: 'short', text: 'Short Break' },
    { id: 'long', text: 'Long Break' }
 ]

  const onClick = (mode: string) => {
    console.log('onClick', mode)
    if (onSwitch) {
      onSwitch(mode)
    }
  }
</script>

<div class="modes">
  {#each modes as mode}
    <a 
     class="modes__item" 
     class:modes__item--active={currentMode === mode.id}
     on:click={() => onClick(mode.id)}>
     {mode.text}
    </a>
  {/each}
</div>

<style>
  .modes__item {
    font-family: Open Sans;
    font-style: normal;
    font-weight: 300;
    font-size: 24px;
    line-height: 33px;
    color: var(--font-color);
    transition: color 1s ease;
    text-decoration: none;
    padding: 10px 25px;
    user-select: none;
    cursor: pointer;
  }

  .modes__item--active {
    background: var(--bg-color);
    transition: background 2s ease;
    filter: brightness(120%);
    border-radius: 10px;
  }
</style>
