<script lang="ts">
    import '$lib/styles/app.css'
    import Background from '$lib/components/background.svelte';
    import Logo from '$lib/images/logo.png'
    import Navbar from '$lib/components/navbar.svelte'
	import { page } from '$app/stores';
    import { base } from '$app/paths';
	import { afterUpdate, onMount } from 'svelte';
	import { AppShell } from '@skeletonlabs/skeleton';
	let current = "home";

	const hyperlinks = [
		{
			name: "Home",
			href: base+"/",
			id: "home",
		},
		{
			name: "Calendar",
			href: base+"/calendar",
			id: "calendar",
		},
		{
			name: "Covid-19",
			href: base+"/covid-19",
			id: "covid-19",
		},
		{
			name: "Contact",
			href: base+"/contact",
			id: "contact",
		},
	]
	onMount(() => {
		const url = $page.url;
		const page_name = url.pathname
		const hyperlink = hyperlinks.find(hyperlink => hyperlink.href == page_name);
		if (hyperlink && hyperlink.id != current){
			current = hyperlink.id;
		}
	})
	afterUpdate(() => {
		//update the current page
		const url = $page.url;
		const page_name = url.pathname
		const hyperlink = hyperlinks.find(hyperlink => hyperlink.href == page_name);
		if (hyperlink && hyperlink.id != current){
			current = hyperlink.id;
		}
	});

</script>
<svelte:head>
    <title>{current.toUpperCase()}</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
</svelte:head>
<Background color="var(--background)" image_url="{Logo}"/>
<AppShell>
	<svelte:fragment slot="header">
		<Navbar name="Right At Home" current={current} hyperlinks={hyperlinks}/>
	</svelte:fragment>
	<!-- Body -->
	<slot/>
	<!-- Footer -->
	<footer class="fixed bottom-0 px-1 flex flex-row gap-3 text-xs">
		<span>@2023 Right At Home</span>
		-
		<span>Designed by <a class="text-text-100 italic nav-menu-button" href="https://www.linkedin.com/in/rybeats/" target="_blank" rel="noreferrer">Ryan Fong</a></span>
		-
		<span>Powered by Svelte</span>
	</footer>
</AppShell>
