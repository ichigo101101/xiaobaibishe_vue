<template>
    <div>
        <div style="width: 400px; height: 400px; margin: 120px auto; background-color:rgba(245,180,201,0.54); border-radius: 10px">
            <div style="width: 100%; height: 100px; font-size: 30px; line-height: 100px; text-align: center; color: #d04a70">新規登録歓迎</div>
            <div style="margin-top: 25px; text-align: center; height: 320px;">
                <el-form :model="admin">
                    <el-form-item>
                        <el-input v-model="admin.name" prefix-icon="el-icon-user" style="width: 80%" placeholder="ユーザー名を入力してください"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="admin.password" prefix-icon="el-icon-lock" style="width: 80%" placeholder="パスワードを入力してください"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="admin.role" placeholder="選んでください" style="width: 80%">
                            <el-option label="教員" value="ROLE_TEACHER"></el-option>
                            <el-option label="学生" value="ROLE_STUDENT"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="width: 80%; margin-top: 10px; background-color: #f78eb4; color: white; border-color: transparent;" type="primary" @click="register()">新規登録</el-button>
                    </el-form-item>

                </el-form>

            </div>
            <div style="text-align: center">
                アカウントをお持ちですか？<a href="javascript:void(0)" style="text-decoration: none" @click="navLogin">ログインしてください</a>
            </div>
        </div>
    </div>
</template>

<script>

    import request from "@/utils/request";

    export default {
        name: "Register",
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
            // navLogin() {
            //     this.$router.push("/login")
            // },
            navLogin() {
                // 检查当前路由是否已经是 '/login'
                if (this.$router.currentRoute.path !== '/login') {
                    this.$router.push('/login'); // 执行导航操作
                }
            },
            register() {
                request.post("/admin/register", this.admin).then(res => {
                    if (res.code === '0') {
                        this.$message({
                            message: '登録完了',
                            type: 'success'
                        });
                        this.$router.push("/login");
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