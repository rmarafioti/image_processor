import { forwardRef } from "react";

import DefaultTemplate from "../components/DefaultTemplate";

import styles from "../styling/featured_template.module.css";

const FeaturedTemplate = forwardRef((props, ref) => {
  return (
    <DefaultTemplate
      {...props}
      ref={ref}
      styles={styles}
      width={1400}
      height={1750}
      templateName="featured"
    />
  );
});

export default FeaturedTemplate;
