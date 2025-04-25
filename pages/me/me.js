Page({
    data: {
      avatarUrl: "pagesimages\\tab\\new-0.png",  // 初始化头像 
      defaultAvatarUrl: "pages\\images\\tab\\new-0.png",  // 默认头像路径 
      user: {
        name: "林穗穗",
        gender: "女",
        workerId: "2022b22022",
        department: "人工智能22-2",
        officePhone: "123456789",
        mobile: "987654321",
        email: "2022b22022@zjweu.edu.cn",
        officeAddress: "综合楼801",
      }
    },
  
    onLoad: function () {
        const avatar = wx.getStorageSync('avatarUrl');
        if (avatar) {
            this.setData({
                avatarUrl: avatar
            });
        }
    },

    // 选择头像
    chooseAvatar: function() {
        wx.chooseImage({
            count: 1,
            sizeType: ["original", "compressed"],
            sourceType: ["album", "camera"],
            success: (res) => {
                const newAvatar = res.tempFilePaths[0]  // 获取图片路径

                this.setData({
                    avatarUrl: newAvatar
                });

                wx.setStorageSync("avatarUrl", newAvatar);
            },
            fail: (err) => {
                console.error("选择头像失败", err);
            }
        });
    },

    // 恢复默认头像
    restoreDefaultAvatar: function (){
        this.setData({
            avatarUrl: this.data.defaultAvatarUrl
        });

        wx.setStorageSync('avatarUrl', this.data.defaultAvatarUrl);
    },
  
    contactUser: function () {
      // Handle contact logic
    },
  
    sendEmail: function () {
      // Handle email sending logic
    }
  })