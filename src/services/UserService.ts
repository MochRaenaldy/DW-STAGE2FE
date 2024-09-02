import db from "../libs/db";
import { IUser } from "../types/user";

const user: IUser[] = [];

export const findAll = async () => {
  return await db.user.findMany({});
};

export const findbyuserlogin = async (userId :number) => {
return await db.user.findMany({
  where: {
    NOT: {
      id : userId,
    },
  },
  select : {
      id : true,
      username : true,
      profile_pic : true,
      email : true,
      fullName : true,
    },
})
};

export const findById = async (id: number) => {
  return await db.user.findFirst({
    where: { id },
  });
};

export const findByUsername = async (username: string) => {
  return await db.user.findMany({
    where: {
      username: {
        contains: username,
      },
    },
  });
};

export const update = async (id: number, update: IUser) => {
  console.log(update);
  const updatedUser = await db.user.update({
    data: update,
    where: { id },
    select: {
      id: true,
      username: true,
      profile_pic: true,
      email: true,
      fullName: true,
      bio : true,
    }
  });

  return updatedUser;
};

export const listfollower = async (id: number) => {
  const res = await db.follow.findMany({
    where: { followingId: id },
    include: {
      followers: {
        select: {
          id: true,
          username: true,
          profile_pic: true,
          fullName: true,
        },
      },
    }
}
);
return res
}

export const listfollowing = async (id: number) => {
  const res = await db.follow.findMany({
    where: { followingId: id },
    include: {
      following: {
        select: {
          id: true,
          username: true,
          profile_pic: true,
          fullName: true,
        },
      },
    }
  }
);
return res
}


export const countFollow = async (id: number) => {
  const res = await db.user.findUnique({
    where: { id },
    include :{
      following : true,
      followers : true,
    },
});
return res
}

export const remove = async (id: number) => {
  await db.user.delete({ where: { id } });

  return "deleted";
};

// export const create = async (post: User) => {
//   const newPost = await db.user.create({ data: post });

//   return newPost;
// };
