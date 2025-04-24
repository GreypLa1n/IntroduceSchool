// pages/home/home.js
Page({
  data: {
    activeTab: 'notice', // 默认选中"通知公告"
    noticeList: [],      // 通知公告数据
    newsList: [],        // 水院要闻数据
    isLoading: false,    // 加载状态
    swiperHeight: 'auto', // swiper高度
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

    // 切换标签后更新高度
    setTimeout(() => {
      this.updateSwiperHeight();
    }, 100);
  },

  onSwiperChange: function (e) {
    const currentIndex = e.detail.current;
    const newTab = currentIndex === 0 ? 'notice' : 'news';
    if (this.data.activeTab !== newTab) {
      this.setData({
        activeTab: newTab
      });
    }
  },

  onLoad: function (options) {
    // 页面加载时默认加载通知公告数据
    this.loadNoticeData();
    // 预加载水院要闻数据
    this.loadNewsData();
  },

  // 加载通知公告数据
  loadNoticeData: function () {
    if (this.data.noticeList.length > 0) return;

    const noticeData = this.initNoticeData();
    this.setData({
      noticeList: noticeData
    }, () => {
      this.updateSwiperHeight();
    });
  },

  // 加载水院要闻数据
  loadNewsData: function () {
    if (this.data.newsList.length > 0) return;

    const newsData = this.initNewsData();
    this.setData({
      newsList: newsData
    }, () => {
      this.updateSwiperHeight();
    });
  },

  // 初始化通知公告数据
  initNoticeData: function () {
    return [
      {
        id: 1,
        title: '关于拟推荐参加浙江省第十九届"挑战杯"大学生课外学术科技作品竞赛参赛作品公示',
        source: '彭秋伟',
        date: '2025-04-07'
      },
      {
        id: 2,
        title: '关于2025年暑期学生参加交流交换项目通知',
        source: '缪鸥',
        date: '2025-04-02'
      },
      {
        id: 3,
        title: '浙江水利水电学院来华留学生2025年招生简章 ZJWEU 2025 Admissions Guide for International Students',
        source: '学校官网',
        date: '2025-03-04'
      },
      {
        id: 4,
        title: '浙江水利水电学院2025年春季寒假出国（境）交流交换项目通知',
        source: '傅雪婷',
        date: '2024-10-30'
      },
      {
        id: 5,
        title: '【钱江论坛303期】探索未来科技人形机器人的奥秘与魅力',
        source: '李祯',
        date: '2024-09-29'
      }
    ];
  },

  // 初始化水院要闻数据
  initNewsData: function () {
    return [
      {
        id: 1,
        title: '读书节开幕！校长万健寄语学生：三面"镜子"助阅读',
        source: '徐小梅、周畅',
        date: '2025-04-24'
      },
      {
        id: 2,
        title: '校党委书记钱天国会见吉尔吉斯共和国驻华大使一行',
        source: '裴新平 图：王畅',
        date: '2025-04-11'
      },
      {
        id: 3,
        title: '学校党委理论学习中心组召开深入贯彻中央八大规定精神学习教育专题学习会',
        source: '李景龙',
        date: '2025-04-11'
      },
      {
        id: 4,
        title: '校长万健一行调研钱塘江北岸海塘安澜工程',
        source: '',
        date: '2025-04-11'
      },
      {
        id: 5,
        title: '学校成功举办中国教育发展战略学会人工智能与机器人教育专委会理事单位授牌仪式暨专题报告会',
        source: '李幸',
        date: '2025-04-07'
      }
    ];
  },

  // 下拉刷新
  onPullDownRefresh: function () {
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
  navigateToDetail: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    });
  },

  // 查看更多
  viewMore: function () {
    wx.showToast({
      title: '加载更多数据',
      icon: 'none'
    });
    // 这里可以添加加载更多数据的逻辑
  },

  // 更新swiper高度
  updateSwiperHeight: function () {
    const query = wx.createSelectorQuery();
    const currentTab = this.data.activeTab;
    const selector = `.content-list.${currentTab}-list`;

    query.select(selector).boundingClientRect(rect => {
      if (rect) {
        // 添加一些额外的空间来补偿可能的内边距
        const height = rect.height;
        this.setData({
          swiperHeight: height + 'px'
        });
      }
    }).exec();
  },

  // 监听页面显示
  onShow: function () {
    // 页面显示时更新高度
    setTimeout(() => {
      this.updateSwiperHeight();
    }, 300);
  }
});