const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputText: '', // 输入内容
        matches: '', // 匹配项
        haveMatches: true, // 有结果
    },

    // 选择
    preciseChose: function(e) {
        app.preciseSearch(e.currentTarget.id, function(res) {
            let preciseData = JSON.stringify(res.data.data);
            wx.setStorageSync('preciseData', preciseData)
            wx.navigateTo({
                url: '../result/result'
            })
        })
    },

    // 搜索
    search: function(e) {
        let that = this;
        app.search(e.detail.value, function(res) {
            
            if (res.data.data.length == 0) {
                that.setData({
                    haveMatches: false
                })
            } else {
                that.setData({
                    inputText: e.detail.value,
                    matches: res.data.data,
                    haveMatches: true
                })
            }

        })
    },

    // 删除
    clearInput: function() {
        this.setData({
            inputText: ''
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;

        // console.log(options.data);
        if (JSON.parse(options.data).length == 0) {
            that.setData({
                haveMatches: false
            });
        }
        that.setData({
            matches: JSON.parse(options.data),
            inputText: options.inputText
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