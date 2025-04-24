// pages/home/home.js
Page({
    data: {
      activeTab: 'notice', // 默认选中"通知公告"
      noticeList: [],      // 通知公告数据
      newsList: [],        // 水院要闻数据
      isLoading: false,    // 加载状态
      bannerImages: [      // 海报图片
        '../images/haibao/haibao-1.jpg',
        '../images/haibao/haibao-2.jpg',
        '../images/haibao/haibao-3.jpg'
      ]
    },
  
    // 切换标签
    switchTab(e) {
      const tab = e.currentTarget.dataset.tab;
      if (this.data.activeTab === tab) return;
      
      this.setData({
        activeTab: tab,
      });

      if (tab == "notice") {
          this.loadNoticeData();
      } else {
          this.loadNewsData();
      }
  
    },
  
    onLoad: function(options) {
      // 页面加载时默认加载通知公告数据
      this.loadNoticeData();
      // 预加载水院要闻数据
      this.loadNewsData();
    },
  
    // 加载通知公告数据
    loadNoticeData: function() {
      if (this.data.noticeList.length > 0) return;
      
      const noticeData = this.initNoticeData();
      this.setData({
        noticeList: noticeData
      });
    },
  
    // 加载水院要闻数据
    loadNewsData: function() {
      if (this.data.newsList.length > 0) return;
      
      const newsData = this.initNewsData();
      this.setData({
        newsList: newsData
      });
    },
  
    // 初始化通知公告数据
    initNoticeData: function() {
      return [
        {
            id: 1,
            title: '关于拟推荐参加浙江省第十九届"挑战杯"大学生课外学术科技作品竞赛参赛作品公示',
            source: '彭秋伟',
            viewcount: '20696浏览',
            date: '2023-04-15'
        },
        {
            id: 2,
            title: '水利学院2023年度优秀教师评选结果公示',
            source: '教务处',
            viewcount: '15632浏览',
            date: '2023-04-10'
        },
        {
            id: 3,
            title: '关于举办2023年校园开放日的通知',
            source: '校办公室',
            viewcount: '18945浏览',
            date: '2023-04-05'
        }
      ];
    },
  
    // 初始化水院要闻数据
    initNewsData: function() {
      return [
        {
            id: 101,
            title: '水利学院成功举办2023年水利科技创新论坛',
            source: '学院新闻中心',
            viewcount: '32456浏览',
            date: '2023-04-18'
        },
        {
            id: 102,
            title: '我院学子在全国大学生水利创新设计大赛中荣获特等奖',
            source: '学工办',
            viewcount: '28765浏览',
            date: '2023-04-12'
        },
        {
            id: 103,
            title: '水利学院与某水利集团签署战略合作协议',
            source: '院办',
            viewcount: '24532浏览',
            date: '2023-04-08'
        },
        {
            id: 104,
            title: '水利学院开展"世界水日"系列宣传活动',
            source: '团委',
            viewcount: '19876浏览',
            date: '2023-03-22'
        }
      ];
    },
    
    // 下拉刷新
    onPullDownRefresh: function() {
      if (this.data.activeTab === 'notice') {
        this.setData({ noticeList: [] });
        this.loadNoticeData();
      } else {
        this.setData({ newsList: [] });
        this.loadNewsData();
      }
      wx.stopPullDownRefresh();
    },
    // 跳转到详情页
    navigateToDetail: function(e) {
        const id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/detail/detail?id=' + id
        });
        },

    // 查看更多
    viewMore: function() {
        wx.showToast({
        title: '加载更多数据',
        icon: 'none'
        });
        // 这里可以添加加载更多数据的逻辑
    }
});