import { forwardRef } from "react";

import DefaultTemplate from "../components/DefaultTemplate";

import styles from "../styling/bluesky_template.module.css";

const BlueskyTemplate = forwardRef((props, ref) => {
  return (
    <DefaultTemplate
      {...props}
      ref={ref}
      styles={styles}
      width={1200}
      height={600}
      templateName="bluesky"
    />
  );
});

export default BlueskyTemplate;
