const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        have: false, // 有评论的词条
        comments: '', // 评论的信息
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        let comments = wx.getStorageSync('comments');
        if (comments) { // 有评论
            // // 把同一个人的评论搜集起来 

            let names = [];
            comments.forEach(item => {
                if (!names.some(item2 => item2.name == item.heroName)) {
                    let name = {
                        'name': item.heroName,
                        'number': 1,
                        'id': item.heroId
                    }
                    names.push(name);
                } else {
                    names[names.findIndex(item2 => item2.name == item.heroName)].number++;
                }
            });

            that.setData({
                have: true,
                comments: names
            })

        }
    },

    /* 跳转到详情 */
    details: function(e) {
        wx.navigateTo({
            url: '/pages/commentDetails/commentDetails?heroId=' + e.currentTarget.dataset.text
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