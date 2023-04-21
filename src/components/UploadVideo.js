import React from "react";
import axios from "axios";

export default function UploadVideo({ setVideoData }) {
  const changeHandler = async (file) => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    let userId = userData.user._id;
    let token = userData.auth;
    var formData = new FormData();
    formData.append("video", file);
    formData.append("userId", userId);
    let { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/uploadVideo`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    setVideoData(data.data);
    console.log(data);
  };
  return (
    <button>
      <label for="video">Upload Video</label>
      <input
        type="file"
        hidden
        id="video"
        onChange={(e) => changeHandler(e.target.files[0])}
      />
    </button>
  );
}
