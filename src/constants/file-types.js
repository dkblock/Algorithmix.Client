const fileTypes = {
  application: {
    extensions: ["json", "pdf", "zip"],
    value: "application/json, application/pdf, application/zip",
  },
  archive: {
    extensions: ["zip"],
  },
  audio: {
    extensions: ["mp4", "mpeg", "webm"],
    value: "audio/mp4, audio/mpeg, audio/webm",
  },
  image: {
    extensions: ["jpg", "jpeg", "png", "bmp", "gif"],
    value: "image/jpg, image/jpeg, image/png, image/bmp, image/gif",
  },
  video: {
    extensions: ["mpeg", "mp4", "3gpp", "webm"],
    value: "video/mpeg, video/mp4, video/3gpp, video/webm",
  },
};

export default fileTypes;
