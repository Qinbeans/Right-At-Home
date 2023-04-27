<script lang="ts">
    import Page from '$lib/components/page.svelte'
	import Logo from '$lib/images/logo.png'
    import { Avatar } from '@skeletonlabs/skeleton'
    import { createClient } from '@supabase/supabase-js';
	import type { Database } from '$lib/ts/supabase';
    import type { BoardPost } from '$lib/ts/types';
    import { onMount } from 'svelte';
	import Background from '$lib/components/background.svelte';

    /** @type {import('./$types').PageData} */
    export let data;
    let url = data.url;
    let key = data.key;

    let innerWidth = 0;

    const getBoad = async () => {
        let client = createClient<Database>(url, key)
        //get time in UTC
        const date = new Date();
        let month = date.getMonth();
        let day = date.getDate();
        let year = date.getFullYear();
        const newDate = new Date(year, month, day);

        let {data, error} = await client.from('board').select('*').gte('render_date', newDate.toISOString()).order('render_date', {ascending: true}).limit(1)
        if (error || !data) {
            throw error;
        }
        return data
    }

    let board: BoardPost;

    onMount(async () => {
        board = (await getBoad())[0] as BoardPost
    })
</script>
<svelte:window bind:innerWidth />
<main>
    <div class="grid place-items-center grid-cols-1">
        <Page header="Welcome to Right-At-Home!" center="text-center" width="w-9/12">
            <Avatar src={Logo} width="w-1/5"/>
            <p class="text-center italic">
                Tomorrow's safe space for today's youth.
            </p>
        </Page>
        <Page header="About Us" width="w-9/12">
            <div class="grid {innerWidth < 500 ? 'grid-cols-1':'grid-cols-2'}">
                <Page header="Our Mission" center= "text center" width="w-10/12">
                    <p class="text-center">
                        Our mission is to establish a safe and inviting environment for people to socialize and relieve their stress through the use of community
                    </p>
                </Page>
                <Page header="Our Hours" width="w-10/12">
                    <p class="text-center">
                        We are open from 3:30-9pm, Monday-Saturday
                    </p>
                </Page>
                <Page header="Our Vision" width="w-10/12"> 
                    <p class="text-center">
                        Our vision is to create a family-friendly and inclusive community center thats serves as a hub for building resilience, creating a sense of community, and strengthening social and emotional support.  We invision a space for kids aged 12-20 years can come together to unplug and have a place to support one another 
                    </p>
                </Page>
                <Page header="Our Location" width="w-10/12">
                    <p class="text-center">
                        We are locating at:
                        <br/>
                        <a href="https://goo.gl/maps/tqq7vHsUBWuNCFkFA" class="text-primary-100 italic">5738 Pent Road, Paradise, CA 95969</a>
                        <iframe title="Map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d49075.08609076819!2d-121.6776222!3d39.7577776!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809cd3abfe28915f%3A0xcd5fcca3e2b3fe32!2sParadise%20Evangelical%20Free%20Church!5e0!3m2!1sen!2sus!4v1682561079702!5m2!1sen!2sus" width="{innerWidth < 500 ? 225 : 300}" height="150" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </p>
                </Page>
                
            </div>
        </Page>       
        <Page header="Announcement Board" center="text-center" width="w-9/12">
            {#if board}
                <Page header={board.subject}>
                    <p class="text-center italic">
                        {board.description}
                    </p>
                </Page>
            {:else}
                <p class='text-center italic'>
                    Stay tuned for the latest updates from the board!
                </p>
            {/if}
        </Page>
    </div>
</main>