<script lang="ts">
    import Page from '$lib/components/page.svelte'
	import Image from '$lib/components/image.svelte'
	import Logo from '$lib/images/logo.png'
    import { Avatar } from '@skeletonlabs/skeleton';
</script>

<main>
    <div class="grid place-items-center grid-cols-1">
        <Page header="Welcome to Right-At-Home!" center="text-center" width="w-9/12">
            <Avatar src={Logo} width="w-1/3"/>
            <p class="text-center italic">
                Tomorrow's safe space for today's youth.
            </p>
        </Page>
        <Page header="Quick Start" width="w-9/12">
            <div class="grid grid-cols-2">
                <Page header="Quick">
                    <ul class="flex flex-col items-center gap-3 text-sm">
                        <li>
                            <a class="nav-menu-button py-1 md:px-7 px-2 rounded-lg bg-primary-100 border border-solid border-text-100" href="/about">About Us</a>
                        </li>
                        <li>
                            <a class="nav-menu-button py-1 md:px-7 px-2 rounded-lg bg-primary-100 border border-solid border-text-100" href="/calendar">Calendar</a>
                        </li>
                        <li>
                            <a class="nav-menu-button py-1 md:px-7 px-2 rounded-lg bg-primary-100 border border-solid border-text-100" href="/covid-19">Covid-19</a>
                        </li>
                        <li>
                            <a class="nav-menu-button py-1 md:px-6 px-1 rounded-lg bg-primary-100 border border-solid border-text-100" href="/contact">Contact Us</a>
                        </li>
                    </ul>
                </Page>
                <Page header="Board">
                    <p class="text-center italic">
                        <!-- grab this from the db at some point -->
                        Stay tuned for updates!
                    </p>
                </Page>
            </div>
        </Page>
    </div>
</main>