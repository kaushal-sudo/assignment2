import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

export default function Comments({
  commentData,
  getUserName,
  likeData,
  videoId,
  setVideoData,
}) {
  const [countLikes, setCountLikes] = useState(0);
  const [likeColor, setLikeColor] = useState(false);
  const [comment, setComment] = useState("");

  const likesHandler = async () => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    let userId = userData.user._id;
    let token = userData.auth;
    let { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/updateVideo`,
      {
        userId: userId,
        videoId: videoId,
        likes: true,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setVideoData(data.data);
  };

  const commentHandler = async () => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    let userId = userData.user._id;
    let token = userData.auth;
    let { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/updateVideo`,
      {
        userId: userId,
        videoId: videoId,
        comments: comment,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setVideoData(data.data);
  };

  useEffect(() => {
    let userId = JSON.parse(localStorage.getItem("userData")).user._id;
    if (likeData) {
      let tmpLikes = 0,
        tmpLikeColor = false;
      for (let idx in likeData) {
        if (likeData[idx].likes) tmpLikes++;
        if (likeData[idx].likes && likeData[idx].userId === userId)
          tmpLikeColor = true;
      }
      console.log(tmpLikeColor);
      setCountLikes(tmpLikes);
      setLikeColor(tmpLikeColor);
    }
  }, [likeData]);
  return (
    <>
      <div style={{ marginBottom: "1rem", borderBottom: "1px solid gray" }}>
        Comments
      </div>
      <div className="allCommentsWrapper">
        {commentData &&
          commentData.map((data) => {
            return (
              <>
                <div style={{ display: "flex", gap: "0.25rem" }}>
                  <Avatar sx={{ bgcolor: "purple" }}>OP</Avatar>{" "}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      textDecoration: "underline",
                      fontWeight: "bold",
                    }}
                  >
                    {getUserName(data.userId)}
                  </div>
                </div>
                <div style={{ marginLeft: "2.75rem" }}>{data.comments}</div>
              </>
            );
          })}
      </div>
      <div className="commentsSectionBottomWrapper">
        <FavoriteIcon
          style={{ cursor: "pointer", color: likeColor ? "red" : "gray" }}
          onClick={() => likesHandler()}
        />
        <div>{countLikes} Likes</div>
        <div
          style={{
            display: "flex",
            gap: "0.25rem",
            marginLeft: "1rem",
            width: "80%",
          }}
        >
          <input
            type="text"
            placeholder="Type Comment Here..."
            style={{ width: "70%" }}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            style={{ cursor: "pointer" }}
            onClick={() => commentHandler()}
          >
            Add Comment
          </button>
        </div>
      </div>
    </>
  );
}
