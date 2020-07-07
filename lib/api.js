// saas-plat平台接口能力可以到社区单据服务板块反馈
// https://community.saas-plat.com/category/8/%E8%A7%86%E5%9B%BE%E6%A8%A1%E5%9E%8B

// // 命令接口,负责发送服务器端命令
// let command,
//   // gql查询接口,负责查询数据
//   query,
//   // 门户接口,负责模块间和系统间页面控制
//   portal,
//   // 权限接口
//   permission,
//   // 用户接口
//   user,
//   // 页面参数接口
//   params,
//   // 多语言接口
//   i18n;

// 接口文档可以到开发者社区查看
// https://dev.saas-plat.com/help/metaapi
const apis = {};
Object.defineProperty(apis, 'register', {
  value: function (provider) {
    // 外部api改成动态注册机制，扩展性更强，平台修改了不用改框架
    Object.keys(provider).forEach(key => {
      apis[key] = provider[key];
    })
  }
});

const proxy = new Proxy(apis, {
  get(target, key) {
    if (key === 'register') {
      return target[key];
    }
    // 所有api都是函数调用，包括属性
    return function (...args) {
      if (typeof target[key] === 'function') {
        return target[key].call(this, ...args);
      } else {
        return target[key];
      }
    };
  },
  set(target, key, value) {
    throw new Error('not support set api!')
  }
});

module.exports = proxy; 
