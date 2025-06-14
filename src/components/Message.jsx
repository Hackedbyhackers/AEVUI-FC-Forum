import React from "react";
import { auth } from "../firebase";

export default function Message({ message }) {
  const { text, uid, photoURL, displayName, mediaUrl, mediaType } = message;
  const currentUser = auth.currentUser;
  const isOwnMessage = uid === currentUser?.uid;

  const messageClass = isOwnMessage
    ? "self-end bg-blue-500 text-white"
    : "self-start bg-gray-300 text-black";

  return (
    <div className={`message p-3 rounded max-w-xs break-words my-1 ${messageClass}`}>
      <div className="flex items-center space-x-2 mb-1">
        {photoURL ? (
          <img src={photoURL} alt={displayName} className="w-6 h-6 rounded-full" />
        ) : (
          <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-white">
            {displayName?.charAt(0) || "?"}
          </div>
        )}
        <span className="font-semibold text-sm">{displayName}</span>
      </div>
      <p>{text}</p>

      {mediaUrl && (
        <>
          {mediaType.startsWith("image/") && (
            <img src={mediaUrl} alt="uploaded" className="rounded max-w-xs mt-2" />
          )}
          {mediaType.startsWith("audio/") && (
            <audio controls className="mt-2 w-full">
              <source src={mediaUrl} />
              Your browser does not support the audio element.
            </audio>
          )}
          {mediaType.startsWith("video/") && (
            <video controls className="mt-2 w-full rounded">
              <source src={mediaUrl} />
              Your browser does not support the video tag.
            </video>
          )}
        </>
      )}
    </div>
  );
}
