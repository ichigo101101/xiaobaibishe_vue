<template>
    <div>
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
                admin: {}
            }
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
                request.post("/admin/login", this.admin).then(res => {
                    if (res.code === '0') {
                        this.$message({
                            message: 'ログイン完了',
                            type: 'success'
                        });
                        localStorage.setItem("user",JSON.stringify(res.data));
                        this.$router.push("/");
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                })
            }
        }
    }
</script>