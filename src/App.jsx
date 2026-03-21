/*import { useState } from "react";*/
import styles from "./landing_page.module.css";

export default function App() {
  return (
    <>
      <section className={styles.center}>
        <h1>This is the image processor project!</h1>
        <div className={styles.image_container_wrapper}>
          <div className={styles.image_container}>
            <div className={styles.template_bar}>
              <p className={styles.text}>Show Name</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
