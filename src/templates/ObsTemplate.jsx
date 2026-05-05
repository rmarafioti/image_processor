import { forwardRef } from "react";

import DefaultTemplate from "../components/DefaultTemplate";

import styles from "../styling/obs_template.module.css";

const ObsTemplate = forwardRef(({ isAddToQueueDisabledObs, ...props }, ref) => {
  return (
    <DefaultTemplate
      {...props}
      isAddToQueueDisabled={isAddToQueueDisabledObs}
      ref={ref}
      styles={styles}
      width={1920}
      height={1080}
      templateName="obs"
    />
  );
});

export default ObsTemplate;
