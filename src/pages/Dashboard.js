import React, { useEffect, useState } from "react";
import UploadVideo from "../components/UploadVideo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import "../../src/App.css";
import Comments from "../components/Comments";

export default function Dashboard() {
  const [videoData, setVideoData] = useState({});
  const [userData, setUserData] = useState({});
  const [allUsersData, setAllUsersData] = useState({});

  const navigate = useNavigate();
  const getUserName = (userId) => {
    for (let idx in allUsersData) {
      if (allUsersData[idx]._id === userId) return allUsersData[idx].name;
    }
  };
  const getData = async () => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    setUserData(userData);
    let token = userData.auth;
    let { data } = await axios.get("http://localhost:5000/dashboard", {
      headers: {
        Authorization: token,
      },
    });
    setVideoData(data.data);

    let allUsers = await axios.get("http://localhost:5000/allusers", {
      headers: {
        Authorization: token,
      },
    });
    console.log(allUsers.data.data);
    setAllUsersData(allUsers.data.data);
  };
  const logoutHandler = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div
        style={{
          paddingTop: "1rem",
          paddingBottom: "1rem",
          paddingLeft: "1rem",
          border: "1px solid"
        }}
      >
        Welcome {userData.user && userData.user.name}{" "}
        <UploadVideo setVideoData={setVideoData} />{" "}
        <button onClick={() => logoutHandler()}>Logout</button>
      </div>
      {videoData &&
        videoData.length &&
        videoData.map((data, idx) => {
          return (
            <div className="videoWrapper">
              <div className="cardTop">
                <Avatar sx={{ bgcolor: "purple" }}>OP</Avatar>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {getUserName(data.userId)}
                </div>
              </div>
              <div className="videoCommentsWrapper">
                <video
                  src={data.Url}
                  key={data._id}
                  className="video"
                  controls
                  style={{ borderRadius: "1.5rem" }}
                ></video>
                <div className="commentsSection">
                  <Comments
                    commentData={data.comments}
                    getUserName={getUserName}
                    likeData={data.likes}
                    videoId={data._id}
                    setVideoData={setVideoData}
                  />
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
