import request from '@/utils/request'

/**
 * 获取企业部门列表
 * @returns Promise
 */
export function getDeptsApi() {
  return request({
    url: '/company/department',
  })
}

export function delDeptsApi(id) {
  return request({
    method: 'DELETE',
    url: `/company/department/${id}`,
  })
}

/**
 * 新增部门
 * @param {Object} data
 * code 部门编码，同级部门不可重复
 * introduce 介绍
 * manager 负责人名称
 * name	部门名称
 * pid	父级部门ID
 * @returns promise
 */
export function addDeptApi(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data,
  })
}
/**
 * 根据id获取部门详情
 * @param {String} id
 * @returns promise
 */
export function getDeptByIdApi(id) {
  return request({
    url: '/company/department/' + id,
  })
}

/**
 * 根据id修改部门详情
 * @returns promise
 */
export function editDeptsApi(data) {
  return request({
    method: 'PUT',
    url: '/company/department/' + data.id,
    data,
  })
}
