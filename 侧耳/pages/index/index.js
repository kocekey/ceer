
const db = wx.cloud.database().collection("recommend");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalnum: null,
    count: 5,
    recommend: [],
    initial: "合拍女神",
    lists: ['哈哈哈哈', '呵呵呵呵', '嘻嘻嘻嘻', '噜噜噜噜'],
    show_lists: true,
    num: 2
  },

  showlists: function () {
    this.setData({
      show_lists: !this.data.show_lists,
    })
  },

  showhepai:function()
  {
   this.setData({
     num:1
   })
  },
  click_button: function (e) {
    var num = e.currentTarget.dataset.num;
    this.setData({
      num: num,
      show_lists: true,
    })
    console.log(num)
  },
  click_list: function (e) {
    console.log(e.currentTarget.dataset.item)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdbdata();
  },
  getdbdata: function () {
    var that = this;
    var count = this.data.count;
    db.count({
      success: function (res) {
        that.setData({
          totalnum: res.total
        })
      }
    })
    db.limit(count).get({
      success: function (res) {
        that.setData({
          recommend: res.data
        })
        console.log(res.data)
      }
    })
    this.data.count += 5
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var count = this.data.count;
    if (this.data.count == this.data.totalnum + 5) {
      wx.showModal({
        title: '已经触底了',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    else {
      db.limit(count).get({
        success: function (res) {
          wx.showToast({
            icon: 'loading',
            duration: 500
          })
          that.setData({
            recommend: res.data
          })
        }
      })
      this.data.count += 5
    }
    console.log(this.data.count)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})