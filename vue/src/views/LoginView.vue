<template>
    <div class="login-container">
        <div style="width: 400px; height: 400px; margin: 120px auto; background-color:rgba(234,130,161,0.54); border-radius: 10px">
            <div style="width: 100%; height: 100px; font-size: 30px; line-height: 100px; text-align: center; color: #d04a70">ログイン歓迎</div>
            <div style="margin-top: 25px; text-align: center; height: 320px;">
                <el-form :model="admin">
                    <el-form-item>
                        <el-input v-model="admin.name" prefix-icon="el-icon-user" style="width: 80%" placeholder="ユーザー名を入力してください"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="admin.password" show-password prefix-icon="el-icon-lock" style="width: 80%" placeholder="パスワードを入力してください"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="admin.role" placeholder="選んでください" style="width: 80%">
<!--                            <el-option label="教師" value="ROLE_TEACHER"></el-option>-->
<!--                            <el-option label="学生" value="ROLE_STUDENT"></el-option>-->
                            <el-option label="管理者" value="ROLE_ADMIN"></el-option>
                            <el-option label="ユーザー" value="ROLE_USER"></el-option>
                        </el-select>
                    </el-form-item>
<!--                    <el-form-item>-->
<!--                        <div style="display: flex; justify-content: center">-->
<!--                            <el-input v-model="admin.verCode" prefix-icon="el-icon-user" style="width: 42%; margin-right: 10px" placeholder="認証コードを入力してください"></el-input>-->
<!--                            <img :src="captchaUrl" @click="clickImg()" width="140px" height="33px" />-->
<!--                        </div>-->
<!--                    </el-form-item>-->
                    <el-form-item>
                        <el-button style="width: 80%; margin-top: 10px; background-color: #f78eb4; color: white; border-color: transparent;" type="primary" @click="login()">ログイン</el-button>
                    </el-form-item>
                </el-form>

            </div>
            <div style="text-align: center">
                未登録ですか？<a href="javascript:void(0)" style="text-decoration: none" @click="navRegister">登録してください</a>
            </div>
        </div>
    </div>
</template>

<script>

    import request from "@/utils/request";

    export default {
        name: "Login",
        data() {
            return {
                admin: {},
                key:'',
                captchaUrl:''
            }
        },
        // mounted() {
        //     this.key = Math.random();
        //     this.captchaUrl = 'http://localhost:8080/api/captcha?key=' + this.key;
        // },
        mounted() {
            this.key = Math.random();
            this.captchaUrl = 'http://localhost:8080/api/captcha?key=' + this.key;
        },
        // 页面加载的时候，做一些事情，在created里面
        created() {
        },
        // 定义一些页面上控件出发的事件调用的方法
        methods: {
            navRegister() {
                this.$router.push("/register")
            },
            login() {
                request.post(`/admin/login?key=${this.key}`, this.admin).then(res => {
                    if (res.code === '0') {
                        this.$message.success("ログイン完了");
                        localStorage.setItem("user", JSON.stringify(res.data));
                        this.$router.push("/");
                    } else {
                        this.$message.error(res.msg);
                        this.key = Math.random();
                        this.captchaUrl = 'http://localhost:8080/api/captcha?key=' + this.key;
                        this.admin.verCode = '';
                    }
                });
            },

            // login() {
            //     request.post("/admin/login?key=" + this.key, this.admin).then(res => {
            //         if (res.code === '0') {
            //             this.$message.success("ログイン完了");
            //             localStorage.setItem("user", JSON.stringify(res.data));
            //             this.$router.push("/");
            //         } else {
            //             this.$message.error(res.msg);
            //             this.key = Math.random();
            //             this.captchaUrl = 'http://localhost:8080/api/captcha?key=' + this.key;
            //             this.admin.verCode = ''
            //         }
            //     })
            // },
            // clickImg() {
            //     this.key = Math.random();
            //     this.captchaUrl = 'http://localhost:8080/api/captcha?key=' + this.key;
            // },
            clickImg() {
                this.key = Math.random();
                this.captchaUrl = 'http://localhost:8080/api/captcha?key=' + this.key;
            },

        }
    }
</script>

<style scoped>
    .login-container{
        height:100vh;
        overflow:hidden;
        background-image:url("@/assets/login_bg.jpg");
        background-size: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>