import request from '@/utils/request'
/**
 * 获取所有人员列表
 */
export function getRulesApi(params) {
  return request({
    url: '/sys/role',
    params,
  })
}
/**
 * 新建
 * @param {Object}  data 添加的数据
 * @returns
 */
export function setRulesApi(data) {
  return request({
    method: 'POST',
    url: '/sys/role',
    data,
  })
}
/**
 * 根据id查询企业
 * @param {String} id
 * @returns
 */
export function getCompanyInfoApi(id) {
  return request({
    url: `/company/${id}`,
  })
}
