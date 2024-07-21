<template>
    <div>
        <el-container>
            <el-header style="background-color: #c784d9">
                <img src="@/assets/logo.png" alt="" style="width: 60px; position: relative; top: 5px;">
                <span style="font-size: 20px; line-height:1.3; margin-left: 10px;  color: #b81548">イチゴ101</span>
                <el-dropdown style="float:right; height: 60px; line-height: 60px">
                    <span class="el-dropdown-link" style="color:white; font-size:16px">{{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item >
                            <div @click="logout()">ログアウト
                            </div>
                        </el-dropdown-item>

                    </el-dropdown-menu>
                </el-dropdown>

            </el-header>
        </el-container>


        <el-container>
            <el-aside style="overflow: hidden; min-height: 100vh; background-color: #efaed2; width: 200px">
                <!--                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">-->
                <el-menu :default-active="$route.path" router background-color="#efaed2" default-active="1"  text-color="#fff" active-text-color="#e83b74">
                    <el-menu-item index="/">
                        <i class="el-icon-menu"></i>
                        <span slot="title">トップページ</span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">情報管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/admin">管理者情報</el-menu-item>
                            <el-menu-item index="1-2">ユーザー情報</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i><span>情報管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/type">図書分類</el-menu-item>
                            <el-menu-item index="/book">図書情報</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                </el-menu>

            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Layout",

        data(){
            return{
                user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
            }
        },
        methods:{
            logout(){
                localStorage.removeItem("user");
                this.$router.push("/login");
            }
        }
    }
</script>

//去除侧边栏右侧小瑕疵
<style>
    .el-menu{
        border-right: none !important;
    }
</style>