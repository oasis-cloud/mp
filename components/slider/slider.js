// components/slider/slider.js
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
      value: 0.89
    },
    prevLeft: {
      type: Number,
      value: 0
    },
    curLeft: {
      type: Number,
      value: 0
    },
    zindex:{
      type: Number,
      value: 2
    },
    prevZindex: {
      type: Number,
      value: 1
    },
    curIndex: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    positions: [],
    touchStart: 0,
    touchEnd: 0,
    curIndex: 0
  },
  lifetimes: {
    ready: function () {
      console.log('component-lifetimes ready')
      this.dispatchDis = 100
      this.sliderLen = this.data.list.length

      let positions = []
      this.data.list.map((item, index) => {
        let position = {}
        if (index == 0) {
          position = {
            left: this.data.curLeft,
            zoom: this.data.zoomIn,
            zIndex: this.data.zindex
          }
        } else if (index == this.sliderLen - 1) {
          position = {
            left: this.data.prevLeft,
            zoom: this.data.zoomOut,
            zIndex: this.data.prevZindex
          }
        } else {
          position = {
            left: index * this.data.width + (this.data.width * this.data.zoomIn - this.data.width + this.data.curLeft),
            zoom: 1,
            zIndex: 1
          }
        }
        positions.push(position)
      })
      console.log('component-positions', positions)
      this.setData({
        positions,
        list: this.data.list
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onTouchStart: function (e) {
      this.data.touchstart = e.changedTouches[0].pageX
    },
    onTouchMove: function (e) {
    },
    onTouchEnd: function (e) {
      this.data.touchEnd = e.changedTouches[0].pageX
      let distance = this.data.touchstart - this.data.touchEnd
      
      if(Math.abs(distance) > 100) {
        let positions = this.data.positions
        let nextIndex = this.data.curIndex + 1
        if (this.data.curIndex >= this.sliderLen - 1) {
          nextIndex = 0
        }       
        console.log('nextIndex', nextIndex, this.data.curIndex, this.sliderLen - 1)
        // 重新计算位置
        positions.map((item, index) => {
          item.zoom = 1
          item.left += -1 * (this.data.width + (this.data.width * this.data.zoomIn - this.data.width + this.data.curLeft))
        })
        if(this.data.curIndex == 0) {
          positions[this.sliderLen - 1] = {
            zoom: 1,
            zIndex: 1,
            left: (this.sliderLen - 2) * this.data.width + (this.data.width * this.data.zoomIn - this.data.width + this.data.curLeft)
          }
        } else {
          // 设置缩小的元素，为了挪动到最后显示
          positions[this.data.curIndex - 1] = {
            zoom: 1,
            zIndex: 1,
            left: (this.sliderLen - 2) * this.data.width + (this.data.width * this.data.zoomIn - this.data.width + this.data.curLeft)
          }
        }
        positions[this.data.curIndex] = {
          zoom: this.data.zoomOut,
          left: this.data.prevLeft,
          zIndex: this.data.prevZindex
        }
        console.log('nextIndex', nextIndex)
        positions[nextIndex] = {
          zoom: this.data.zoomIn,
          left: this.data.curLeft,
          zIndex: this.data.zindex
        }
        console.log('component-positions', positions)
        this.setData({ positions, curIndex: nextIndex})
      }
    }
  }
})
