Page({

  /**
   * 页面的初始数据
   */
  data: {
    doneList:[]
  },

  onShow: function () {
    let data = wx.getStorageSync('finish');
    this.setData({
      doneList: data
    })
  },
  deleteFin(event) {
    let taskData = wx.getStorageSync('finish') || [];
    let idx = taskData.findIndex((data) => {
      data.id === event.target.dataset.id
    })
    if (idx === undefined) {
      console.log("完成失败")
    } else {
      taskData.splice(idx, 1);
      wx.setStorageSync("finish", taskData);
      this.setData({
        doneList: taskData
      })
    }
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 500
    })
  }
  
})