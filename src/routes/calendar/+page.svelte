<!-- a calendar is 7x4 -->
<script lang="ts">
    import Page from '$lib/components/page.svelte'
	import Calendar from '$lib/components/calendar.svelte';
    import { createClient } from '@supabase/supabase-js';
	/** @type {import('./$types').PageData} */
    export let data;
    let url = data.url;
    let key = data.key;
	//request the calendar data from supabase
	//once retrieved, sort then grab for days
	const getEvents = async (month: number, day: number, year: number) => {
		let client = createClient(url,key)
		//make a date object for the current month
	}
</script>

<!-- container for calendar -->
<main>
	<Page header="Calendar">
		<Calendar/>
	</Page>
</main>