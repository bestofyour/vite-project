import { MockMethod } from 'vite-plugin-mock';

function resultSuccess<T = Recordable>(result: T, { message = 'ok' } = {}) {
  return {
    code: 0,
    result,
    message,
    type: 'success',
  };
}

export function resultError(message = 'Request failed', { code = -1, result = null } = {}) {
  return {
    code,
    result,
    message,
    type: 'error',
  };
}

const userInfo = {
  name: 'Vben',
  userId: '00000001',
  email: 'test@gmail.com',
  signature: '海纳百川，有容乃大',
  introduction: '微笑着，努力着，欣赏着',
  title: '交互专家',
  group: '某某某事业群－某某平台部－某某技术部－UED',
  tags: [
    {
      key: '4',
      label: '川妹子',
    },
    {
      key: '5',
      label: '海纳百川',
    },
  ],
  notifyCount: 12,
  unreadCount: 11,
  country: 'China',
  address: 'Xiamen City 77',
  phone: '0592-268888888',
};
export default [
  {
    url: '/basic-api/user',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess(userInfo);
    },
  },
  {
    url: '/basic-api/error',
    method: 'post',
    statusCode: 401,
    response: () => {
      return resultError();
    },
  },
] as MockMethod[];
