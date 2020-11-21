<template>
    <Page loaded="onPageLoaded">
        <ActionBar :title="mallname">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back"
                @tap="$navigateBack" />
        </ActionBar>
        <GridLayout>
            <ListView for="restaurant in mall" @itemTap="onResTap">
                <v-template>
                    <FlexboxLayout flexDirection="row">
                        <Label :text="restaurant.restaurantname" class="h3" />
                    </FlexboxLayout>
                </v-template>
            </ListView>
            <ActivityIndicator :busy="isBusy" width="100" height="100" />
        </GridLayout>
    </Page>
</template>

<script>
    import Restaurent from "./Restaurent";
    export default {
        props: ["mall", "mallname"],
        data() {
            return {
                isBusy: false
            };
        },
        methods: {
            onResTap: async function(args) {
                this.isBusy = true;
                var response = await fetch(
                    global.baseUrl + "/restaurant/read/" + this.mall[
                        args.index].id
                );
                if (response.ok) {
                    var resd = await response.json();
                    this.isBusy = false;
                    this.$navigateTo(Restaurent, {
                        transition: {},
                        props: {
                            details: resd
                        }
                    });
                    console.log(JSON.stringify(resd));
                } else {
                    console.log(response.statusText);
                }
            }
        }
    };
</script>

<style>
</style>