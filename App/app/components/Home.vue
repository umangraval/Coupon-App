<template>
    <Page>
        <ActionBar title="test">
            <StackLayout orientation="horizontal"
                ios:horizontalAlignment="center"
                android:horizontalAlignment="left">
                <Image src="https://i.ibb.co/ckHNRXL/logo.png" width="200px" />
            </StackLayout>
        </ActionBar>
        <StackLayout>
            <BottomNavigation height="100%">
                <TabStrip>
                    <TabStripItem>
                        <Label text="Home" class="h3" />
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="Malls" class="h3" />
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="Coins" class="h3" />
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="User" class="h3" />
                    </TabStripItem>
                </TabStrip>
                <TabContentItem>
                    <GridLayout>
                        <ListView for="feed in feeds" @itemTap="onResTap">
                            <v-template>
                                <StackLayout height="350">
                                    <Image :src="feed.imageurl" height="200"
                                        stretch="aspectFill" />
                                    <Label :text="feed.restaurantname"
                                        class="h2" />
                                    <Label :text="feed.title" class="h3" />
                                    <FlexboxLayout class="h3">
                                        <Label text="Coin: " />
                                        <Label :text="feed.coin" />
                                    </FlexboxLayout>
                                </StackLayout>
                            </v-template>
                        </ListView>
                        <ActivityIndicator :busy="isBusy" width="100"
                            height="100" />
                    </GridLayout>
                </TabContentItem>
                <TabContentItem>
                    <GridLayout>
                        <ListView for="mallname in malls"
                            @itemTap="onItemTap">
                            <v-template>
                                <FlexboxLayout flexDirection="row">
                                    <Label :text="mallname.mall" class="h3" />
                                </FlexboxLayout>
                            </v-template>
                        </ListView>
                        <ActivityIndicator :busy="isBusy" width="100"
                            height="100" />
                    </GridLayout>
                </TabContentItem>
                <TabContentItem>
                    <GridLayout>
                        <ListView for="filter in filters"
                            @itemTap="onFilterTap" style="height:100%">
                            <v-template>
                                <FlexboxLayout flexDirection="row">
                                    <Label :text="filter.name" class="h3" />
                                </FlexboxLayout>
                            </v-template>
                        </ListView>
                        <ActivityIndicator :busy="isBusy" width="100"
                            height="100" />
                    </GridLayout>
                </TabContentItem>
                <TabContentItem>
                    <GridLayout>
                        <StackLayout orientation="vertical">
                            <FlexboxLayout flexDirection="row"
                                style="padding: 60px">
                                <Image v-show="islogin" height="150"
                                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                                <Label v-show="islogin" :text="username"
                                    class="h1"
                                    style="width: 60%; margin-left: 10%" />
                            </FlexboxLayout>
                            <StackLayout>
                                <Button :text="islogin ? 'Logout' : 'Login'"
                                    @tap="submit" class="h3"
                                    style="background-color: lightblue; color: white" />
                                <Button v-show="islogin"
                                    text="My Redeemed Coupons"
                                    @tap="myCoupons" class="h3"
                                    style="background-color: gray; color: white" />
                            </StackLayout>
                        </StackLayout>
                        <ActivityIndicator :busy="isBusy" width="100"
                            height="100" />
                    </GridLayout>
                </TabContentItem>
            </BottomNavigation>
        </StackLayout>
    </Page>
</template>

<script>
    import Restaurents from "./Restaurents";
    import Restaurent from "./Restaurent";
    import Filter from "./Filter";
    import Login from "./Login";
    import Redeemed from "./Redeemed";

    export default {
        async mounted() {
            this.isBusy = true;
            var response = await fetch(global.baseUrl +
                "/restaurant/json");
            if (response.ok) {
                this.feeds = await response.json();
            } else {
                console.log(response.statusText);
            }
            this.isBusy = false;
        },

        methods: {
            onItemTap: async function(args) {
                this.isBusy = true;
                var response = await fetch(
                    global.baseUrl +
                    "/restaurant/malls/" +
                    encodeURIComponent(this.malls[args.index].mall)
                );
                if (response.ok) {
                    var resd = await response.json();
                    this.isBusy = false;
                    this.$navigateTo(Restaurents, {
                        transition: {},
                        props: {
                            mall: resd,
                            mallname: this.malls[args.index].mall
                        }
                    });
                } else {
                    console.log(response.statusText);
                }
            },

            onFilterTap: async function(args) {
                this.isBusy = true;
                var response = await fetch(
                    global.baseUrl +
                    "/restaurant/search?minCoin=" +
                    this.filters[args.index].min +
                    "&maxCoin=" +
                    this.filters[args.index].max
                );
                if (response.ok) {
                    var resd = await response.json();
                    this.isBusy = false;

                    this.$navigateTo(Filter, {
                        transition: {},
                        props: {
                            filtered: resd,
                            filter: args.item.name
                        }
                    });
                } else {
                    console.log(response.statusText);
                }
            },

            onResTap: async function(args) {
                this.isBusy = true;
                var response = await fetch(
                    global.baseUrl + "/restaurant/read/" + this.feeds[
                        args.index].id
                );
                if (response.ok) {
                    var resd = await response.json();
                    console.log(JSON.stringify(resd));
                    this.isBusy = false;
                    this.$navigateTo(Restaurent, {
                        transition: {},
                        props: {
                            details: resd
                        }
                    });
                } else {
                    console.log(response.statusText);
                }
            },

            submit: async function(args) {
                if (this.islogin) {
                    this.isBusy = true;
                    var response = await fetch(global.baseUrl +
                        "/user/logout/", {
                            method: "POST"
                        });
                    if (response.ok) {
                        global.isLoggingIn = false;
                        this.isBusy = false;
                        this.$navigateTo(Login, {
                            transition: {}
                        });
                        // var resd = await response.json();
                        console.log(global.uname);
                    } else {
                        console.log(response.statusText);
                    }
                } else {
                    this.$navigateTo(Login, {
                        transition: {}
                    });
                }
            },

            myCoupons: async function(args) {
                this.isBusy = true;
                var response = await fetch(
                    global.baseUrl + "/restaurants/getcoupons"
                );
                if (response.ok) {
                    var resd = await response.json();
                    this.isBusy = false;
                    this.$navigateTo(Redeemed, {
                        transition: {},
                        props: {
                            coupons: resd.restaurants,
                            mycoins: resd.coins
                        }
                    });
                } else {
                    console.log(response.statusText);
                }
            }
        },

        data() {
            return {
                isBusy: false,
                islogin: global.isLoggingIn,
                username: global.uname,
                feeds: [],
                malls: global.malldata,
                filters: [{
                        name: "Coins <= 300",
                        min: 0,
                        max: 300
                    },
                    {
                        name: "300 < Coins < 600",
                        min: 301,
                        max: 599
                    },
                    {
                        name: "Coins >=600",
                        min: 600,
                        max: 999999
                    }
                ]
            };
        }
    };
</script>

<style scoped>
    .home-panel {
        vertical-align: center;
        font-size: 20;
        margin: 15;
    }

    .description-label {
        margin-bottom: 15;
    }
</style>