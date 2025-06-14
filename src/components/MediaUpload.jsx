import React, { useRef, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";

const storage = getStorage(app);

export default function MediaUpload({ onUploadComplete }) {
  const inputRef = useRef();
  const [uploading, setUploading] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `media/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);
    uploadTask.on(
      "state_changed",
      null,
      (error) => alert(error.message),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUploading(false);
          onUploadComplete(url, file.type);
        });
      }
    );
  };

  return (
    <div>
      <button
        className="bg-green-600 text-white px-3 py-1 rounded"
        onClick={() => inputRef.current.click()}
      >
        Upload Media
      </button>
      <input type="file" hidden ref={inputRef} onChange={handleFile} accept="image/*,audio/*,video/*" />
      {uploading && <p className="text-sm mt-2 text-gray-500">Uploading...</p>}
    </div>
  );
}
