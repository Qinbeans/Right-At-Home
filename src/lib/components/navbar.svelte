<script lang="ts">
    import { nav_state, NavState } from "../ts/store";
    import { get_state } from "../ts/tool";
    import { onMount } from "svelte";
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

    onMount(() => {
        get_state();
    });
    storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

    export let hyperlinks = [
        {
            name: "Home",
            href: "/",
            state: NavState.Home
        },
        {
            name: "About",
            href: "/about",
            state: NavState.About

        },
        {
            name: "Contact",
            href: "/contact",
            state: NavState.Contact
        }
    ]

    export let name = "Title";
    let nav:NavState = NavState.None;

    nav_state.subscribe((value: NavState) => {
        nav = value;
    });

    const select = (target: Event) => {
        const id = (target.target as HTMLElement).id;
        nav_state.set(parseInt(id));
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
                {#if nav == hyperlink.state}
                    <a on:click={select} id="{hyperlink.state.toString()}" href={hyperlink.href} class="nav nav-selected">{hyperlink.name}</a>
                {:else}
                    <a on:click={select} id="{hyperlink.state.toString()}" href={hyperlink.href} class="nav nav-unselected">{hyperlink.name}</a>
                {/if}
            </li>
        {/each}
    </ul>
</div>

<AppBar background="py-1 mt-2 mx-1 bg-tertiary-30 rounded border border-solid border-text-100">
    <svelte:fragment slot="lead">
        <button class="flex mx-3 nav-menu-button py-2 pl-2 rounded-full bg-secondary-100 border border-solid border-text-100" use:popup={settings}>
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

