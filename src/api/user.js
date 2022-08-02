import request from '@/utils/request'

/**
 * 登录请求
 * @param {Object} data 账号 和 密码
 * @returns Promise
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

export function getInfo(token) {}

export function logout() {}
