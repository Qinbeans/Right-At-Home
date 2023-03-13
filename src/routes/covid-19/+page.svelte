<script lang="ts">
    import '$lib/styles/app.css'
    import Page from '$lib/components/page.svelte'
</script>

<main>
    <Page header="Covid-19 Policies">
        <Page header="Feeling sick?">
            <p class="text-center">
                If you are feeling sick, please stay home. We will be happy to see you when you are feeling better.
            </p>
            <p class="text-center">
                If it's urgent, please get tested before coming.
            </p>
        </Page>
        <Page header="Masks">
            <p class="text-center">
                As of right now, masks are not required. However, we do ask that you wear a mask if you are feeling sick and are so inclined to visit.
            </p>
        </Page>   
    </Page>
</main>