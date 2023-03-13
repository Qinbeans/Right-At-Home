<script lang="ts">
    export let image_url: string = "";
    export let color = '#000000';
    export let opacity = 1;
</script>

<div class="fixed left-0 top-0 w-screen h-screen z-[-1]" style="background: url({image_url}) no-repeat; background-color: {color}; background-position: center; opacity: {opacity}; background-size: contain;"></div>