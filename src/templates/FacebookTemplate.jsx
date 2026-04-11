import { forwardRef } from "react";

import DefaultTemplate from "../components/DefaultTemplate";

import styles from "../styling/facebook_template.module.css";

const FacebookTemplate = forwardRef((props, ref) => {
  return (
    <DefaultTemplate
      {...props}
      ref={ref}
      styles={styles}
      width={1200}
      height={630}
      templateName="facebook"
    />
  );
});

export default FacebookTemplate;
