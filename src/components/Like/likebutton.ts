// import { useEffect, useState } from "react";
// import { like, getLike, getThislike } from "../../lib/api/call/like";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import { Box } from "@mui/material";
// import { getPostLikes } from "../../libs/api/call/like";

// interface LikeButtonProps {
//   postId: number;
// }

// const LikeButton: React.FC<LikeButtonProps> = ({ postId }) => {
//   const [isliked, setLiked] = useState<Boolean>();
//   const [count, setCount] = useState<number>(0);
//   const onClick = async () => {
//     const result = await like(postId);
//     setLiked(result.liked);
//   };
//   useEffect(() => {
//     const fetchLikestatus = async () => {
//       const result = await getPostLikes(postId);
//     //   const countResult = await getThislike(postId);
//     //   const resCount = countResult.get;
//     //   setCount(resCount);
//       setLiked(result.liked);
//     };
//     fetchLikestatus();
//   }, [isliked, postId]);

// //   return (
// // //     <>
// // //       <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
// // //         {isliked == true ? (
// // //           <FavoriteIcon onClick={onClick} />
// // //         ) : (
// // //           <FavoriteBorderIcon onClick={onClick} />
// // //         )}
// // //         {count}
// // //       </Box>
// // //     </>
// //   );
// };

// export default LikeButton;
