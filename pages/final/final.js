const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: "",
        describe: "",

        //小程序图片地址
        tempFilePath: "",

        //canvas高度
        canvasHeight: 0,
        //用户信息
        userInfoUrl: "",

        //姓名
        nickName: "",

    },

    return: function () {
        // tanbbar不能用redirectto
        wx.switchTab({
           url: '/pages/test/test',
           success:function() {
               console.log("sss")
           },
           fail:function(e) {
               console.log(e);
           }
       })
    },


    /**
     * 生命周期函数--监听页面加载
     */

    /**
     * 绘制多行文本
     * @param str 文本内容
     * @param initHeight 文本绘制的初始高度
     * @param titleHeight 绘制文本的高度
     */
    drawText: function (ctx, str, initHeight, titleHeight, windowWidth) {
        var lineWidth = 0;
        var xt = windowWidth * 0.5 - 72;
        var lastSubStrIndex = 0; //每次开始截取的字符串的索引
        for (let i = 0; i < str.length; i++) {
            lineWidth += ctx.measureText(str[i]).width;

            if (i % 12 == 0) { //一行写13个字
                ctx.fillText(str.substring(lastSubStrIndex, i), xt, initHeight); //绘制截取部分
                initHeight += 30; //30为字体的高度
                lineWidth = 0;
                lastSubStrIndex = i;
                titleHeight += 30;
            }
            if (i == str.length - 1) { //绘制剩余部分
                ctx.fillText(str.substring(lastSubStrIndex, i + 1), xt, initHeight);
            }
        }
        return titleHeight
    },

    /**
     * 画圆形图片
     * clip()API，可以用你指定的形状在画布上裁剪一部分出来，然后，接下来你在画布上的操作只有在该形状区域内可见，
     * 如果对画布的其他地方有操作，可以使用restore()接口恢复，但是必须在使用clip接口前用 save() 接口保存canvas的状态。
     */
    cricleImg: function (ctx, img, x, y, r) {

        ctx.save();
        let cx = x + r;
        let cy = y + r;
        let d = 2 * r;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.clip();
        ctx.drawImage(img, x, y, d, d);
        ctx.restore();
    },

    /**
     * 画图功能
     */

    drawResult: function (cname, cdescribe) {
        var that = this;
        const ctx = wx.createCanvasContext('myCanvas');


        //长度设置
        let windowWidth = wx.getSystemInfoSync().windowWidth;
        let windowHeight = wx.getSystemInfoSync().windowHeight;

        //设置canvas高度
        that.setData({
            canvasHeight: 2 * windowHeight,
        });

        let canvasWidth = parseInt(windowWidth * 0.8);
        let canvasHeight = parseInt(windowHeight * 0.6);
        let radius = 30; //圆形半径
        let titleFontSize = 20; // 标题字体大小
        let headWidth = 8 * titleFontSize; //标题矩形框宽度 = 7个字体
        let headHeight = 2 * radius; //标题高度 = 直径
        let bodyWidth = canvasWidth; //正文宽度
        let bodyHeight = canvasHeight - headHeight - radius; //正文高度

        //给整个大画布上色
        ctx.setFillStyle("#fffff5");
        ctx.fillRect(0, 0, windowWidth, windowHeight);

        //下载头像 之后开始画内容
        wx.downloadFile({
            url: wx.getStorageSync('userInfo').avatarUrl,
            success: function (res) {
                that.cricleImg(ctx, res.tempFilePath, windowWidth / 2 - radius, radius, radius);
                //画标题
                ctx.setFontSize(titleFontSize);
                ctx.setFillStyle('#590000');
                ctx.fillText('三国群雄，我是', windowWidth / 2 - 3 * titleFontSize, 4 * radius);
                //画结果

                ctx.drawImage("/images/A1.png", windowWidth * 0.1, 5 * radius, canvasWidth, canvasHeight);
                ctx.setFillStyle('#000');
                ctx.setFontSize(18);
                ctx.fillText(cname, windowWidth / 2 - 18, 7 * radius);

                //对描述的字符换行处理
                var titleHeight = 8 * radius; // 标题的高度
                var initHeight = 8 * radius; //绘制字体距离canvas顶部初始的高度
                titleHeight = that.drawText(ctx, cdescribe, initHeight, titleHeight, canvasWidth); // 调用行文本换行函数

                //画小程序码
                ctx.drawImage("/images/pg1.png", windowWidth * 0.2, titleHeight + 2 * radius, 2 * radius, 2 * radius);
                ctx.setFontSize(16);
                ctx.setFillStyle("#590000");
                ctx.fillText("长按小程序码测试", windowWidth * 0.42, titleHeight + 20 + 2 * radius);
                ctx.fillText("你是哪位三国英雄", windowWidth * 0.42, titleHeight + 50 + 2 * radius);
                ctx.draw();
            }
        })

    },

    // 版本2canvas画图
    drawResult2(cname, cdescribe) {
        var that = this;

        // canvas height：614  width: 375
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                const ctx = wx.createCanvasContext('myCanvas2');
                ctx.setFillStyle("#fffff5");
                ctx.fillRect(0, 0, 375, 614);

                //画结果图片
                ctx.drawImage("/images/A1.png", 73, 45, 228, 279);
                ctx.setFillStyle("#333");
                ctx.setFontSize(16);
                ctx.fillText("三国群雄，我是", 132, 100);    // title

                ctx.setFillStyle("#7a0707");
                ctx.setFontSize(30);
                ctx.fillText(cname, 157, 150);  //name

                ctx.setFillStyle("#333");
                ctx.setFontSize(14);
                that.drawText(ctx, cdescribe, 171, 171, 375);


                //画口号区
                //上划线
                ctx.beginPath();
                ctx.setLineWidth(0.3);
                ctx.moveTo(0, 396);
                ctx.lineTo(193, 396);
                ctx.stroke();

                //口号
                ctx.setFillStyle("#333");
                ctx.setFontSize(16);   // 第一行
                ctx.fillText("我是", 30, 428);

                var fontSize = 20;
                ctx.setFontSize(fontSize);
                while (ctx.measureText(res.data.nickName).width > 320) {
                    fontSize--;
                    ctx.setFontSize(fontSize);
                }
                ctx.fillText(res.data.nickName, 66, 428); //昵称

                ctx.setFontSize(16);
                ctx.fillText("邀请您一起来测一测", 30, 456) //第二行
                ctx.fillText("三国群雄，我是谁", 30, 484)   // 第三行

                //下划线
                ctx.beginPath();
                ctx.setLineWidth(0.3);
                ctx.moveTo(0, 500);
                ctx.lineTo(193, 500);
                ctx.stroke();

                //画小程序码
                ctx.save();
                ctx.setFillStyle("#fffff3")
                ctx.beginPath();
                ctx.arc(290, 446, 69, 0, 2 * Math.PI);
                ctx.fill();
                ctx.clip();
                ctx.drawImage("/images/pg1.png", 221, 377, 138, 138);
                ctx.restore();

                //小程序码底部文字
                ctx.setFontSize(14);
                ctx.fillText("长按识别小程序码", 237, 535);

                ctx.draw();
            }
        })



    },

    saveImg: function (e) {
        var that = this;
        //     that.drawResult(that.data.name, that.data.describe);
        //把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径。
        wx.getSystemInfo({
            success: function (res1) {
                wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: 375,
                    height: 614,
                    destWidth: 375 * res1.pixelRatio,
                    destHeight: 618 * res1.pixelRatio,
                    quality: 1,
                    canvasId: 'myCanvas2',
                    success: function (res) {
                        //console.log(res.tempFilePath);
                        that.setData({
                            tempFilePath: res.tempFilePath,
                        });
                        wx.saveImageToPhotosAlbum({

                            filePath: that.data.tempFilePath,

                            success(res) {
                                console.log(res.errMsg)
                            },
                            fail(res) {
                                console.log(res.errMsg)
                            }
                        });
                    },
                    fail: function (res) {
                        console.log(res.errMsg);
                    }

                });
            }
        })



    },
    onLoad: function (options) {
        let that = this;
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                that.setData({
                    userInfonickName: res.data.nickName
                })
                // console.log(res.data)
            }
        })
        wx.downloadFile({
            url: wx.getStorageSync('userInfo').avatarUrl,
            success: function (res) {
                that.setData({
                    userInfopUrl: res.tempFilePath
                })
            }
        })
        //       console.log(that.data.userInfoUrl);
        //找到三个权重中的最大值
        let properityA = options.A;
        let properityB = options.B;
        let properityC = options.C;
        let maxProperity = Math.max(properityA, properityB, properityC);


        //产生一个随机数
        let radIndex = parseInt(Math.random() * 6 - 1);

        if (properityA == maxProperity) {

            if (maxProperity < 6) {
                that.setData({
                    name: app.globalData.kind[0].name[radIndex],
                    describe: app.globalData.kind[0].describe,
                });
                //         that.drawResult(that.data.name, that.data.describe);
                that.drawResult2(that.data.name, that.data.describe);
            }
            else if (maxProperity < 9) {
                that.setData({
                    name: app.globalData.kind[1].name[radIndex],
                    describe: app.globalData.kind[1].describe,
                });
                //   that.drawResult(that.data.name, that.data.describe);
                that.drawResult2(that.data.name, that.data.describe);
            }
            else {
                that.setData({
                    name: app.globalData.kind[2].name[radIndex],
                    describe: app.globalData.kind[2].describe,
                });
                //   that.drawResult(that.data.name, that.data.describe);
                that.drawResult2(that.data.name, that.data.describe);
            }

        }

        else if (properityB == maxProperity) {

            if (maxProperity < 6) {
                that.setData({
                    name: app.globalData.kind[3].name[radIndex],
                    describe: app.globalData.kind[3].describe,
                });
                //   that.drawResult(that.data.name, that.data.describe);
                that.drawResult2(that.data.name, that.data.describe);
            }
            else if (maxProperity < 9) {
                that.setData({
                    name: app.globalData.kind[4].name[radIndex],
                    describe: app.globalData.kind[4].describe,
                });
                //   that.drawResult(that.data.name, that.data.describe);
                that.drawResult2(that.data.name, that.data.describe);
            }
            else {
                that.setData({
                    name: app.globalData.kind[5].name[radIndex],
                    describe: app.globalData.kind[5].describe,
                });
                //   that.drawResult(that.data.name, that.data.describe);
                that.drawResult2(that.data.name, that.data.describe);
            }

        }

        else if (properityC == maxProperity) {

            if (maxProperity < 6) {
                that.setData({
                    name: app.globalData.kind[6].name[radIndex],
                    describe: app.globalData.kind[6].describe,
                });
                //   that.drawResult(that.data.name, that.data.describe);
                that.drawResult2(that.data.name, that.data.describe);
            }
            else if (maxProperity < 9) {
                that.setData({
                    name: app.globalData.kind[7].name[radIndex],
                    describe: app.globalData.kind[7].describe,
                });
                //   that.drawResult(that.data.name, that.data.describe);
                that.drawResult2(that.data.name, that.data.describe);
            }
            else {
                that.setData({
                    name: app.globalData.kind[8].name[radIndex],
                    describe: app.globalData.kind[8].describe,
                });
                //   that.drawResult(that.data.name, that.data.describe);
                that.drawResult2(that.data.name, that.data.describe);
            }
        }

    },


// 查看该英雄的更多信息
findMore:function(e) {
    app.search(e.target.dataset.text, function (res) {
        let data = res.data.data;
        wx.navigateTo({
            url: '../matches/matches?data=' + JSON.stringify(data) + '&inputText=' + e.target.dataset.text
        })
    })
},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (options) {
        return {
            title: "测测你是哪位三国英雄",
            path: "pages/result/result",
            imageUrl: "",
            success: (res) => {
                console.log("转发成功", res);
            },
            fail: (res) => {
                console.log("转发失败", res);
            }
        }
    }
})