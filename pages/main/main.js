Page({
  data: {
    isShow: false,
    taskData: [],
    target: "",
    now: ""
  },

  //显示弹窗时设置当前时间
  onShow () {
    let data = wx.getStorageSync("taskData");
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let now = hour + ":" + min;
    this.setData({
      taskData: data,
      now: now
    })
  },
  
  //显示弹窗,并设置目标时间为一小时后
  showPop (event) {
    let date = new Date();
    date.setTime(date.getTime() + 60 * 60 * 1000);
    let hour = date.getHours();
    let min = date.getMinutes();
    let target = hour + ":" + min;

    this.setData({
      isShow: true,
      target: target
    })
  },

  //改变时间
  bindTimeChange (event) {
    let newTime = event.detail.value;
    this.setData({
      target: newTime
    })
  },

  //取消添加任务
  cancel (event) {
    this.setData({
      isShow: false
    })
  },

  //完成任务
  finish (event) {
    let idx;
    let old = this.data.taskData.find((data,index) => {
      if(data.id === event.target.dataset.id){
        idx = index;
        return data
      }
    })
    if(old === undefined) {
      console.log("完成失败")
    }else {
      let data = this.data.taskData;
      data.splice(idx,1);
      this.setData({
        taskData: data,
      })
      wx.setStorageSync("taskData", data);
      old.type = "finish";
      let taskData = wx.getStorageSync('finish')||[];
        if(taskData.length != 0) {
          let newData = taskData.concat(old);
          wx.setStorageSync("finish", newData);
        }else {
          let arr =[];
          arr.push(old);
          wx.setStorageSync("finish", arr);
        }
      }
      wx.showToast({
        title: '已完成',
        icon: 'success',
        duration: 500
      })
    },
    
  //未完成任务
  unfinished (event) {
    let idx;
    let old = this.data.taskData.find((data, index) => {
      if (data.id === event.target.dataset.id) {
        idx = index;
        return data
      }
    })
    if (old === undefined) {
      console.log("完成失败")
    } else {
      let data = this.data.taskData;
      data.splice(idx, 1);
      this.setData({
        taskData: data,
      })
      wx.setStorageSync("taskData", data);
      old.type = "unfinished";
      let taskData = wx.getStorageSync('unfinished') || [];
      if (taskData.length != 0) {
        let newData = taskData.concat(old);
        wx.setStorageSync("unfinished", newData);
      } else {
        let arr = [];
        arr.push(old);
        wx.setStorageSync("unfinished", arr);
      }
    }
    wx.showToast({
      title: '成功添加至未完成',
      icon: 'success',
      duration: 500
    })
  },

  //提交任务
  formSubmit (event) {
    let newData;
    console.log(this.data.taskData)
    if (this.data.taskData.length == 0){
      newData = [];
    }else {
      newData = this.data.taskData;
    }
    let name = event.detail.value.taskName;
    let time = event.detail.value.taskTime;
    let level = !!event.detail.value.taskLevel;
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let random = Math.floor(Math.random() * 10000);
    let id ="0" + year + month + day + hour + min + sec + random;
    if(!name) {
      wx.showToast({
        title: '请填写任务',
        icon: 'loading',
        duration: 300
      })
      return false;
    }
    newData.push({
      id: id,
      task: name,
      time: time,
      isUgrent: level
    })
    this.setData({
      taskData:newData,
      isShow: false
    })
    wx.setStorageSync("taskData", newData);
  },

  //跳转到已完成页面
  switchDone: () => {
    wx.navigateTo({
      url: '/pages/done/done'
    })
  },

  //跳转到未完成页面
  switchFail: () => {
    wx.navigateTo({
      url: '/pages/fail/fail'
    })
  }
})