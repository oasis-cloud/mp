Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: Array,
    width: Number,
    zoomIn: {
      type: Number,
      value: 1.1
    },
    zoomOut: {
      type: Number,
      value: 1
    },
    prevLeft: {
      type: Number,
      value: 0
    },
    curLeft: {
      type: Number,
      value: 28
    },
    currLayerIndex: {
      type: Number,
      value: 3
    },
    prevLayerIndex: {
      type: Number,
      value: 1
    },
    LayerIndex: {
      type: Number,
      value: 2
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    positions: [],
    cycleList: [],
    bg: [
      '#037ef3',
      '#f85a40',
      '#30c39e',
      '#0a8ea0',
      '#f48924',
      '#ffc845',
      '#52565e'
    ]
  },
  observers: {
    'list': function (list) {
      // 在 numberA 或者 numberB 被设置时，执行这个函数
      console.log('component-update', list);
      this.ready()
    }
  },
  lifetimes: {
    ready: function () {
      // this.ready()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    ready: function () {
      this.touchStart = 0;
      this.touchEnd = 0;
      this.cycleList = [];
      this.dispatchDistance = 50;
      this.listLength = this.data.list.length;
      // 计算得出循环数组
      this.data.list.map((item, index) => {
        this.cycleList.push(index)
      })
      // 根据循环数组计算元素位置
      this.calculatePosition();
    },
    calculatePosition: function () {
      let positions = []
      // 计算位置
      this.cycleList.map((item, index) => {
        // 第一个元素位置
        if (index == 0) {
          positions[item] = {
            opacity: 1,
            zoom: this.data.zoomIn,
            left: this.data.curLeft,
            zIndex: this.data.currLayerIndex
          }
        } else if (index == this.listLength - 1) {
          // 缩小的元素位置
          positions[item] = {
            opacity: 0.8,
            zoom: this.data.zoomOut,
            left: this.data.prevLeft,
            zIndex: this.data.prevLayerIndex
          }
        } else {
          // 普通元素的位置
          positions[item] = {
            zoom: 1,
            opacity: 1,
            zIndex: this.data.LayerIndex,
            left: index * (this.data.width + 20) + 40
          }
        }
      })
      this.setData({ positions })
    },
    onTouchStart: function (event) {
      this.lock = false
      this.touchStart = event.changedTouches[0].pageX
    },
    onTouchMove: function (event) {
      let moveX;
      if (this.lock) return false;
      moveX = this.touchStart - event.changedTouches[0].pageX;
      if (moveX >= this.dispatchDistance) {
        this.lock = true
        this.swapCycleList('left');
        this.calculatePosition();
      } else if (moveX <= -1 * this.dispatchDistance) {
        this.lock = true
        this.swapCycleList('right');
        this.calculatePosition();
      }
    },
    onTouchEnd: function () { },
    swapCycleList: function (dir) {
      let tempArr = []
      if (dir == 'left') {
        tempArr = tempArr.concat(this.cycleList.slice(1, this.cycleList.length))
        tempArr.push(this.cycleList.shift())
        this.cycleList = tempArr
        console.log('this.cycleList', this.cycleList)
      } else if (dir == 'right') {
        tempArr = tempArr.concat(this.cycleList.slice(0, this.cycleList.length - 1))
        tempArr.unshift(this.cycleList.pop())
        this.cycleList = tempArr
        console.log('this.cycleList', this.cycleList)
      }
    }
  }
})
