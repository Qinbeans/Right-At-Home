<script lang="ts">
    import '$lib/styles/app.css'
    import Background from '$lib/components/background.svelte';
    import Logo from '$lib/images/logo.png'
    import Navbar from '$lib/components/navbar.svelte'
	import { page } from '$app/stores';
    import { base } from '$app/paths';
	import { afterUpdate, onMount } from 'svelte';
	let current = "home";

	const hyperlinks = [
		{
			name: "Home",
			href: base+"/",
			id: "home",
		},
		{
			name: "About",
			href: base+"/about",
			id: "about",
		},
		{
			name: "Calendar",
			href: base+"/calendar",
			id: "calendar",
		},
		{
			name: "Covid-19",
			href: "./covid-19",
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
<Background color="var(--background)" image_url="{Logo}"/>
<Navbar name="Right At Home" current={current} hyperlinks={hyperlinks}/>
<slot/>
