import { storage } from "../config/firebase";

export const handleUpload = (pdf) => {
  const uploadTask = await storage.ref(`pdfs/${pdf.name}`).put(pdf);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
    },
    (error) => {
      alert("can not upload pdf", "error");
      console.log(error);
    },
    () => {
       storage
        .ref("pdfs")
        .child(pdf.name)
        .getDownloadURL()
        .then((url) => {
          alert("upload successfully", "success");
          return url;
        });
    }
  );
};