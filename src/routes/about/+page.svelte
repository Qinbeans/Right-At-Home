<script lang="ts">
    import '$lib/styles/app.css'
    import Page from '$lib/components/page.svelte'
    import Navbar from '$lib/components/navbar.svelte'
    import Background from '$lib/components/background.svelte';
    import Logo from '$lib/images/logo.png'
</script>

<Background color="var(--background)" image_url="{Logo}"/>
<main>
    <Navbar name="Right At Home"/>
    <Page header="About">
    </Page>
</main>