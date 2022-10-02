// 在这个js文件中专门创建store的实例对象
import {observable, action} from 'mobx-miniprogram'

export const store = observable({
  numA: 1,
  numB: 2,
  usercode: '555',
  dizhibianhao:0,
  activeTabBarIndex: 0,
  // 计算属性，不可以进行赋值
  get sum(){
    return this.numA + this.numB
  },
  // actions函数，专门来修改store中数据的值
  address1: action(function(){
    return this.dizhibianhao
  }),
  usercode1: action(function(){
    return this.usercode
  }),
  updateNum1: action(function(step){
    this.numA += step
  }),
  updateNum2: action(function(step){
    this.numB += step
  }),
  updateActiveTabBarIndex: action(function(index){
    this.activeTabBarIndex = index
  }),
  updatedizhibianhao: action(function(index){
    this.dizhibianhao = index
  }),
  updateusercode: action(function(code){
    this.usercode = code
  })
})