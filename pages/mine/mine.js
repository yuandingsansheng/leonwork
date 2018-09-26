Page({

    /**
     * 页面的初始数据
     */
    data: {
        dayNumber: '', // 签到天数
        active: '', // 活跃度
        isQd: false, // 今天是否签到
        isConQd: false, // 是否连续签到
        isTip: false,  // 签到提示
        achievement: ['三国萌新', '初出茅庐', '运筹帷幄', '指点江山', '百年孤独'], // 成就      
    },

    // 签到
    singUp: function(e) {
        let that = this;
        let myDate = new Date();
        let currentDate = myDate.getDate(); // 当前日期
        let currentDay = myDate.getDay(); // 当前星期
        let signData = wx.getStorageSync('lastSignData'); // 签到内容

        // 第一次签到
        if (!signData) {
            let firstSignData = {
                'lastSignDate': `${currentDate}`,
                'lastSignDay': `${currentDay}`,
                'totalDate': 1,
                'continuousDate': 1,
            }

            wx.setStorageSync('lastSignData', firstSignData);
            if(!that.data.isTip) {
                wx.showToast({
                    title: "签到成功!",
                    icon: 'success',
                    duration: 2000
                })
                that.setData({
                    isQd: true,
                    isTip: true,
                });
            } else {
                wx.showToast({
                    title: "今日已签到了哦",
                    icon: 'success',
                    duration: 2000
                })
            }
            
        } else if (signData.lastSignData != currentDate) {
            let currentSignData = {
                'lastSignDate': `${currentDate}`,
                'lastSignDay': `${currentDay}`,
                'totalDate': '1',
                'continuousDate': '1',
            }
            // 如果是1号
            if (currentDate == 1) {
                // 连续
                if (signData.lastSignData - currentDate >= 29 && (currentDay - signData.lastSignDay == 1 || currentDay - signData.lastSignDay == -6)) {
                    currentSignData.totalDate = signData.totalDate + 1;
                    currentSignData.continuousDate = signData.continuousDate + 1;
                    wx.setStorageSync('lastSignData', currentSignData);
                    that.setData({
                        isQd: true,
                        isConQd: true
                    });
                } else { // 不连续
                    currentSignData.totalDate = signData.totalDate + 1;
                    wx.setStorageSync('lastSignData', currentSignData);
                }
            } else { // 不是一号
                // 连续
                if (currentDate - signData.lastSignData == 1) {
                    currentSignData.totalDate = signData.totalDate + 1;
                    currentSignData.continuousDate = signData.continuousDate + 1;
                    wx.setStorageSync('lastSignData', currentSignData);
                    that.setData({
                        isQd: true,
                        isConQd: true
                    });
                } else { // 不连续
                    currentSignData.totalDate = signData.totalDate + 1;
                    wx.setStorageSync('lastSignData', currentSignData);
                }
            }
            if (!that.data.isTip) {
                wx.showToast({
                    title: "签到成功!",
                    icon: 'success',
                    duration: 2000
                })
                that.setData({
                    isQd: true,
                    isTip: true,
                });
            } else {
                wx.showToast({
                    title: "今日已签到了哦",
                    icon: 'success',
                    duration: 2000
                })
            }  
        }
        console.log(typeof(signData.lastSignData));
        console.log(typeof (signData.lastSignDay));
        console.log(typeof (signData.totalDate));
        console.log(typeof (signData.continuousDate));
        that.onLoad();
    },

    /**
     * 活跃度
     * 连续登陆 1天 + 10活跃度 2天 + 20 依次类推
     * 评论一条 + 10
     */
    huoyue:function() {
        let that = this;
        let huoyuedu = wx.getStorageSync('huoyuedu'); // 活跃度
        if (!huoyuedu) {
            wx.setStorageSync('huoyuedu', 0)
            if (!that.data.isQd) {
                that.setData({
                    active: '0'
                })
            } else {
                that.setData({
                    active: '10'
                });
                wx.setStorageSync('huoyuedu', 10)
            }

        } else if (that.data.isQd) { // 签到加积分
            let jifen = huoyuedu;

            if (that.data.isConQd) { //  连续签到
                jifen += signData.continuousDate * 10;
            } else {
                jifen += 10;
            }
            that.setData({
                acitve: jifen
            });
            wx.setStorageSync('huoyuedu', jifen)
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        let signData = wx.getStorageSync('lastSignData'); // 签到内容
        if (!signData) { // 从未签到
            that.setData({
                dayNumber: '0'
            })
        } else {
            that.setData({
                dayNumber: signData.continuousDate
            })
        }
        that.huoyue();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})