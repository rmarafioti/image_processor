/*import { useState } from "react";*/
import styles from "./landing_page.module.css";

export default function App() {
  const shows = {
    show_name: "Big Shoulders Soul System",
    host_name: "Rich Marafioti",
    time: "18.00 ET",
    frequency: "monthly",
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <>
      <section className={styles.center}>
        <h1>This is the image processor project!</h1>
        <article className={styles.processor_container}>
          <section className={styles.image_container_wrapper}>
            <div className={styles.image_container}>
              <div className={styles.template_bar}>
                <p className={styles.text}>{shows.show_name}</p>
                <div className={styles.show_info_container}>
                  <p className={styles.show_info}>{shows.host_name}</p>
                  <p>&#124;</p>
                  {shows.frequency === "monthly" ? (
                    " "
                  ) : (
                    <p className={styles.show_info}>Day</p>
                  )}
                  <p className={styles.show_info}>Month</p>
                  <p>&#124;</p>
                  <p className={styles.show_info}>{shows.time}</p>
                </div>
              </div>
            </div>
          </section>
          <section>
            <p>Format A Show</p>
            <p>Select a show</p>
            <p>select month</p>
            <p>Select date</p>
            <p>Use Default Image</p>
            <p>Upload Image</p>
            <p>Clear Image</p>
            <p>Download Show Art</p>
            <p>Next Template</p>
          </section>
        </article>
      </section>
    </>
  );
}
