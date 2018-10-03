//index.js
//获取应用实例
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 获取用户信息
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),

        hotsearch: [], // 推荐人物
        inputText: '',
        display: false, // 删除按钮展示
        fuzzy: 'fuzzy-area', //模糊搜索框
        conditional: 'conditional-query', // 条件查询按钮
        listSrc: '../../images/list.png', // 条件查询图标
        bind: false, // 条件查询是否点击
        showModalStatus: false, // 条件查询弹框
        /* 条件查询列表 */
        Initials: ['不限', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'w', 'x', 'y', 'z'],
        forceGroup: ['不限', '东汉', '魏', '蜀', '吴', '袁绍', '刘表', '董卓', '刘璋', '西晋', '起义军', '少数民族'],
        birthplace: ['不限', '并州', '冀州', '交州', '荆州', '凉州', '青州', '司隶', '徐州', '䆓州', '扬州', '益州', '幽州', '豫州'],
        gender: ['不限', '男', '女'],

        choseInput: '', // 选择内容
        cInitial: '', // 选择首字母
        cForce: '', // 选择势力
        cBplace: '', // 选择籍贯
        cGender: '', // 选择性别

        clickInitialId: 0, // 首字母index
        clickForceId: 0, // 势力index
        clcikBId: 0, // 籍贯index
        clickGenderId: 0, // 性别index

        animationData: '', // 动画
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 获取用户信息
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo;
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        // 高频人物
        let role = app.globalData.people;
        // 新建一个空数组
        let temp = new Array;
        for (let i = 0; i < role.length; i++) {
            temp[i] = i;
        }
        // 推荐人物数组
        let recommondPeople = new Array(10);
        // 随机产生不重复的10个 0 —— (role.length-1)数
        for (let num, j = 0; j < 10; j++) {
            do {
                num = parseInt(Math.random() * (role.length - 1));
                recommondPeople[j] = role[num];
            } while (temp[num] == null);
            temp[num] = null;
        }
        this.setData({
            hotsearch: recommondPeople
        })

        // 条件查询

    },


    search: function(e) {
        let that = this;
        app.search(e.detail.value, function(res) {
            let data = res.data.data;
            let text = that.data.inputText;
            wx.navigateTo({
                url: '../matches/matches?data=' + JSON.stringify(data) + '&inputText=' + text
            })
        })
    },

    // 热搜选择
    bindInput: function(e) {
        this.setData({
            inputText: e.detail.value,
        })
    },


    // 删除
    clearInput: function() {
        this.setData({
            inputText: ''
        })
    },

    // 热搜
    hotSearch: function(e) {
        let that = this;
        that.setData({
            inputText: e.target.dataset.text,
        })
        app.search(e.target.dataset.text, function(res) {
            let data = res.data.data;
            wx.navigateTo({
                url: '../matches/matches?data=' + JSON.stringify(data) + '&inputText=' + e.target.dataset.text
            })
        })
    },


    // 条件查询 
    conditionalQuery: function() {
        let that = this;
        that.setData({
            listSrc: '../../images/listchose.png'
        })
    },

    // 搜索框获得焦点的时候
    focus: function(e) {
        let that = this;
        that.setData({
            display: true,
            fuzzy: 'fuzzy-area-f',
            conditional: 'conditional-query-f'
        })
    },

    // 搜索框失去焦点的时候
    blur: function(e) {
        let that = this;
        that.setData({
            display: false,
            fuzzy: 'fuzzy-area',
            conditional: 'conditional-query'
        })
    },

    // 弹框
    powerDrawer: function(e) {
        var currentStatu = e.currentTarget.dataset.statu;
        this.util(currentStatu)
    },

    util: function(currentStatu) {
        let that = this;
        /* 动画部分 */
        // 第一步：创建动画实例
        var animation = wx.createAnimation({
            duration: 200, // 动画时长
            timingFunction: 'linear', // 线性
            delay: 0 // 不设置延迟
        });

        // 第二步：这个动画实例赋给当前动画实例
        that.animation = animation;

        // 第三步：执行第一组动画
        animation.opacity(0).rotateX(-100).step();

        // 第四步：导出动画对象给数据对象存储
        that.setData({
            animationData: animation.export()
        })

        // 第5步：设置定时器到指定时候后，执行第二组动画
        setTimeout(function() {
            // 执行第二组动画
            animation.opacity(1).rotateX(0).step();
            // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
            that.setData({
                animationData: animation
            })

            //关闭
            if (currentStatu == "close") {

                that.setData({
                    showModalStatus: false,
                    listSrc: '../../images/list.png',
                    choseInput: '',
                    clickInitialId: 0, // 首字母index
                    clickForceId: 0, // 势力index
                    clcikBId: 0, // 籍贯index
                    clickGenderId: 0, // 性别index
                });
            }
        }, 200)


        // 显示
        if (currentStatu == 'open') {
            that.setData({
                showModalStatus: true,
                listSrc: '../../images/listchose.png',
            })
        }
    },

    // 选择首字母
    chooseInitials: function(e) {
        let that = this;
        let input = that.data.cInitial;
        let choseText = e.target.dataset.text;
        if (choseText != '不限' && input.indexOf(choseText) == -1) {
            input = choseText;
        } else {
            input = '';
        }
        that.setData({
            cInitial: input,
            clickInitialId: e.currentTarget.id,
            choseInput: input + that.data.cForce + that.data.cBplace + that.data.cGender
        })
    },

    // 选择主要势力
    chooseForceGroup: function(e) {
        let that = this;
        let input = that.data.cForce;
        let choseText = e.target.dataset.text;
        if (choseText != '不限' && input.indexOf(choseText) == -1) {
            input = choseText;
        } else {
            input = '';
        }
        that.setData({
            cForce: input,
            clickForceId: e.currentTarget.id,
            choseInput: that.data.cInitial + input + that.data.cBplace + that.data.cGender
        })
    },

    // 选择籍贯
    chooseBirthPlace: function(e) {
        let that = this;
        let input = that.data.cBplace;
        let choseText = e.target.dataset.text;
        if (choseText != '不限' && input.indexOf(choseText) == -1) {
            input = choseText;
        } else {
            input = '';
        }
        that.setData({
            cBplace: input,
            clcikBId: e.currentTarget.id,
            choseInput: that.data.cInitial + that.data.cForce + input + that.data.cGender
        })
    },

    // 选择性别
    chooseGender: function(e) {
        let that = this;
        let input = that.data.cGender;
        let choseText = e.target.dataset.text;
        if (choseText != '不限' && input.indexOf(choseText) == -1) {
            input = choseText;
        } else {
            input = '';
        }
        that.setData({
            cGender: input,
            clickGenderId: e.currentTarget.id,
            choseInput: that.data.cInitial + that.data.cForce + that.data.cBplace + input
        });

    },

    // 确认
    confirm: function() {
        let that = this;
        let data = {
            'letter': `${that.data.cInitial}`, // 首字母
            'heroShili': `${that.data.cForce}`,  // 势力
            'heroNative': `${that.data.cBplace}`, // 籍贯
            'heroSex': `${that.data.cGender}` // 性别
        }
        // 搜索
        app.conditionalQuery(data,function(res) {
            let data = res.data.data;
            let text = that.data.choseInput;
            wx.navigateTo({
                 url: '../matches/matches?data=' + JSON.stringify(data) + '&inputText=' + text
             })
            // console.log(data);
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
        // 返回的时候界面初始化
        let that = this;
        that.setData({
            inputText: '', // 搜索框内容
            choseInput: '', // 选择内容
            clickInitialId: 0, // 首字母index
            clickForceId: 0, // 势力index
            clcikBId: 0, // 籍贯index
            clickGenderId: 0, // 性别index
            showModalStatus: false, // 条件查询弹框
            choseInput: '', // 选择内容
            cInitial: '', // 选择首字母
            cForce: '', // 选择势力
            cBplace: '', // 选择籍贯
            cGender: '', // 选择性别
        })
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