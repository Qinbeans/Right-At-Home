<!-- a calendar is 7x4 -->
<script lang="ts">
    import Page from '$lib/components/page.svelte'
	import Calendar from '$lib/components/calendar.svelte'
	/** @type {import('./$types').PageData} */
    export let data
    let url = data.url
    let key = data.key
</script>

<!-- container for calendar -->
<main>
	<Page header="Calendar">
		<Calendar api_key={key} api_url={url}/>
	</Page>
</main>