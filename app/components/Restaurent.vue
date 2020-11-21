<template>
    <Page @loaded="checkredeem">
        <ActionBar title="Details">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back"
                @tap="$navigateBack" />
        </ActionBar>
        <GridLayout>
            <StackLayout orientation="vertical">
                <Image :src="details.imageurl" />
                <WrapLayout orientation="horizontal" width="100%"
                    style="padding: 60px">
                    <Label :text="details.restaurantname" class="h1"
                        width="100%" />

                    <Label :text="details.title" width="100%" />
                    <Label text="Mall: " width="20%" />
                    <Label :text="details.mall" width="60%" />
                    <Label text="Coin: " width="20%" />
                    <Label :text="details.coin" width="60%" />
                    <Label text="Expiry Date: " width="20%" />
                    <Label :text="details.validity" width="60%" />
                    <Label text="Region: " width="20%" />
                    <Label :text="details.region" width="60%" />
                    <Label text="Details: " width="20%" />
                    <Label :text="details.details" />
                </WrapLayout>
                <FlexboxLayout>
                    <Button v-show="islogin && redeem" text="Redeem"
                        @tap="onRedeem"
                        style="background-color: green; color: white; width: 50%" />
                    <Button text="Address" @tap="onAddress"
                        style="background-color: gray; color: white; width: 50%" />
                </FlexboxLayout>
            </StackLayout>
            <ActivityIndicator :busy="isBusy" width="100" height="100" />
        </GridLayout>
    </Page>
</template>

<script>
    import Address from "./Address";
    import Home from "./Home";
    export default {
        props: ["details"],

        data() {
            return {
                islogin: global.isLoggingIn,
                redeem: false,
                isBusy: false
            };
        },

        methods: {
            checkredeem: async function() {
                this.isBusy = true;
                var response = await fetch(
                    global.baseUrl + "/restaurants/checkredeem/" +
                    this.details.id
                );
                if (response.ok) {
                    this.redeem = true;
                } else {
                    console.log(response.statusText);
                }
                this.isBusy = false;
            },
            onRedeem: async function() {
                var result = await confirm({
                    title: "Are you sure?",
                    message: "To redeem this coupon?",
                    okButtonText: "Yes",
                    cancelButtonText: "No"
                });
                if (result) {
                    var response = await fetch(
                        global.baseUrl + "/restaurants/redeem/" + this
                        .details.id
                    );
                    var data = await response.json();
                    if (response.ok) {
                        await alert({
                            title: "Redeemed Successfully",
                            okButtonText: "Ok"
                        });
                        this.$navigateTo(Home, {
                            transition: {}
                        });
                    } else {
                        await alert({
                            title: data,
                            okButtonText: "Ok"
                        });
                    }
                }
            },

            onAddress: function() {
                var data = global.malldata.filter(
                    function(p) {
                        return p.mall == this.details.mall;
                    }.bind(this)
                );
                console.log(data[0].mall);

                this.$navigateTo(Address, {
                    transition: {},
                    props: {
                        data: data[0]
                    }
                });
            }
        }
    };
</script>

<style>
</style>