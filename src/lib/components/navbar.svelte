<script lang="ts">
    import { Avatar } from '@skeletonlabs/skeleton';
    import Logo from '../images/logo.png';
    import { AppBar } from '@skeletonlabs/skeleton';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
    import { storePopup } from '@skeletonlabs/skeleton';
    import '@skeletonlabs/skeleton/styles/elements/popups.css';
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import AiFillCaretDown from 'svelte-icons-pack/ai/AiFillCaretDown.js';
    import AiOutlineMenu from 'svelte-icons-pack/ai/AiOutlineMenu.js';
	import { goto } from '$app/navigation';

    storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

    export let hyperlinks = [
        {
            name: "Home",
            href: "/",
            id: "home",
        },
        {
            name: "About",
            href: "/about",
            id: "about",
        },
        {
            name: "Contact",
            href: "/contact",
            id: "contact",
        }
    ]

    export let name = "Title";
    export let current = "home";

    const select = (target: Event) => {
        const id = (target.target as HTMLElement).id;
        //get the hyperlink with the id
        const hyperlink = hyperlinks.find(hyperlink => hyperlink.id == id);
        //set the hyperlink as the current hyperlink
        if (hyperlink)
            goto(hyperlink.href);
    }

    const settings: PopupSettings = {
        event: "click",
        target: "nav-menu"
    }

</script>

<div class="bg-secondary-70 p-1 border border-solid border-text-100 rounded" data-popup="nav-menu">
    <ul class="flex flex-col items-center">
        {#each hyperlinks as hyperlink}
            <li class="my-1">
                {#if current == hyperlink.id}
                    <a on:click={select} id="{hyperlink.id}" href={hyperlink.href} class="nav nav-selected">{hyperlink.name}</a>
                {:else}
                    <a on:click={select} id="{hyperlink.id}" href={hyperlink.href} class="nav nav-unselected">{hyperlink.name}</a>
                {/if}
            </li>
        {/each}
    </ul>
</div>

<AppBar background="py-1 mt-2 mx-1 bg-tertiary-30 rounded border border-solid border-text-100">
    <svelte:fragment slot="lead">
        <button class="flex mx-3 nav-menu-button py-3 pr-2 pl-4 rounded-full bg-secondary-100 border border-solid border-text-100" use:popup={settings}>
            <Icon className="" src={AiOutlineMenu}/>
            <Icon className="" src={AiFillCaretDown}/>
        </button>
    </svelte:fragment>
    <div class="grid place-content-center">
        <div class="nav-title-wrapper">
            <h1 class="nav-title">{name}</h1>
        </div>
    </div>
    <svelte:fragment slot="trail">
        <Avatar src={Logo}/>
    </svelte:fragment>
</AppBar>

