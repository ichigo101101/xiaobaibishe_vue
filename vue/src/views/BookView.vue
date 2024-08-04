<!--<template>-->
<!--    <div class="about">-->
<!--        <div>-->
<!--            <el-input v-model="params.name" style="width: 200px" placeholder="書名を入力してください"></el-input>-->
<!--            <el-input v-model="params.author" style="width: 200px; margin-left: 5px" placeholder="著者を入力してください"></el-input>-->
<!--            <el-button type="primary" style="margin-left: 10px" @click="findBySearch()">検索</el-button>-->
<!--            <el-button type="warning" @click="reset()">リセット</el-button>-->
<!--            <el-button type="primary" style="margin-left: 10px" @click="add()">追加</el-button>-->
<!--        </div>-->
<!--        <div>-->
<!--            <el-table :data="tableData" style="width: 100%; margin: 15px 0px">-->
<!--                <el-table-column prop="name" label="書名" ></el-table-column>-->
<!--                <el-table-column prop="img" label="表紙" >-->
<!--                    <template v-slot="scope">-->
<!--                        <el-image-->
<!--                                style="width: 70px; height: 70px; border-radius: 50%"-->
<!--                                :src="'http://localhost:8080/api/files/' + scope.row.img"-->
<!--                                :preview-src-list="['http://localhost:8080/api/files/' + scope.row.img]">-->
<!--                        </el-image>-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column prop="author" label="著者" ></el-table-column>-->
<!--                <el-table-column prop="price" label="価格" ></el-table-column>-->
<!--                <el-table-column prop="press" label="出版社" ></el-table-column>-->
<!--                <el-table-column prop="typeName" label="図書分類"></el-table-column>-->
<!--                <el-table-column label="図書紹介">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-button type="success" @click="viewEditor(scope.row.content)">点击查看</el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->

<!--                <el-table-column label="操作">-->
<!--                    <template slot-scope="scope">-->
<!--                        <span style="display: inline-block; width: 28%; margin-right: 10px; margin-bottom: 5px;">-->
<!--                            <el-button type="purple" @click="edit(scope.row)" size="mini">編集</el-button>-->
<!--                        </span>-->
<!--                        <span style="display: inline-block; width: 28%; margin-right: 10px; margin-bottom: 5px;">-->
<!--                            <el-popconfirm title="削除しますか？" @confirm="del(scope.row.id)">-->
<!--                                <el-button slot="reference" type="purple" size="mini">削除</el-button>-->
<!--                            </el-popconfirm>-->
<!--                        </span>-->
<!--                        <span style="display: inline-block; width: 100%; margin-bottom: 10px;">-->
<!--                            <el-button type="primary" @click="down(scope.row.img)" size="mini">ダウンロード</el-button>-->
<!--                        </span>-->
<!--                    </template>-->
<!--                </el-table-column>-->


<!--            </el-table>-->

<!--            <div style="margin-top: 10px">-->
<!--                <el-pagination-->
<!--                        @size-change="handleSizeChange"-->
<!--                        @current-change="handleCurrentChange"-->
<!--                        :current-page="params.pageNum"-->
<!--                        :page-sizes="[5, 10, 15, 20]"-->
<!--                        :page-size="params.pageSize"-->
<!--                        layout="total, sizes, prev, pager, next"-->
<!--                        :total="total">-->
<!--                </el-pagination>-->
<!--            </div>-->
<!--            <div>-->
<!--                <el-dialog title="情報を入力してください" :visible.sync="dialogFormVisible" width="50%">-->
<!--                    <el-form :model="form">-->
<!--                        <el-form-item label="書名" label-width="15%">-->
<!--                            <el-input v-model="form.name" autocomplete="off" style="width: 90%"></el-input>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="表紙" label-width="15%">-->
<!--                            <el-upload action="http://localhost:8080/api/files/upload" :on-success="successUpload">-->
<!--                                <el-button size="small" type="primary">アップロード</el-button>-->
<!--                            </el-upload>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="著者" label-width="15%">-->
<!--                            <el-input v-model="form.author" autocomplete="off" style="width: 90%"></el-input>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="価格" label-width="15%">-->
<!--                            <el-input v-model="form.price" autocomplete="off" style="width: 90%"></el-input>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="出版社" label-width="15%">-->
<!--                            <el-input v-model="form.press" autocomplete="off" style="width: 90%"></el-input>-->
<!--                        </el-form-item>-->


