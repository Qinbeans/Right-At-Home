<script lang="ts">
    /** @type {import('./$types').PageData} */
    export let data;
    let url = data.url;
    let key = data.key;
    
    import '$lib/styles/app.css'
    import Page from '$lib/components/page.svelte'
    import { Toast, toastStore } from '@skeletonlabs/skeleton';
    import type { ToastSettings } from '@skeletonlabs/skeleton';
    import { createClient } from '@supabase/supabase-js';

    let contact_results = [false,false,false]

    const upload_contact = async (contact: any) => {
        let client = createClient(url,key)
        let { data, error } = await client.from('contact').insert(contact);
        if (error) {
            throw error;
        }
    }

    const serializeResponse = () => {
        let contactInfo = document.getElementById("contact-info") as HTMLInputElement;
        let contactSubject = document.getElementById("contact-subject") as HTMLInputElement;
        let contactMessage = document.getElementById("contact-message") as HTMLTextAreaElement;
        let submit = document.getElementById("contact-submit") as HTMLButtonElement;

        const response = {
            email: contactInfo.value,
            subject: contactSubject.value,
            message: contactMessage.value
        }

        contactInfo.value = "";
        contactSubject.value = "";
        contactMessage.value = "";

        contact_results = [false,false,false]
        submit.hidden = true;
        try {
            upload_contact(response);
        } catch (error) {
            const t: ToastSettings = {
                message: '👋 Looks like something went wrong, please try again later!',
                // Optional: The auto-hide settings
                autohide: true,
                timeout: 5000,
                background: 'bg-error-60',

            };
            toastStore.trigger(t);
            return
        }
        const t: ToastSettings = {
            message: '👋 Thanks for contacting us, we will get back to you soon!',
            // Optional: The auto-hide settings
            autohide: true,
            timeout: 5000,
            background: 'bg-ok-60',

        };
        toastStore.trigger(t);
    }

    const checkValid = () => {
        let email = document.getElementById("contact-info") as HTMLInputElement;
        let subject = document.getElementById("contact-subject") as HTMLInputElement;
        let message = document.getElementById("contact-message") as HTMLTextAreaElement;
        let submit = document.getElementById("contact-submit") as HTMLButtonElement;

        if (email.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            contact_results[0] = true
        } else {
            const t: ToastSettings = {
                message: 'Please enter a valid email address!',
                // Optional: The auto-hide settings
                autohide: true,
                timeout: 5000,
                background: 'bg-error-60',

            };
            toastStore.trigger(t);
            return;
        }
        if (subject.value.length > 0  && subject.value.length < 10){
            contact_results[1] = true
        } else {
            const t: ToastSettings = {
                message: 'Please enter a subject!',
                // Optional: The auto-hide settings
                autohide: true,
                timeout: 5000,
                background: 'bg-error-60',

            };
            toastStore.trigger(t);
            return;
        }
        if (message.value.length > 0){
            contact_results[2] = true;
        } else {
            const t: ToastSettings = {
                message: 'Please enter a message!',
                // Optional: The auto-hide settings
                autohide: true,
                timeout: 5000,
                background: 'bg-error-60',

            };
            toastStore.trigger(t);
            return;
        }
        submit.hidden = !(contact_results[0] && contact_results[1] && contact_results[2])
    }
</script>

<Toast />

<main>
    <Page header="Contact">
        <ul class="flex flex-col justify-center border border-solid border-text-100 rounded p-2 bg-secondary-100">
            <li>
                <ul class="flex flex-row">
                    <li>
                        <ul class="flex flex-col mr-2">
                            <li class="my-2">
                                <label for="contact-info">Email</label>
                            </li>
                            <li class="my-2">
                                <label for="contact-subject">Subject</label>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul class="flex flex-col">
                            <li class="my-1">
                                <input placeholder="Email" class="contact-form" type="email" name="contact-info" id="contact-info" on:change={checkValid}>
                            </li>
                            <li class="my-1">
                                <input placeholder="Subject" class="contact-form" type="text" name="contact-subject" id="contact-subject" on:change={checkValid}>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li class="mt-1 text-center">
                <label for="contact-message">Message</label>
            </li>
            <li class="mb-1 w-full">
                <textarea class="w-full contact-form" name="contact-message" id="contact-message" cols="30" rows="10" on:change={checkValid}></textarea>
            </li>
            <li class="text-center">
                <button id="contact-submit" class="contact-form" hidden on:click={serializeResponse}>Submit</button>
            </li>
        </ul>
    </Page>
</main>