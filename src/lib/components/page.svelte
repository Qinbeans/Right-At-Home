<script lang="ts">
    export let header = "Header"
</script>

<div class="mx-5 mt-2 px-2 py-2 grid place-content-center place-items-center bg-tertiary-30 rounded border border-solid border-text-100">
    <h1 class="text-2xl border border-solid border-text-100 bg-secondary-100 px-2 mb-2 rounded-md w-fit">{header}</h1>
    <slot/>
</div>