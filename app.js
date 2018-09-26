//app.js
var Config = {
    service: "https://dcg.styihm.com/hero/"
}
App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
    },
    globalData: {
        userInfo: null
    },
    search: function(name, cb) {
        wx.request({
            url: `${Config.service}intro/${name}`,
            success: function(res) {
                cb(res);
            },
            fail: function(res) {
                wx.showToast({
                    title: "获取失败!",
                    icon: 'fail',
                    duration: 2000
                })
            }

        })
    },

    // 精准搜索
    preciseSearch: function(id, cb) {
        wx.request({
            url: `${Config.service}details/${id}`,

            success: function(res) {
                cb(res);
            },
            fail: function(res) {
                wx.showToast({
                    title: "获取失败!",
                    icon: 'fail',
                    duration: 2000
                })
            }
        })
    },


    // 性格测试数据和结果
    globalData: {
        userInfo: null,
        question: [
            {
                "question": "如果你穿越到三国时期，你希望拥有什么能力",
                "option": {
                    "A": {
                        content: "智谋无双",
                        weight: [1, 0, 0]
                    },
                    "B": {
                        content: "勇武过人",
                        weight: [0, 1, 0]
                    },
                    "C": {
                        content: "智勇双全",
                        weight: [0, 0, 1]
                    },
                }
            },
            {
                "question": "在一场战役中，你最愿意",
                "option": {
                    "A": {
                        content: " 旁敲侧击，寻找时机",
                        weight: [1, 0, 0]
                    },
                    "B": {
                        content: "勇冠三军，奋勇杀敌",
                        weight: [0, 1, 0]
                    },
                    "C": {
                        content: "坐镇后方，洞察全局",
                        weight: [0, 0, 1]
                    },
                }
            },
            {
                "question": "如果与敌军狭路相逢，你希望",
                "option": {
                    "A": {
                        content: "寻机脱身，留的青山",
                        weight: [1, 0, 0]
                    },
                    "B": {
                        content: "狭路相逢勇者胜",
                        weight: [0, 1, 0]
                    },
                    "C": {
                        content: "利用一切有利因素打击敌人",
                        weight: [0, 0, 1]
                    },
                }
            },
            {
                "question": "当你深陷敌军重围之中，你会",
                "option": {
                    "A": {
                        content: "不屈不挠，有礼有节",
                        weight: [1, 0, 0]
                    },
                    "B": {
                        content: "奋勇突围",
                        weight: [0, 1, 0]
                    },
                    "C": {
                        content: "忍辱负重",
                        weight: [0, 0, 1]
                    },
                }
            },
            {
                "question": "在追击敌方的时候，你的希望是",
                "option": {
                    "A": {
                        content: "撒点儿油让对方摔倒",
                        weight: [1, 0, 0]
                    },
                    "B": {
                        content: "身先士卒，穷追不舍",
                        weight: [0, 1, 0]
                    },
                    "C": {
                        content: "派人去追",
                        weight: [0, 0, 1]
                    },
                }
            },
            {
                "question": "你要带兵去攻打一座城，你会选择",
                "option": {
                    "A": {
                        content: "攻心为上，攻城为下",
                        weight: [1, 0, 0]
                    },
                    "B": {
                        content: "以十攻一，攻城拔寨",
                        weight: [0, 1, 0]
                    },
                    "C": {
                        content: "围困以待，等待时机",
                        weight: [0, 0, 1]
                    },
                }
            },
            {
                "question": "敌众我寡，你要守一座城，你会选择",
                "option": {
                    "A": {
                        content: "设计魅惑，遮掩虚实",
                        weight: [1, 0, 0]
                    },
                    "B": {
                        content: "严防死守，人在城在",
                        weight: [0, 1, 0]
                    },
                    "C": {
                        content: "寻找盟军，寻求支援",
                        weight: [0, 0, 1]
                    },
                }
            },
            {
                "question": "你认为要治理好一个国家最需要的是什么样的人",
                "option": {
                    "A": {
                        content: "智商极高，善于出谋划策",
                        weight: [1, 0, 0]
                    },
                    "B": {
                        content: "在战场上攻无不克",
                        weight: [0, 1, 0]
                    },
                    "C": {
                        content: "善于用人，排兵布阵",
                        weight: [0, 0, 1]
                    },
                }
            },
            {
                "question": "你认为你更偏向于",
                "option": {
                    "A": {
                        content: "保守稳健，居安思危",
                        weight: [1, 0, 0]
                    },
                    "B": {
                        content: "强势进取，志在必得",
                        weight: [0, 1, 0]
                    },
                    "C": {
                        content: "以大局为重，不盲从",
                        weight: [0, 0, 1]
                    },
                }
            },
            {
                "question": "你因为心烦作出错误决定的频率高吗",
                "option": {
                    "A": {
                        content: "偶尔影响",
                        weight: [1, 0, 0]
                    },
                    "B": {
                        content: "经常影响",
                        weight: [0, 1, 0]
                    },
                    "C": {
                        content: "基本没有",
                        weight: [0, 0, 1]
                    },
                }
            }
        ],
        kind: [
            {
                "name": ["费祎", "董允", "张昭", "张纮", "虞翻", "蒋琬"],
                "describe": "你做事大胆，敢于冒险，通晓时局，运筹帷幄，有着深思熟虑的大智慧。",
            },
            {
                "name": ["荀攸", "杨修", "李儒", "法正", "田丰", "懂昭"],
                "describe": "你善于隐忍，不出手则已，一出手必是石破天惊，一击必杀。不达目的誓不罢休，是一个聪明人。",
            },
            {
                "name": ["诸葛亮", "郭嘉", "庞统", "贾诩", "鲁肃", "徐庶"],
                "describe": "你有经天纬地之才，鬼神不测之机。 深通有算略，达于事情。",
            },
            {
                "name": ["张辽", "甘宁", "曹彰", "徐晃", "夏侯惇", "张郃"],
                "describe": "你是个勇敢无畏的探险家，喜欢孤身犯险地一往无前，更喜欢释放天性的无拘无束。",
            },
            {
                "name": ["典韦", "许褚", "黄忠", "庞德", "太史慈", "孙策"],
                "describe": "你富有冒险精神，对于新鲜事物跃跃欲试，时刻保持着旺盛的精力与活力。",
            },
            {
                "name": ["吕布", "颜良", "文丑", "马超", "张飞", "赵云"],
                "describe": "你崇尚绝对的力量，坚信真正的强盛可以无坚不摧，开朗而富有领袖潜质。",
            },
            {
                "name": ["刘备", "夏侯尚", "于禁", "荀彧", "魏延", "孙坚"],
                "describe": "你是一个有勇有谋的人，非常具有正义感。勇挚刚毅，有忠壮之烈，不拘一格。",
            },
            {
                "name": ["吕蒙", "陈泰", "满宠", "陆抗", "羊祜", "关羽"],
                "describe": "你善于发现别人的才能，交际广泛，能谦恭待人，有较强的领导能力。",
            },
            {
                "name": ["曹操", "周瑜", "陆逊", "司马懿", "邓艾", "姜维"],
                "describe": "你是一个足智多谋、才智过人的统帅，敢作敢为，坚韧不拔，终成大事。"
            },
            {

            }
        ],
    }
})