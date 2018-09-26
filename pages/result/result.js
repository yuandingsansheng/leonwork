var WxParse = require('../../wxParse/wxParse.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        src: '', // 头像url 
        heroId: '', // id
        heroContent: '', // 生平事迹
        heroName: '', // 姓名
        heroNative: '', // 籍贯
        heroNianbiao: '', // 历史简介
        heroPingjia: '', // 综合评价
        heroShengzu: '', // 生卒
        heroShili: '', // 效忠
        heroZi: '', // 字
        isLike: false, // 是否赞
        isDislike: false, // 是否踩
        likeSrc: '../../images/like.png', // 点赞图标
        dislikeSrc: '../../images/dislike.png', // 踩图标
        currentTab: 0, // 当前swiper-item-id
        haveIntro: false, // 有历史简介
        haveLife: false, // 有生平事迹
        haveEval: false, // 有综合评价
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        /**
         * WxParse.wxParse(bindName , type, data, target,imagePadding)
         * 1.bindName绑定的数据名(必填)
         * 2.type可以为html或者md(必填)
         * 3.data为传入的具体数据(必填)
         * 4.target为Page对象,一般为this(必填)
         * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
         */
        var that = this;
        let value = JSON.parse(wx.getStorageSync('preciseData'));

        if (value) {
            // console.log(value);
            that.setData({
                heroName: value.heroName,
                heroNative: value.heroNative,
                heroShengzu: value.heroShengzu,
                heroShili: value.heroShili,
                heroZi: value.heroZi,
                heroId: value.heroId,
                src: 'https://www.styihm.com/system/image/' + value.heroId + '.jpg',
            });

            if (value.heroContent.length > 0 && value.heroContent !='null') {
              
                that.setData({
                    haveIntro: true
                });
                WxParse.wxParse('heroContent', 'html', value.heroContent, that, 5); // 历史简介
            }

            if (value.heroNianbiao.length > 0 && value.heroNianbiao != 'null') {
                that.setData({
                    haveLife: true
                });
                WxParse.wxParse('heroNianbiao', 'html', value.heroNianbiao, that, 5); // 生平事迹              
            }

            if (value.heroPingjia.length > 0 && value.heroPingjia != 'null') {
                that.setData({
                    haveEval: true
                });
                WxParse.wxParse('heroPingjia', 'html', value.heroPingjia, that, 5); // 综合评价
            }
        }

    },


    // 点赞
    like: function() {
        let that = this;
        that.setData({
            isLike: !that.data.isLike
        })
        if (that.data.isLike) {
            that.setData({
                likeSrc: '../../images/like2.png',
                dislikeSrc: '../../images/dislike.png'
            })
        } else {
            that.setData({
                likeSrc: '../../images/like.png'
            })
        }
    },

    // 踩
    dislike: function() {
        let that = this;
        that.setData({
            isDislike: !that.data.isDislike
        })
        if (that.data.isDislike) {
            that.setData({
                likeSrc: '../../images/like.png',
                dislikeSrc: '../../images/dislike2.png'
            })
        } else {
            that.setData({
                dislikeSrc: '../../images/dislike.png'
            })
        }
    },

    // 评论
    comment: function() {
        wx.navigateTo({
            url: '/pages/comment/comment',
        })
    },

    // 修改
    revise: function() {
        wx.navigateTo({
            url: '/pages/revise/revise',
        })
    },

    // swpier---历史简介
    tapIntro: function() {
        let that = this;
        that.setData({
            currentTab: 0
        })
    },

    // swpier---生平事迹
    tapLife: function() {
        let that = this;
        that.setData({
            currentTab: 1
        })
    },

    // swpier---综合评价
    tapEval: function() {
        let that = this;
        that.setData({
            currentTab: 2
        })
    },

    // 滑动事件
    bindChange: function(e) {
        this.setData({
            currentTab: e.detail.current
        });
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