<script lang="ts">
    import '$lib/styles/app.css'
    import Page from '$lib/components/page.svelte'
</script>

<main>
    <Page header="About">
        <Page header="Our Location" width="w-10/12">
            <p class="text-center">
                We are locating at 5738 Pent Road, Paradise, CA 95969
            </p>
        </Page>
        <Page header="Our Hour" width="w-10/12"> 
            <p class="text-center">
                We are open from 3:30-9pm, Monday-Saturday
        </Page>  
    </Page>
</main>