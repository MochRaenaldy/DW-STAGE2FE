import React, { useState } from 'react'
import { addLike } from '../libs/api/call/like';

const like = () => {
const [like, setlike] = useState<Boolean>()

  const isLike = async () => {
    const res = await addLike(postId);
    if (res && res?.status === 200) {
      setlike(res?.data);
    }
  };

  return (
    <div>like</div>
  )
}

export default like