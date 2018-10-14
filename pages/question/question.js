//index.js
//获取应用实例
const app = getApp()
Page({
    //数据绑定
    data: {
        progressWidth: 40,   //进度条宽度
        index: 0,   //计数下标
        realIndex: 0,   //产生的随机下标
        optionA: "A",
        optionB: "B",
        optionC: "C",
        //三种属性
        property1: 0,
        property2: 0,
        property3: 0,
        questionDetail: app.globalData.question[0].question,
        answerA: app.globalData.question[0].option.A.content,
        answerB: app.globalData.question[0].option.B.content,
        answerC: app.globalData.question[0].option.C.content,
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9],

    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        this.setList();
    },
    sortNum: function () {
        return 0.5 - Math.random();
    },
    setList: function () {
        var newList = this.data.list.sort(this.sortNum);
        this.setData({
            list: newList,
        });
    },
    answerClickA: function () {

        this.setData({
            property1: this.data.property1 + app.globalData.question[this.data.realIndex].option.A.weight[0],
            property2: this.data.property2 + app.globalData.question[this.data.realIndex].option.A.weight[1],
            property3: this.data.property3 + app.globalData.question[this.data.realIndex].option.A.weight[2],
            progressWidth: this.data.progressWidth + 60,
        });
        
        if (this.data.index < app.globalData.question.length - 1) {
            this.setData({
                index: this.data.index + 1,
                realIndex: this.data.list[this.data.index],
            })

            this.setData({
                questionDetail: app.globalData.question[this.data.realIndex].question,
                answerA: app.globalData.question[this.data.realIndex].option.A.content,
                answerB: app.globalData.question[this.data.realIndex].option.B.content,
                answerC: app.globalData.question[this.data.realIndex].option.C.content,
            })
        } else {
            // 把选项存入本地
            let options = {
                'A': this.data.property1,
                'B': this.data.property2,
                'C': this.data.property3
            }
            wx.setStorageSync('options', options);

            // 跳转到结果页
            wx.redirectTo({
                url: '/pages/final/final?A=' + this.data.property1 + '&B=' + this.data.property2 + '&C=' + this.data.property3,
            })
        }
    },
    answerClickB: function () {

        this.setData({
            property1: this.data.property1 + app.globalData.question[this.data.realIndex].option.B.weight[0],
            property2: this.data.property2 + app.globalData.question[this.data.realIndex].option.B.weight[1],
            property3: this.data.property3 + app.globalData.question[this.data.realIndex].option.B.weight[2],
            progressWidth: this.data.progressWidth + 60,
        })
        
        if (this.data.index < app.globalData.question.length - 1) {
            this.setData({
                index: this.data.index + 1,
                realIndex: this.data.list[this.data.index],
            })

            this.setData({
                questionDetail: app.globalData.question[this.data.realIndex].question,

                answerA: app.globalData.question[this.data.realIndex].option.A.content,
                answerB: app.globalData.question[this.data.realIndex].option.B.content,
                answerC: app.globalData.question[this.data.realIndex].option.C.content,
            })
        } else {
            wx.redirectTo({
                url: '/pages/final/final?A=' + this.data.property1 + '&B=' + this.data.property2 + '&C=' + this.data.property3,
            })
        }
    },
    answerClickC: function () {

        this.setData({
            property1: this.data.property1 + app.globalData.question[this.data.realIndex].option.C.weight[0],
            property2: this.data.property2 + app.globalData.question[this.data.realIndex].option.C.weight[1],
            property3: this.data.property3 + app.globalData.question[this.data.realIndex].option.C.weight[2],
            progressWidth: this.data.progressWidth + 60,
        })
        
        if (this.data.index < app.globalData.question.length - 1) {
            this.setData({
                index: this.data.index + 1,
                realIndex: this.data.list[this.data.index],
            })

            this.setData({
                questionDetail: app.globalData.question[this.data.realIndex].question,

                answerA: app.globalData.question[this.data.realIndex].option.A.content,
                answerB: app.globalData.question[this.data.realIndex].option.B.content,
                answerC: app.globalData.question[this.data.realIndex].option.C.content,
            })
        } else {
            wx.redirectTo({
                url: '/pages/final/final?A=' + this.data.property1 + '&B=' + this.data.property2 + '&C=' + this.data.property3,
            })

        }
    }
})


