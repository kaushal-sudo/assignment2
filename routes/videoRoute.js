const User = require("../models/User");
const Video = require("../models/Video");

module.exports.UploadVideo = async (req, res) => {
  const userId = req.body.userId;
  const filePath = req.file.path;
  const Url = process.env.SERVER_URL + filePath.split("\\")[1];
  console.log(Url, filePath);
  await Video.create({
    userId: userId,
    Url: Url,
  });
  let videoData = await Video.find({});
  res.json({ msg: "File Uploaded", data: videoData });
};

module.exports.UpdateVideo = async (req, res) => {
  const { userId, videoId, likes, comments } = req.body;
  let videoData = await Video.findById(videoId);
  let tmpLikes = videoData.likes,
    tmpComments = videoData.comments;
  if (likes) {
    let flag = 0;
    for (let i = 0; i < tmpLikes.length; i++) {
      if (tmpLikes[i].userId === userId) {
        if (tmpLikes[i].likes) tmpLikes[i].likes = false;
        else tmpLikes[i].likes = true;
        flag = 1;
        break;
      }
    }
    if (!flag) tmpLikes.push({ userId: userId, likes: true });
  }
  if (comments) tmpComments.push({ userId: userId, comments: comments });
  await Video.findByIdAndUpdate(
    videoId,
    {
      likes: tmpLikes,
      comments: tmpComments,
    },
    { new: true }
  );
  let data = await Video.find({});
  return res.send({ msg: "Video Updated", data: data });
};
