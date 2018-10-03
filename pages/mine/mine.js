const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),

        dayNumber: '', // 签到天数
        active: '', // 活跃度
        isQd: false, // 今天是否签到
        isTip: false, // 签到提示
        isjifen: false, // 是否已经计分
        achievement: '', // 成就      
    },

    // 获取用户信息
    getUserInfo: function(e) {
        // console.log(JSON.parse(e.detail.rawData))
        app.globalData.userInfo = JSON.parse(e.detail.rawData);
        wx.setStorageSync('userInfo', JSON.parse(e.detail.rawData));
        this.setData({
            userInfo: JSON.parse(e.detail.rawData),
            hasUserInfo: true
        })
    },

    // 签到
    singUp: function(e) {
        let that = this;
        let myDate = new Date();
        let currentDate = myDate.getDate(); // 当前日期
        let currentDay = myDate.getDay(); // 当前星期
        let signData = wx.getStorageSync('lastSignData'); // 签到内容

        /**
         * 活跃度
         * 连续登陆 1天 + 10活跃度 2天 + 20 依次类推
         * 评论一条 + 10
         */
        let huoyuedu = wx.getStorageSync('huoyuedu');
        // 第一次签到
        if (!signData) {
            let firstSignData = {
                'lastSignDate': currentDate,
                'lastSignDay': currentDay,
                'totalDay': 1,
                'continuousDay': 1,
            }

            wx.setStorageSync('lastSignData', firstSignData);
            // 设置活跃度
            wx.setStorageSync('huoyuedu', 10);
            that.setData({
                isjifen: true
            })


        } else if (signData.lastSignDate != currentDate) {
            console.log(typeof(signData.lastSignDate));
            let jifen = huoyuedu;
            let currentSignData = {
                'lastSignDate': currentDate,
                'lastSignDay': currentDay,
                'totalDay': '1',
                'continuousDay': '1',
            }
            // 如果是1号
            if (currentDate == 1) {
                // 连续
                if (signData.lastSignDate - currentDate >= 29 && (currentDay - signData.lastSignDay == 1 || currentDay - signData.lastSignDay == -6)) {
                    currentSignData.totalDate = signData.totalDate + 1;
                    currentSignData.continuousDate = signData.continuousDate + 1;
                    wx.setStorageSync('lastSignData', currentSignData);
                    that.setData({
                        isQd: true,
                    });
                    if (!that.data.isjifen) {
                        // 活跃度
                        jifen += currentSignData.continuousDate * 10;
                        that.setData({
                            isjifen: true
                        })
                    }


                } else { // 不连续
                    currentSignData.totalDate = signData.totalDate + 1;
                    wx.setStorageSync('lastSignData', currentSignData);
                    if (!that.data.isjifen) {
                        // 活跃度
                        jifen += 10;
                        that.setData({
                            isjifen: true
                        })
                    }
                }
            } else { // 不是一号
                // 连续
                if (currentDate - signData.lastSignDate == 1) {
                    currentSignData.totalDate = signData.totalDate + 1;
                    currentSignData.continuousDate = signData.continuousDate + 1;
                    wx.setStorageSync('lastSignData', currentSignData);
                    that.setData({
                        isQd: true,
                    });
                    if (!that.data.isjifen) {
                        // 活跃度
                        jifen += currentSignData.continuousDate * 10;
                        that.setData({
                            isjifen: true
                        })
                    }
                } else { // 不连续
                    currentSignData.totalDate = signData.totalDate + 1;
                    wx.setStorageSync('lastSignData', currentSignData);
                    if (!that.data.isjifen) {
                        // 活跃度
                        jifen += 10;
                        that.setData({
                            isjifen: true
                        })
                    }
                }

                wx.setStorageSync('huoyuedu', jifen);
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
        that.setData({
            dayNumber: wx.getStorageSync('lastSignData').continuousDay,
            active: wx.getStorageSync('huoyuedu')
        })

        // 提示弹框
        if (that.data.isTip) {
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
    },

    //导航到我赞过的词条
    navToMylike: function() {
        wx.navigateTo({
            url: '../mylike/mylike',
        })
    },

    // 导航到我的评论
    navToMycomments: function() {
        wx.navigateTo({
            url: '../mycomments/mycomments',
        })
    },

    // 导航到消息盒子
    navToMessage: function() {
        wx.navigateTo({
            url: '../message/message',
        })
    },

    // 导航到我的性格英雄
    navToMyhero: function() {
        wx.navigateTo({
            url: '../myhero/myhero',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;

        // 获取用户信息
        if (app.globalData.userInfo) {
            that.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (that.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                that.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo;
                    that.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        let signData = wx.getStorageSync('lastSignData'); // 签到内容

        if (!signData) { // 从未签到
            that.setData({
                dayNumber: '0',
            })
        } else {
            let today = new Date().getDate();
            if (today == signData.lastSignDate) {
                that.setData({ // 今天已经签到 
                    dayNumber: signData.continuousDay, // 连续签到天数
                    isQd: true
                })
            } else { // 今天没有签到
                // 昨天
                let yesterday = new Date().getDate() - 1;
                // 判断昨天是否签到
                if (yesterday != signData.lastSignDate) { // 昨天没有签到
                    that.setData({
                        dayNumber: 0 // 连续签到设置为0
                    })
                } else {
                    that.setData({ // 昨天签到 
                        dayNumber: signData.continuousDay // 连续签到天数
                    })
                }
            }

            // 备注：本校程序只运行一个月  就没有写复杂的判断 完整一年的判断可以在签到函数里面
        }

        // 活跃度
        let huoyuedu = wx.getStorageSync('huoyuedu');

        if (!huoyuedu) {
            wx.setStorageSync('huoyuedu', 0)
            if (!that.data.isQd) {
                that.setData({
                    active: '0',
                })
            } else {
                that.setData({
                    active: '10',
                    isjifen: true
                });
                wx.setStorageSync('huoyuedu', 10)
            }
            // 设置成就
            that.setData({
                achievement: '三国萌新'
            })

        } else {
            // 活跃度与成就换算：
            // 0-100 三国萌新  101-300 初出茅庐  301-600 运筹帷幄 601- 1000 指点江山 1000+ 百年孤独
            that.setData({
                active: huoyuedu
            })
            if (huoyuedu <= 100) {
                that.setData({
                    achievement: '三国萌新'
                })
            } else if (huoyue <= 300) {
                that.setData({
                    achievement: '初出茅庐'
                })
            } else if (huoyued <= 600) {
                that.setData({
                    achievement: '运筹帷幄'
                })
            } else if (huoyuedu <= 1000) {
                that.setData({
                    achievement: '指点江山'
                })
            } else {
                that.setData({
                    achievement: '百年孤独'
                })
            }
        }



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