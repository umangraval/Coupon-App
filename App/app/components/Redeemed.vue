<template>
    <Page>
        <ActionBar title="My Redeemed Coupons">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back"
                @tap="$navigateBack" />
        </ActionBar>
        <GridLayout>
            <StackLayout>
            <FlexboxLayout class="h2" style="padding: 80px">
                <Label text="Balance: " />
                <Label :text="mycoins" />
            </FlexboxLayout>
            <ListView for="coupon in coupons" @itemTap="onResTap">
                <v-template>
                    <FlexboxLayout flexDirection="row">
                        <StackLayout>
                            <Label :text="coupon.restaurantname" />
                            <Label :text="coupon.mall"
                                style="color: gray; margin-left: 40px" />
                        </StackLayout>
                    </FlexboxLayout>
                </v-template>
            </ListView>
            </StackLayout>
            <ActivityIndicator :busy="isBusy" width="100" height="100" />
        </GridLayout>
    </Page>
</template>

<script>
    import Restaurent from "./Restaurent";
    export default {
        props: ["coupons", "mycoins"],
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
                    this.coupons[args.index].id
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