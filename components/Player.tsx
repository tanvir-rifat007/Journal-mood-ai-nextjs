"use client";
import ReactPlayer from "react-player";

const Player = ({ url }) => {
  return (
    <div>
      <ReactPlayer url={url} controls={true} width="100%" height="100%" />
    </div>
  );
};

export default Player;