<!--                        <el-form-item label="図書分類" label-width="15%">-->
<!--                            <el-select v-model="form.typeId" placeholder="選んでください" style="width: 90%">-->
<!--                                <el-option v-for="item in typeObjs" :key="item.id" :label="item.name" :value="item.id"></el-option>-->
<!--                            </el-select>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="図書紹介" label-width="15%">-->
<!--                            <div id="editor" style="width: 90%"></div>-->
<!--                        </el-form-item>-->
<!--                    </el-form>-->
<!--                    <div slot="footer" class="dialog-footer">-->
<!--                        <el-button @click="dialogFormVisible = false">キャンセル</el-button>-->
<!--                        <el-button type="primary" @click="submit()">確認</el-button>-->
<!--                    </div>-->
<!--                </el-dialog>-->
<!--            </div>-->

<!--        </div>-->

<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    import request from "@/utils/request";-->
<!--    import E from 'wangeditor'-->

<!--    let editor-->
<!--    function initWangEditor(content) {	setTimeout(() => {-->
<!--        if (!editor) {-->
<!--            editor = new E('#editor')-->
<!--            editor.config.placeholder = '请输入内容'-->
<!--            editor.config.uploadFileName = 'file'-->
<!--            editor.config.uploadImgServer = 'http://localhost:8080/files/wang/upload'-->
<!--            editor.create()-->
<!--        }-->
<!--        editor.txt.html(content)-->
<!--    }, 0)-->
<!--    }-->

<!--    export default {-->
<!--        name: "BookView",-->
<!--        data() {-->
<!--            return {-->
<!--                // data里定义一个params-->
<!--                params: {-->
<!--                    name: '',-->
<!--                    author: '',-->
<!--                    pageNum: 1,-->
<!--                    pageSize: 5-->
<!--                },-->
<!--                tableData: [],-->
<!--                total: 0,-->
<!--                dialogFormVisible: false,-->
<!--                form: {},-->
<!--                typeObjs:[]-->
<!--            }-->
<!--        },-->
<!--        //页面加载的时候，做一些事情，在created里面-->
<!--        created() {-->
<!--            this.findBySearch();-->
<!--            this.findTypes();-->
<!--        },-->
<!--        //定义一些页面上控件触发的时间调用-->
<!--        methods: {-->
<!--            findTypes(){-->
<!--                request.get("/type").then(res =>{-->
<!--                    if(res.code === '0'){-->
<!--                        this.typeObjs = res.data;-->
<!--                    }else{-->
<!--                        this.$message.error(res.msg)-->
<!--                    }-->
<!--                })-->
<!--    },-->
<!--            // methods里定义一个findBySearch-->
<!--            findBySearch() {-->
<!--                request.get("/book/search", {-->
<!--                    params: this.params-->
<!--                }).then(res => {-->
<!--                    if (res.code === '0') {-->
<!--                        this.tableData = res.data.list;-->
<!--                        this.total = res.data.total;-->
<!--                    } else {-->
<!--                        // this.$message({-->
<!--                        //     message:res.msg,-->
<!--                        //     type:'error'-->
<!--                        // });-->
<!--                        this.$message.error(res.msg)-->

<!--                    }-->
<!--                })-->
<!--            },-->

<!--            reset() {-->
<!--                this.params = {-->
<!--                    pageNum: 1,-->
<!--                    pageSize: 5,-->
<!--                    name: '',-->
<!--                    author: ''-->
<!--                }-->
<!--                this.findBySearch();-->
<!--            },-->
<!--            handleSizeChange(pageSize) {-->
<!--                this.params.pageSize = pageSize;-->
<!--                this.findBySearch();-->
<!--            },-->
<!--            handleCurrentChange(pageNum) {-->
<!--                this.params.pageNum = pageNum;-->
<!--                this.findBySearch();-->
<!--            },-->
<!--            add() {-->
<!--                this.form = {};-->
<!--                initWangEditor("");-->
<!--                this.dialogFormVisible = true;-->
<!--            },-->
<!--            edit(obj) {-->
<!--                this.form = obj;-->
<!--                this.dialogFormVisible = true;-->
<!--            },-->
<!--            submit() {-->
<!--                this.form.content = editor.txt.html();-->
<!--                request.post("/book", this.form).then(res => {-->
<!--                    if (res.code === '0') {-->
<!--                        this.$message({-->
<!--                            message: '操作が完了しました',-->
<!--                            type: 'success'-->
<!--                        });-->
<!--                        this.dialogFormVisible = false;-->
<!--                        this.findBySearch();-->
<!--                    } else {-->
<!--                        this.$message({-->
<!--                            message: res.msg,-->
<!--                            type: 'error'-->
<!--                        });-->
<!--                    }-->
<!--                })-->
<!--            },-->
<!--            del(id) {-->
<!--                request.delete("/book/" + id).then(res => {-->
<!--                    if (res.code === '0') {-->
<!--                        this.$message({-->
<!--                            message: '削除しました',-->
<!--                            type: 'success'-->
<!--                        });-->
<!--                        this.findBySearch();-->
<!--                    } else {-->
<!--                        this.$message({-->
<!--                            message: res.msg,-->
<!--                            type: 'error'-->
<!--                        });-->
<!--                    }-->
<!--                })-->
<!--            },-->
<!--            successUpload(res) {-->
<!--                this.form.img = res.data;-->
<!--            },-->
<!--            down(flag) {-->
<!--                location.href = 'http://localhost:8080/api/files/' + flag-->
<!--            }-->
<!--        }-->

<!--    }-->
<!--</script>-->

