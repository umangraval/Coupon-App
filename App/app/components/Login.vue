<template>
    <Page>
        <ActionBar title="Login" />
        <StackLayout orientation="vertical"
            style="padding: 30px;text-align: center;">
            <TextField class="input" hint="username" autocorrect="false"
                autocapitalizationType="none" v-model="user.username"
                returnKeyType="next" fontSize="18" />
            <StackLayout class="hr-light" />
            <TextField ref="password" class="input" hint="Password"
                secure="true" v-model="user.password"
                :returnKeyType="isLoggingIn ? 'done' : 'next'"
                fontSize="18" />
            <StackLayout class="hr-light" />
            <Button text="Log In" @tap="submit" class="btn btn-primary m-t-20"
                style="background-color: lightblue; color: white" />
            <Button text="Home" @tap="goHome" class="btn btn-primary m-t-20"
                style="background-color: gray; color: white" />
        </StackLayout>
    </Page>
</template>

<script>
    import Home from "./Home";
    export default {
        data() {
            return {
                user: {
                    username: "boss",
                    password: "123456"
                }
            };
        },
        methods: {
            submit: async function(args) {
                if (!this.user.username || !this.user.password) {
                    this.alert(
                        "Please provide both an username and password."
                        );
                    return;
                }
                var response = await fetch(global.baseUrl +
                "/user/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.user)
                });
                var resd = await response.json();
                if (response.ok) {
                    global.isLoggingIn = true;
                    global.uname = this.user.username;
                    console.log(global.uname);
                    this.$navigateTo(Home, {
                        transition: {}
                    });
                } else {
                    await alert({
                        title: resd,
                        okButtonText: "Ok"
                    });
                }
            },
            goHome: function() {
                this.$navigateTo(Home, {
                    transition: {}
                });
            }
        }
    };
</script>

<style>
</style>