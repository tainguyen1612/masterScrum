import { storage } from "../config/firebase";
import alert from "../constans/alert";
let process;
export const handleUpload = (image) => {
  const uploadTask = storage.ref(`images/${image.name}`).put(image);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      progress = process;
    },
    (error) => {
      console.log(error);
      alert("can not upload image", "error");
    },
    () => {
      storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then((url) => {
          alert("upload successfully", "success");
          return { process, url };
        });
    }
  );
};