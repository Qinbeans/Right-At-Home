<!-- a calendar is 7x4 -->
<script lang="ts">
    import { createClient } from '@supabase/supabase-js';
	import type { Database } from '$lib/ts/supabase';
	import type { CalendarEvent } from '$lib/ts/types';
	export let api_url: string;
	export let api_key: string;
	//request the calendar data from supabase
	//once retrieved, sort then grab for days
	const getEventsForMonth = async (month: number, year: number) => {
		let client = createClient<Database>(api_url,api_key)
		//make a date object for the current month
		let start = new Date(year, month, 1, 0, 0, 0, 0)
		let end = new Date(year, month, 31, 23, 59, 59, 999)
		//format the date to be used in the query
		let start_str = start.toISOString()
		let end_str = end.toISOString()
		let {data, error} = await client.from('calendar').select('*').gte('start', start_str).lte('start', end_str)
		if (error || !data) {
			throw error;
		}
		return data
	}

	//request the calendar data from supabase
	//get date
	const date = new Date();
	let month = date.getMonth();
	let day = date.getDate();
	let year = date.getFullYear();
	let months = [
		31,
		((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) ? 29 : 28,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31
	];

	const month_names = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];

	//create a map of the events

	let events: CalendarEvent[][];

	const updateEvents = async () => {
		let data = await getEventsForMonth(month, year);
		events = [];
		events.length = months[month];
		if(data) {
			for (let i = 0; i < data.length; i++) {
				//event key is the day of the month it starts, value is an array of events
				let event = data[i] as CalendarEvent;
				if(event.color == null) event.color = "#dadada";
				let start = new Date(event.start);
				let start_day = start.getDate();
				let event_list = events[start_day-1];
				if (event_list) {
					event_list.push(event);
				} else {
					events[start_day-1] = [event];
				}
			}
		}
	}

	let promise = updateEvents();

	let firstDay = new Date(year, month, 1).getDay();
	//add popups for each day
	const decrementMonth = () => {
		month--;
		if (month < 0) {
			month = 11;
			year--;
			if (months[1] != 29 && (year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)){
				months[1] = 29;
			}else if(months[month] == 29){
				months[1] = 28;
			}
		}
		if (date.getMonth() == month && date.getFullYear() == year)
			day = date.getDate();
		else day = -1;
		firstDay = new Date(year, month, 1).getDay();
		//update the events
		promise = updateEvents();
	}
	const incrementMonth = () => {
		month++;
		if (month > 11) {
			month = 0;
			year++;
			if (months[1] != 29 && (year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)){
				months[1] = 29;
			}else if(months[1] == 29){
				months[1] = 28;
			}
		}
		if (date.getMonth() == month && date.getFullYear() == year)
			day = date.getDate();
		else day = -1;
		firstDay = new Date(year, month, 1).getDay();
		//update the events
		promise = updateEvents();
	}
</script>
<div class="grid place-items-center gap-1 grid-cols-[auto_auto_auto] text-lg font-extrabold grid-cols-3 rounded-lg p-1 m-1 bg-secondary-90 border border-solid border-black">
	<div>
		<button class="calendar rounded-lg px-2 hover:bg-ok-90 border border-solid border-black" on:click={decrementMonth}><span>&#60;</span></button>
	</div>
	<div class="w-24 text-center flex flex-col rounded-lg p-1 m-1 bg-tertiary-90 border border-solid border-black">
		<ul>
			<li>
				{month_names[month]}
			</li>
			<li>
				{year}
			</li>
		</ul>
	</div>
	<div>
		<button class="calendar rounded-lg px-2 hover:bg-ok-90 border border-solid border-black" on:click={incrementMonth}><span>&#62;</span></button>
	</div>
</div>
<div class="grid gap-1 text-sm font-extrabold grid-cols-7 rounded-lg p-1 m-1 bg-secondary-70 border border-solid border-black">
	<div class="text-center">Sunday</div>
	<div class="text-center">Monday</div>
	<div class="text-center">Tuesday</div>
	<div class="text-center">Wednesday</div>
	<div class="text-center">Thursday</div>
	<div class="text-center">Friday</div>
	<div class="text-center">Saturday</div>
</div>
{#await promise}
awaiting...
{:then _value}
<div class="grid gap-1 grid-cols-7 grid-rows-4 border border-solid border-black bg-secondary-70 rounded-lg p-1 m-1">
	<!-- each clause iterating through the current month -->
	{#each Array(months[month]) as _, i (i)}
		<!-- if the day is the first day of the month, start a new row -->
		{#if i == 0}
			{#each Array(firstDay) as _, j (j)}
				<div class="p-1"></div>
			{/each}
		{/if}
		<!-- if the day is today, highlight it -->
		{#if i == day - 1}
			<div class="rounded calendar border border-solid border-black bg-ok-90 px-1 pt-1 h-[5.25rem] w-full">
				{#if i < 9}
					0{i + 1}
				{:else}
					{i + 1}
				{/if}
				<ul class="text-xs w-full mb-1">
					{#if events[i] != undefined}
						{#each events[i] as event}
							<li style="background-color:{event.color};" class="rounded px-1 w-full">
								{event.title}
							</li>
						{/each}
					{/if}
				</ul>
			</div>
		{:else}
			<div class="rounded bg-tertiary-90 calendar border border-solid border-black pl-1 pr-12 h-[5.25rem] w-full">
				{#if i < 9}
					0{i + 1}
				{:else}
					{i + 1}
				{/if}
				<ul class="text-xs w-full">
					{#if events[i] != undefined}
						{#each events[i] as event}
							<li style="background-color:{event.color};" class="rounded px-1 w-full">
								{event.title}
							</li>
						{/each}
					{/if}
				</ul>
			</div>
		{/if}
	{/each}
</div> 
{/await}