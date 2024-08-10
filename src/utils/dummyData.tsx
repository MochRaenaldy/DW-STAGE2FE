export const dummyUserList = [
  {
    userId: 1,
    user: {
      username: "Clorinder",
      email: "Clorinde@gmail.com",
      bio: "Genshin Impact Clorinde Build",
      following: 30,
      followers: 40,
    },
    image: "https://rerollcdn.com/GENSHIN/Characters/1/Clorinde.png",
    isFollow: true,
  },
  {
    userId: 2,
    user: {
      username: "Ganyu",
      email: "ganyu@gmail.com",
      bio: "Genshin Impact Ganyu Build",
      following: 20,
      followers: 40,
    },
    image: "https://rerollcdn.com/GENSHIN/Characters/1/Ganyu.png",
    isFollow: false,
  },
  {
    userId: 3,
    user: {
      username: "Hutao",
      email: "hutao@gmail.com",
      bio: "Genshin Impact Hutao Build",
      following: 20,
      followers: 100,
    },
    image: "https://rerollcdn.com/GENSHIN/Characters/1/Hu%20Tao.png",
    isFollow: true,
  },
  {
    userId: 4,
    user: {
      username: "Yelan",
      email: "Yelan@gmail.com",
      bio: "Genshin Impact Yelan Build",
      following: 1010,
      followers: 10001,
    },
    image: "https://rerollcdn.com/GENSHIN/Characters/1/Yelan.png",
    isFollow:false,
  },
  {
    userId: 5,
    user: {
      username: "Nahida",
      email: "nahida@gmail.com",
      bio: "Genshin Impact Nahida Build",
      following: 10,
      followers: 10100,
    },
    image: "https://rerollcdn.com/GENSHIN/Characters/1/Nahida.png",
    isFollow: true,
  },
  {
    userId: 6,
    user: {
      username: "Chiori",
      email: "Chiori@gmail.com",
      bio: "Genshin Impact Chiori Build",
      following: 202,
      followers: 1003,
    },
    image: "https://rerollcdn.com/GENSHIN/Characters/1/Chiori.png",
    isFollow: true,
  },
  {
    userId: 7,
    user: {
      username: "Keqing",
      email: "Keqing@gmail.com",
      bio: "Genshin Impact Keqing Build",
      following: 205,
      followers: 1010,
    },
    image: "https://rerollcdn.com/GENSHIN/Characters/1/Keqing.png",
    isFollow: false,
  },
];


export const dummyContentList = [
  {
    content: {
      id: 1,
      textContent: "kalian pernah ga sih main instagram tapi ga bisa dibuka",
      like: 200,
      replies: 100,
      isLike: false,
      time: "11.32AM July 26 Maret 2024",
    },
    user: {
      userId: 1,
      email: "Clorinder@gmail.com",
      username: "Clorinder",
      image: "https://rerollcdn.com/GENSHIN/Characters/1/Clorinde.png",
    },
  },
  {
    content: {
      id: 6,
      textContent: "Pisang itu sebenernya bergizi loh",
      like: 100,
      replies: 300,
      isLike: true,
    },
    user: {
      userId: 6,
      username: "Chiori",
      email: "Chiori@gmail.com",
      image: "https://rerollcdn.com/GENSHIN/Characters/1/Chiori.png",
    },
  },
  {
    content: {
      id: 4,
      textContent: "Tasukete",
      like: 2200,
      replies: 10400,
      isLike: true,
    },
    user: {
      userId: 4,
      username: "Yelan",
      email: "Yelan@gmail.com",
      image: "https://rerollcdn.com/GENSHIN/Characters/1/Yelan.png",
    },
  },
  {
    content: {
      id: 5,
      textContent: "Kono wa sekai subarashi",
      like: 21100,
      replies: 1400,
      isLike: false,
    },
    user: {
      userId: 5,
      username: "Nahida",
      email: "Nahida@gmail.com",
      image: "https://rerollcdn.com/GENSHIN/Characters/1/Nahida.png",
    },
  },
  {
    content: {
      id: 7,
      textContent: "Keqing Wangi Wangi",
      like: 25100,
      replies: 400,
      isLike: false,
    },
    user: {
      userId: 7,
      username: "Keqing",
      email: "Keqing@gmail.com",
      image: "https://rerollcdn.com/GENSHIN/Characters/1/Keqing.png",
    },
  },
  {
    content: {
      id: 2,
      textContent: "come to you",
      like: 35900,
      replies: 9400,
      isLike: true,
      time: "11.32 AM ",
    },
    user: {
      userId: 2,
      username: "Ganyu",
      email: "Ganyu@gmail.com",
      image: "https://rerollcdn.com/GENSHIN/Characters/1/Ganyu.png",
    },
  },
  {
    content: {
      id: 3,
      textContent: "Hutao dayo",
      like: 12900,
      replies: 2100,
      isLike: true,
    },
    user: {
      userId: 3,
      username: "Hutao",
      email: "Hutao@gmail.com",
      image: "https://rerollcdn.com/GENSHIN/Characters/1/Hu%20Tao.png",
    },
  },
];

export const dummyRepliesContent = [
  {
    contentReplies: {
      id: 1,
      contentId: 1,
      textReplies: "pernah sih, tapi saya tak peduli",
      like: 200,
      replies: 100,
      isLike: false,
      time: "4h",
    },
    userId: 7,
    user: {
      userId: 7,
      username: "Keqing",
      email: "Keqing@gmail.com",
      image: "https://rerollcdn.com/GENSHIN/Characters/1/Keqing.png",
    },
  },
  {
    contentReplies: {
      id: 1,
      contentId: 6,
      textReplies: "pernah sih, tapi saya tak peduli",
      like: 200,
      replies: 400,
      isLike: false,
      time: "8h",
    },
    userId: 1,
    user: {
      userId: 1,
      email: "Clorinder@gmail.com",
      username: "Clorinder",
      image: "https://rerollcdn.com/GENSHIN/Characters/1/Clorinde.png",
    },
  },
];