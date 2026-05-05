import { forwardRef } from "react";

import DefaultTemplate from "../components/DefaultTemplate";

import styles from "../styling/archive_template.module.css";

const ArchiveTemplate = forwardRef(
  ({ isAddToQueueDisabledPosts, ...props }, ref) => {
    return (
      <DefaultTemplate
        {...props}
        isAddToQueueDisabled={isAddToQueueDisabledPosts}
        ref={ref}
        styles={styles}
        width={1400}
        height={1400}
        templateName="archive"
      />
    );
  },
);

export default ArchiveTemplate;
