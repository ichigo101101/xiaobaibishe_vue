<template>
    <div>
        <div style="width: 400px; height: 350px; margin: 150px auto; background-color:rgba(245,180,201,0.54); border-radius: 10px">
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
                        <el-button style="width: 80%; margin-top: 10px; background-color: #f78eb4; color: white; border-color: transparent;" type="primary" @click="register()">新規登録</el-button>
                    </el-form-item>
                </el-form>

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