<template>
    <div>
        <div style="margin-bottom: 15px">
            <el-input v-model="params.name" style="width: 200px" placeholder="書名を入力してください"></el-input>
            <el-input v-model="params.author" style="width: 200px; margin-left: 5px" placeholder="著者を入力してください"></el-input>
            <el-button type="warning" style="margin-left: 10px" @click="findBySearch()">検索</el-button>
            <el-button type="warning" style="margin-left: 10px" @click="reset()">リセット</el-button>
            <el-button type="primary" style="margin-left: 10px" @click="add()" v-if="user.role !== 'ROLE_STUDENT'">追加</el-button>
        </div>
        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="表紙">
                    <template v-slot="scope">
                        <el-image
                                style="width: 70px; height: 70px; border-radius: 50%"
                                :src="'http://localhost:8080/api/files/' + scope.row.img"
                                :preview-src-list="['http://localhost:8080/api/files/' + scope.row.img]">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="書名"></el-table-column>
                <el-table-column label="図書紹介">
                    <template slot-scope="scope">
                        <el-button type="success" @click="viewEditor(scope.row.content)">点击查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="author" label="作者"></el-table-column>
                <el-table-column prop="price" label="価格"></el-table-column>
                <el-table-column prop="press" label="出版社"></el-table-column>
                <el-table-column prop="typeName" label="カテゴリー"></el-table-column>

