<script lang="ts">
    export let image_url: string = "";
    export let color = '#000000';
    export let opacity = 1;
</script>

<div class="fixed left-0 top-0 w-screen h-screen z-[-1]" style="background-image: url({image_url}); background-color: {color}; opacity: {opacity};"></div>