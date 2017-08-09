Page({
  data: {
    doneList: []
  },
  onShow: function () {
    let data = wx.getStorageSync('unfinished');
    this.setData({
      doneList: data
    })
  },
  deleteUnFin (event) {
    let taskData = wx.getStorageSync('unfinished') || [];
    let idx = taskData.findIndex((data) => {
      data.id === event.target.dataset.id
    })
    if (idx === undefined) {
      console.log("完成失败")
    } else {
      taskData.splice(idx, 1);
      wx.setStorageSync("unfinished", taskData);
      this.setData({
        doneList: taskData
      })
    }
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 500
    })
  },
  restart (event) {
    let taskData = wx.getStorageSync('unfinished') || [];
    let idx;
    let data = taskData.find((data,index) => {
      if(data.id === event.target.dataset.id) {
        idx = index;
        return data;
      }
    })
    if (data === undefined) {
      console.log("完成失败")
    } else {
      let restart = taskData.splice(idx, 1)[0];
      wx.setStorageSync("unfinished", taskData);
      let newData = wx.getStorageSync("taskData")|| [];
      let date = new Date();
      date.setTime(date.getTime() + 60*60*1000);
      let time = date.getHours() + ":" + date.getMinutes();
      delete (restart.type);
      restart.time = time;
      newData.push(restart);
      wx.setStorageSync("taskData", newData)
      this.setData({
        doneList: taskData
      })
    }
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 500
    })
  }
})