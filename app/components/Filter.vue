<template>
    <Page loaded="onPageLoaded">
        <ActionBar :title="filter">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back"
                @tap="$navigateBack" />
        </ActionBar>
        <GridLayout>
            <ListView for="restaurant in filtered" @itemTap="onResTap">
                <v-template>
                    <FlexboxLayout flexDirection="row">
                        <StackLayout>
                            <Label :text="restaurant.restaurantname" />
                            <Label :text="restaurant.mall"
                                style="color: gray; margin-left: 40px" />
                        </StackLayout>
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
        props: ["filtered", "filter"],

        data() {
            return {
                isBusy: false
            };
        },

        methods: {
            onResTap: async function(args) {
                this.isBusy = true;
                var response = await fetch(
                    global.baseUrl +
                    "/restaurant/read/" +
                    this.filtered[args.index].id
                );
                if (response.ok) {
                    var resd = await response.json();
                    this.isBusy = false;
                    console.log(JSON.stringify(resd));
                    this.$navigateTo(Restaurent, {
                        transition: {},
                        props: {
                            details: resd
                        }
                    });
                } else {
                    console.log(response.statusText);
                }
            }
        }
    };
</script>

<style>
</style>