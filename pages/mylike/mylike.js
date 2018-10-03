const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        like: false, // 有赞过的词条
        likedEntry: '' // 点赞的信息
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        let likeData = wx.getStorageSync('like');
        if (likeData) {
            // 本地存储有点赞 
            that.setData({
                like: true
            })
            // 查找相关英雄信息
            let likeArray = [];
            for (let i = 0; i < likeData.length; i++) {
                app.search(likeData[i].heroName, function(res) {

                    let data = res.data.data;

                    if (data.length == 1) {
                        // 如果只查询到一个结果 则说明该结果就是点赞的词条 直接push
                        likeArray.push(data[0]);

                    } else {
                        // 如果查询到多个结果，则选取词条id与点赞id相同的匹配性 push到likeArry中
                        likeArray.push(data[data.findIndex(item => item.heroId == likeData[i].heroId)]);
                    }
                    // 当搜索完成的时候进行setdata
                    if (i == likeData.length - 1) {
                        that.setData({
                            likedEntry: likeArray
                        })
                    }
                })

            }
        }
    },

    // 精准搜索
    preciseChose: function(e) {
        app.preciseSearch(e.currentTarget.id, function(res) {
            let preciseData = JSON.stringify(res.data.data);
            wx.setStorageSync('preciseData', preciseData)
            wx.navigateTo({
                url: '../result/result'
            })
        })
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