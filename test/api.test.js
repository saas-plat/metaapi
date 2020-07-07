const {
  expect
} = require('chai');
const api = require('../lib/api');

describe('api', () => {

  it('注册和调用api', () => {
    let c, d;
    api.register({
      func1: (a, b) => {
        c = a;
        d = b;
      }
    })

    api.func1(1, 2);

    expect(c).to.be.eql(1);
    expect(d).to.be.eql(2);
  })

  it('不能直接赋值需要调用register', () => {
    
    let err = false;
    try {
      api.funcxx = () => {}
      err = true;
    } catch {

    }
    expect(err).to.be.false;
  })

  it('动态注册和预先解构', () => {
    const {
      func2,
      func3
    } = api;

    // es import default
    const esm = {
      default: api
    }
    const {
      func4
    } = esm.default;

    api.register({
      func2: () => 2,
      // func3: () => 3,
      func4: () => 4
    })

    expect(func2()).to.be.eql(2);
    expect(func3()).to.be.eql(undefined);
    expect(func4()).to.be.eql(4);
  })

})
