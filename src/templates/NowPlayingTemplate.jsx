import { forwardRef } from "react";

import DefaultTemplate from "../components/DefaultTemplate";

import styles from "../styling/now_playing_template.module.css";

const NowPlayingTemplate = forwardRef((props, ref) => {
  return (
    <DefaultTemplate
      {...props}
      ref={ref}
      styles={styles}
      width={1080}
      height={1920}
      templateName="now-playing"
    />
  );
});

export default NowPlayingTemplate;
