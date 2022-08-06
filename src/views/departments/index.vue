<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <tree-tools @add="showAdd" :isRoot="true" :treeNode="compey" />
        <el-tree :data="treeData" default-expand-all :props="defaultProps">
          <template v-slot="{ data }">
            <!--  -->
            <tree-tools
              @edit="showEdit"
              @add="showAdd"
              @remove="DeptsList"
              :treeNode="data"
            />
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 弹出层 -->
    <add-dept
      ref="AddDept"
      @add-success="DeptsList"
      :visible.sync="dialogVisible"
      :AddDeptNode="AddDeptNode"
    />
  </div>
</template>

<script>
import { getDeptsApi } from '@/api/departments.js'
import treeTools from '@/components/tree-tools.vue'
import { transListToTree } from '@/utils'
import AddDept from '@/components/addDept.vue'
export default {
  components: { treeTools, AddDept },
  data() {
    return {
      treeData: [
        {
          name: '总裁办',
          children: [{ name: '董事会' }],
        },
        { name: '行政部' },
        { name: '人事部' },
      ],
      defaultProps: {
        label: 'name',
      },
      compey: { name: '传智教育', manager: '负责人' },
      AddDeptNode: {},
      dialogVisible: false,
      loading: false,
    }
  },

  created() {
    this.DeptsList()
  },

  methods: {
    async DeptsList() {
      this.loading = true
      const res = await getDeptsApi()
      this.treeData = transListToTree(res.depts, '')
      this.loading = false
    },
    showAdd(val) {
      this.dialogVisible = true
      this.AddDeptNode = val
    },
    showEdit(val) {
      this.dialogVisible = true
      this.$refs.AddDept.getDeptById(val.id)
    },
  },
}
</script>

<style scoped lang="less"></style>
