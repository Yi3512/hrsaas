<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button type="primary" @click="addDialogVisible = true"
            >新增按钮</el-button
          >
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" label="序号" width="80px">
            </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              layout="sizes,prev, pager, next"
              :page-size="pageSize"
              :page-sizes="[3, 5, 10, 20]"
              :total="total"
              @current-change="currentChange"
              @size-change="handleSizeChange"
            >
            </el-pagination>
          </div>
          <el-dialog title="提示" :visible.sync="addDialogVisible" width="50%">
            <el-form
              :model="addRoleForm"
              :rules="addRoleFormRules"
              ref="form"
              label-width="80px"
            >
              <el-form-item label="角色名称" prop="name">
                <el-input v-model="addRoleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="角色描述">
                <el-input v-model="addRoleForm.description"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="onClose">取 消</el-button>
              <el-button type="primary" @click="onAddRule">确 定</el-button>
            </span>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input v-model="companyInfo.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                v-model="companyInfo.companyAddress"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input v-model="companyInfo.mailbox" disabled></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyInfo.remarks" disabled></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getRulesApi, setRulesApi, getCompanyInfoApi } from '@/api/setting'
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 0,
      pageSize: 2,
      page: 1,
      addDialogVisible: false,
      addRoleForm: {
        name: '',
        description: '',
      },
      addRoleFormRules: {
        name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
      },
      companyInfo: '',
    }
  },

  created() {
    this.getRules()
    this.getCompanyInfo()
  },

  methods: {
    async getRules() {
      const { rows, total } = await getRulesApi({
        page: 1,
        pagesize: this.pageSize,
      })
      this.tableData = rows
      this.total = total
      console.log(total)
    },
    currentChange(val) {
      this.page = val
      this.getRules()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getRules()
    },
    onClose() {
      this.addDialogVisible = false
    },
    async onAddRule() {
      await this.$refs.form.validate()
      await setRulesApi(this.addRoleForm)
      this.$message.success('添加成功')
      this.addDialogVisible = false
      this.getRules()
    },
    // 监听对话框关闭
    dialogClose() {
      this.$refs.form.resetFields()
      this.addRoleForm.region = ''
    },
    async getCompanyInfo() {
      const res = await getCompanyInfoApi(
        this.$store.state.user.userInfo.companyId,
      )
      this.companyInfo = res
      console.log(res)
    },
  },
}
</script>

<style scoped lang="less"></style>
