import request from '@/utils/request'
/**
 * 获取员工列表简单
 * @returns promise
 */
export function getEmployessApi() {
  return request({
    url: '/sys/user/simple',
  })
}
