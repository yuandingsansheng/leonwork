const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        haveComment: false, // 评论初始没有
        inputText: '', // 输入内容
        comments: [], // 评论
        heroId: '', // 评论的英雄的id
        heroName: '', // 英雄名字
    },


    // 提交评论按钮 
    send: function() {
        let that = this;
        let value = that.data.inputText;
        let username = wx.getStorageSync('userInfo');
        let lastComments = wx.getStorageSync('comments');
        if (value != '') {
            if (!lastComments) { // 第一次评论
                let firstComment = [{
                    'username': `${username.nickName}`,
                    'content': value,
                    'heroId': that.data.heroId,
                    'heroName': that.data.heroName
                }];
                wx.setStorageSync('comments', firstComment);
            } else {
                let newComment = {
                    'username': `${username.nickName}`,
                    'content': value,
                    'heroId': that.data.heroId,
                    'heroName': that.data.heroName
                };
                lastComments.push(newComment);
                wx.setStorageSync('comments', lastComments);
            }
            // 如果有本条词条的评论

            // 新建一个空的评论数组
            let thisComments = [];
            let last = wx.getStorageSync('comments');
            for (let i = 0; i < last.length; i++) {
                if (last[i].heroId == that.data.heroId) {
                    thisComments.push(last[i]);
                }
            }

            that.setData({
                comments: thisComments,
                haveComment: true,
                inputText: '',
            })

            // that.setData({
            //     comments: wx.getStorageSync('comments'),
            //     haveComment: true,
            //     inputText: ''
            // })
        }
    },

    // 输入input
    input: function(e) {
        let that = this;
        that.setData({
            inputText: e.detail.value
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // debugger;
        let that = this;
        console.log(options);
        that.setData({
            heroId: options.heroId,
            heroName: options.heroName
        })
        let comments = wx.getStorageSync('comments');
        let username = wx.getStorageSync('userInfo');
        if (comments) {
            // 如果有本条词条的评论
            if (comments.some(item => item.heroId == options.heroId)) {
                // 新建一个空的评论数组
                let thisComments = [];
                for (let i = 0; i < comments.length; i++) {
                    if (comments[i].heroId == options.heroId) {
                        thisComments.push(comments[i]);
                    }
                }

                that.setData({
                    comments: thisComments,
                    haveComment: true,
                    inputText: '',
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