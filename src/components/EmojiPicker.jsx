import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function EmojiPicker({ onSelect }) {
  return (
    <div className="absolute z-50">
      <Picker data={data} onEmojiSelect={(e) => onSelect(e.native)} />
    </div>
  );
}
