//index.js
//获取应用实例
const app = getApp()

Page({

  data: {
    list: [1,2,3,4,5,6],
    listPosition: [],
    curIndex: 0,
    
  },  
  onLoad: function () {
    this.touchstart = 0
    this.touchend = 0
    let listPosition = []
    this.data.list.map((item, index) => {
      if(index == this.data.list.length - 1) {
        listPosition.push({
          s: 0.89,
          x: -10,
          zindex: 1
        })  
      }
      else if(index == 0) {
        listPosition.push({
          s: 1.1,
          x: 28,
          zindex: 2
        })
      } else {
        listPosition.push({
          s: 1,
          x: index * 240,
          zindex:1
        })
      }
    })
  
    this.setData({
      listPosition
    })
  },
  onShow: function() {
    console.log(this.data.listPosition)
  },
  onTouchStart: function(e) {
    console.log(e)
    this.touchstart = e.changedTouches[0].pageX
  },
  onTouchMove: function(e) {
  },
  onTouchEnd: function(e) {
    this.touchend = e.changedTouches[0].pageX
    let disPos = this.touchstart - this.touchend
    
    if(Math.abs(disPos) > 100) {
      
      let listPosition = this.data.listPosition
      let curIndex = this.data.curIndex
      let nextIndex = curIndex + 1

      listPosition.map(item => {
        item.s = 1;
        item.x += -240
      })
      console.log(listPosition)
      if(curIndex == this.data.list.length - 1) {
        nextIndex = 0
      }
      if(curIndex == 0) {
        // 设置最后一项
        console.log((this.data.list.length - 2) * 240)
        listPosition[this.data.list.length - 1]['x'] = (this.data.list.length - 2) * 240
        listPosition[this.data.list.length - 1]['s'] = 1
        // 设置当前项目
        listPosition[curIndex]['x'] = -10
        listPosition[curIndex]['s'] = 0.89
        // 设置下一项
        listPosition[nextIndex]['x'] = 28
        listPosition[nextIndex]['s'] = 1.1
        console.log('0', listPosition)
      } else {
        //
        listPosition[curIndex - 1]['x'] = (this.data.list.length - 2) * 240
        listPosition[curIndex - 1]['s'] = 1
        
        listPosition[curIndex]['x'] = -10
        listPosition[curIndex]['s'] = 0.89

        listPosition[nextIndex]['x'] = 28
        listPosition[nextIndex]['s'] = 1.1
        console.log(listPosition)

      }

      this.setData({
        listPosition,
        curIndex: nextIndex
      })
    }
  }
})
