<script lang="ts">
    export let header = "Header"
    export let width = ""
    export let height = ""
    export let center = ""
</script>

<div class="{width} {height} mx-5 mt-2 px-2 py-2 grid place-content-center place-items-center bg-tertiary-70 rounded border border-solid border-text-100 text-lg">
    <h1 class="{center} text-2xl border border-solid border-text-100 bg-secondary-100 px-2 mb-2 rounded-md w-fit">{header}</h1>
    <slot/>
</div>