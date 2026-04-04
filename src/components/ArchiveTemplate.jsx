import { forwardRef } from "react";

import DefaultTemplate from "./DefaultTemplate";

import styles from "../styling/archive_template.module.css";

const ArchiveTemplate = forwardRef((props, ref) => {
  return (
    <DefaultTemplate
      {...props}
      ref={ref}
      styles={styles}
      width={1400}
      height={1400}
      templateName="archive"
    />
  );
});

export default ArchiveTemplate;
