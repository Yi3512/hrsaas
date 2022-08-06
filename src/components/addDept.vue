<template>
  <el-dialog title="添加部门" @close="onClose" :visible="visible" width="50%">
    <el-form
      :model="formData"
      :rules="formRules"
      ref="form"
      label-width="100px"
    >
      <el-form-item prop="name" label="部门名称">
        <el-input v-model="formData.name" placeholder="输入部门名称"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="输入部门编码"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 100%"
          placeholder="请选择部门负责人"
        >
          <el-option
            v-for="item in employess"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          type="textarea"
          placeholder="输入部门介绍"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button @click="onSave" type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getDeptsApi,
  addDeptApi,
  getDeptByIdApi,
  editDeptsApi,
} from '@/api/departments'
import { getEmployessApi } from '@/api/employess'
export default {
  data() {
    const checkDeptName = async (rule, value, callback) => {
      if (this.formData.id) {
        const { depts } = await getDeptsApi()
        const filtersDepts = depts.filter(
          (item) =>
            item.pid === this.formData.pid && item.id !== this.formData.id,
        )
        const isRepeat = filtersDepts.some((item) => item.name === value)
        isRepeat ? callback(new Error('部门重复')) : callback()
      } else {
        if (!this.AddDeptNode.children) return callback()
        const isRepeat = this.AddDeptNode.children.some(
          (item) => item.name === value,
        )
        isRepeat ? callback(new Error('部门重复')) : callback()
      }
    }

    const checkDeptCode = async (rule, value, callback) => {
      const { depts } = await getDeptsApi()
      let isRepeat
      if (this.formData.id) {
        isRepeat = depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.code === value)
      } else {
        isRepeat = depts.some((item) => item.code === value)
      }
      isRepeat ? callback(new Error('部门编码重复')) : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: '',
      },
      employess: '',
      formRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          {
            validator: checkDeptName,
            trigger: 'blur',
          },
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          {
            validator: checkDeptCode,
            trigger: 'blur',
          },
        ],
        manager: [
          { required: true, message: '请选择部门负责人', trigger: 'change' },
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' },
        ],
      },
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    AddDeptNode: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.getEmployessApi()
  },
  methods: {
    // 获取员工列表、部门负责人
    async getEmployessApi() {
      const res = await getEmployessApi()
      this.employess = res
    },
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: '',
      }
    },
    // 点击添加确定
    async onSave() {
      await this.$refs.form.validate()
      try {
        if (this.formData.id) {
          await editDeptsApi(this.formData)
          this.$message.success('编辑成功')
          this.onClose()  
          this.$emit('add-success')
          console.log('编辑')
        } else {
          this.formData.pid = this.AddDeptNode.id
          await addDeptApi(this.formData)
          this.$message.success('新增部门成功')
          this.onClose()
          this.$emit('add-success')
        }
      } catch (err) {
        this.$message.error('新增部门失败')
      }
    },
    async getDeptById(id) {
      this.formData = await getDeptByIdApi(id)
    },
  },
}
</script>

<style scoped></style>
