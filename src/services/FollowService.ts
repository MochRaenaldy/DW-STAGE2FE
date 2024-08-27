import db from "../libs/db";

export const follow = async (body: any) => {
    const follow = await db.follow.create({
        data: {
            ...body,
        },
    });
    return follow;
}

export const unfollow = async (body: any) => {
    const unfollow = await db.follow.delete({
        where: {
            ...body,
        },
    });
    return unfollow;
}

export const checkFollow = async (body: any) => {
    const check = await db.follow.findFirst({
        where: {
            ...body,
        },
    });
    return check;
}

