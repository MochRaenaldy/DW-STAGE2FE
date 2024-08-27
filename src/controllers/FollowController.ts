import errorHandler from "../utils/errorHandler";
import * as followService from "../services/FollowService";
import { Request, Response } from "express";

export const follow = async (req:Request, res: Response) => {
    try {
        const follow = await followService.follow(req.body);
        res.json(follow)
    } catch (error) {
        errorHandler(res, error as unknown as Error);
    }  
} 

export const unfollow = async (req:Request, res: Response) => {
    try {
        const unfollow = await followService.unfollow(req.body);
        res.json(unfollow)
    } catch (error) {
        errorHandler(res, error as unknown as Error);
    }  
}   

export const checkFollow = async (req:Request, res: Response) => {
    try {
        const check = await followService.checkFollow(req.body);
        res.json(check)
    } catch (error) {
        errorHandler(res, error as unknown as Error);
    }  
}   