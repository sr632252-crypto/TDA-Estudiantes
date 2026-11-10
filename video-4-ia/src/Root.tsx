import React from "react";
import { Composition } from "remotion";
import { Video, DURATION } from "./Video";
import { FPS, W, H } from "./theme";

export const RemotionRoot: React.FC = () => {
  return <Composition id="CuatroIA" component={Video} durationInFrames={DURATION} fps={FPS} width={W} height={H} />;
};