<!--                <el-table-column label="操作" width="240px">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-button type="primary" @click="edit(scope.row)" v-if="user.role === 'ROLE_ADMIN'">編集</el-button>-->
<!--                        <el-button type="primary" @click="down(scope.row.img)">ダウンロード</el-button>-->
<!--                        <el-popconfirm title="削除しますか？" @confirm="del(scope.row.id)">-->
<!--                            <el-button slot="reference" type="danger" style="margin-left: 5px" v-if="user.role === 'ROLE_ADMIN'">削除</el-button>-->
<!--                        </el-popconfirm>-->
<!--                    </template>-->
<!--                </el-table-column>-->

                <el-table-column label="操作">
                    <template slot-scope="scope">
                                        <span style="display: inline-block; width: 28%; margin-right: 10px; margin-bottom: 5px;">
                                            <el-button type="purple" @click="edit(scope.row)" size="mini">編集</el-button>
                                        </span>
                        <span style="display: inline-block; width: 28%; margin-right: 10px; margin-bottom: 5px;">
                                            <el-popconfirm title="削除しますか？" @confirm="del(scope.row.id)">
                                                <el-button slot="reference" type="purple" size="mini">削除</el-button>
                                            </el-popconfirm>
                                        </span>
                        <span style="display: inline-block; width: 100%; margin-bottom: 10px;">
                                            <el-button type="primary" @click="down(scope.row.img)" size="mini">ダウンロード</el-button>
                                        </span>
                    </template>
                </el-table-column>


            </el-table>
        </div>
        <div style="margin-top: 10px">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="params.pageNum"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="params.pageSize"
                    layout="total, sizes, prev, pager, next"
                    :total="total">
            </el-pagination>
        </div>
        <div>
            <el-dialog title="情報を入力してください" :visible.sync="dialogFormVisible" width="50%">
                <el-form :model="form">
                    <el-form-item label="書名" label-width="15%">
                        <el-input v-model="form.name" autocomplete="off" style="width: 90%"></el-input>
                    </el-form-item>
                    <el-form-item label="表紙" label-width="15%">
                        <el-upload action="http://localhost:8080/api/files/upload" :on-success="successUpload">
                            <el-button size="small" type="primary">アップロード</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="作者" label-width="15%">
                        <el-input v-model="form.author" autocomplete="off" style="width: 90%"></el-input>
                    </el-form-item>
                    <el-form-item label="価格" label-width="15%">
                        <el-input v-model="form.price" autocomplete="off" style="width: 90%"></el-input>
                    </el-form-item>
                    <el-form-item label="出版社" label-width="15%">
                        <el-input v-model="form.press" autocomplete="off" style="width: 90%"></el-input>
                    </el-form-item>
                    <el-form-item label="图书分类" label-width="15%">
                        <el-select v-model="form.typeId" placeholder="選択してください" style="width: 90%">
                            <el-option v-for="item in typeObjs" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="図書紹介" label-width="15%">
                        <div id="editor" style="width: 90%"></div>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="submit()">確認</el-button>
                </div>
            </el-dialog>
        </div>
        <el-dialog title="図書紹介" :visible.sync="editorVisible" width="50%">
            <div v-html="this.viewData" class="w-e-text"></div>
        </el-dialog>
    </div>
</template>

<script>
    import request from "@/utils/request";
    import E from 'wangeditor'

    let editor
    function initWangEditor(content) {	setTimeout(() => {
        if (!editor) {
            editor = new E('#editor')
            editor.config.placeholder = '内容を入力してください'
            editor.config.uploadFileName = 'file'
            editor.config.uploadImgServer = 'http://localhost:8080/api/files/wang/upload'
            editor.create()
        }
        editor.txt.html(content)
    }, 0)
    }

    export default {
        data() {
            return {
                params: {
                    name: '',
                    author: '',
                    pageNum: 1,
                    pageSize: 5
                },
                tableData: [],
                total: 0,
                dialogFormVisible: false,
                editorVisible: false,
                form: {},
                typeObjs: [],
                viewData: '',
                user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
            }
        },
        // 页面加载的时候，做一些事情，在created里面
        created() {
            this.findBySearch();
            this.findTypes();
        },
        // 定义一些页面上控件出发的事件调用的方法
        methods: {
            findTypes() {
                request.get("/type").then(res => {
                    if (res.code === '0') {
                        this.typeObjs = res.data;
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            findBySearch() {
                request.get("/book/search", {
                    params: this.params
                }).then(res => {
                    if (res.code === '0') {
                        this.tableData = res.data.list;
                        this.total = res.data.total;
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            add() {
                this.form = {};
                initWangEditor("");
                this.dialogFormVisible = true;
            },
            edit(obj) {
                this.form = obj;
                initWangEditor(obj.content ? this.form.content : "");
                this.dialogFormVisible = true;
            },
            viewEditor(data) {
                this.viewData = data;
                this.editorVisible = true;
            },
            reset() {
                this.params = {
                    pageNum: 1,
                    pageSize: 5,
                    name: '',
                    phone: ''
                }
                this.findBySearch();
            },
            handleSizeChange(pageSize) {
                this.params.pageSize = pageSize;
                this.findBySearch();
            },
            handleCurrentChange(pageNum) {
                this.params.pageNum = pageNum;
                this.findBySearch();
            },
            submit() {
                this.form.content = editor.txt.html();
                request.post("/book", this.form).then(res => {
                    if (res.code === '0') {
                        this.$message.success("操作が完了しました");
                        this.dialogFormVisible = false;
                        this.findBySearch();
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            del(id) {
                request.delete("/book/" + id).then(res => {
                    if (res.code === '0') {
                        this.$message.success("削除しました");
                        this.findBySearch();
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            successUpload(res) {
                this.form.img = res.data;
            },
            down(flag) {
                location.href = 'http://localhost:8080/api/files/' + flag
            }

        }
    }
</script>

