<template>
    <Page>
        <ActionBar title="Location">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back"
                @tap="$navigateBack" />
        </ActionBar>
        <GridLayout>
            <WebView :src="url" />
            <ActivityIndicator :busy="isBusy" width="100" height="100" />
        </GridLayout>
    </Page>
</template>

<script>
    export default {
        props: ["data"],
        data() {
            return {
                url: "",
                isBusy: true
            };
        },
        mounted() {
            var api =
                "https://leaflet-api.vercel.app?center=" +
                this.data.latitude +
                "," +
                this.data.longitude +
                "&zoom=17&marker=" +
                encodeURIComponent(this.data.mall) +
                "%7C" +
                this.data.latitude +
                "," +
                this.data.longitude +
                "&sensor=";
            this.url = api;
            setTimeout(() => {
                this.isBusy = false;
            }, 2000);
        }
    };
</script>

<style>
</style>