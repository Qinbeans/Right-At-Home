<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';
	export let src: string;
	export let size = '50%';
	let alt = uuidv4();
</script>

<style lang="scss">
</style>

<div class="flex justify-center flex-rows">
	<img src="{src}" alt="{alt}" width="{size}" height="{size}">
</div>
