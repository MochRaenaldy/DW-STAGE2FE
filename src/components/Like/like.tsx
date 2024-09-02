import { useEffect, useState } from "react";
import { api } from "../../libs/api";
import useStore from "../../stores/hooks";
import { Button, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

export default function Like(props: any) {
  const { postId } = props;
  const IdPost = parseInt(postId, 10);
  const { user } = useStore();
  const userId = user.id;
  const [count, setCount] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  const handleLike = async () => {
    try {
      await api.post(`/like/${postId}`, { userId });
      setCount(count + 1);
      setHasLiked(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnLike = async () => {
    try {
      await api.delete(`/like/unlike/${postId}`, { data: { userId } });
      setCount(count - 1);
      setHasLiked(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getLikeCount = async (IdPost: number) => {
      try {
        const res = await api.get(`/like/count/${IdPost}`);
        setCount(res.data.likes);
      } catch (error) {
        console.log(error);
      }
    };

    const checkIfLike = async (postId: number, userId: number) => {
      try {
        const res = await api.post(`/like/check/${postId}`, { userId });
        setHasLiked(res.data.liked);
      } catch (error) {
        console.log(error);
      }
    };
    getLikeCount(IdPost);
    checkIfLike(IdPost, userId);
  }, [IdPost]);

  return (
    <>
      <Button
        sx={{
          ":hover": { backgroundColor: "transparent" },
          width: "fit-content",
          minWidth: 0,
        }}>
        {hasLiked ? (
          <Icon
            onClick={handleUnLike}
            style={{ color: "red" }}
            fontSize={25}
            icon="clarity:heart-solid"
          />
        ) : (
          <Icon
            onClick={handleLike}
            style={{ color: "white" }}
            fontSize={25}
            icon="clarity:heart-line"
          />
        )}
      </Button>
      <Typography sx={{ mr: 1 , mt: 0.5}}>{count == 0? "0" : count}</Typography>
    </>
  );
}
