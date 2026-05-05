import { forwardRef } from "react";
import { fr_logo } from "../data/formSelects";

import main_styles from "../styling/default_template.module.css";

const DefaultTemplate = forwardRef(
  (
    {
      formState,
      selectedShow,
      isSelected,
      onSelect,
      isAddToQueueDisabled,
      styles,
      templateName,
    },
    ref,
  ) => {
    return (
      <article className={styles.template}>
        <div className={styles.header_container}>
          <p className={main_styles.template_name}>{templateName} Template</p>
        </div>
        <article className={main_styles.processor_container}>
          <div>
            <section className={styles.image_container_wrapper}>
              <div className={styles.image_container_inner} ref={ref}>
                <div
                  className={styles.image_container}
                  style={
                    formState.show_images[templateName]
                      ? {
                          backgroundImage: `url(${formState.show_images[templateName]})`,
                        }
                      : undefined
                  }
                />
                {templateName === "now-playing" ? (
                  <div className={styles.now_playing}>
                    <p className={styles.now_playing_text}>
                      Now playing on{" "}
                      <b className={styles.bold_text}>the face radio</b>
                    </p>
                  </div>
                ) : (
                  " "
                )}
                {templateName === "obs" ? (
                  <>
                    <div className={styles.obs}>
                      <p className={styles.obs_text_first_child}>
                        {selectedShow?.time_range || "Time Range"}
                      </p>
                      <p>&#124;</p>
                      <p className={styles.obs_show_name}>
                        {selectedShow?.show_name || "Show Name"}
                      </p>
                      {/* if there is no host name then remove the pipe before the day */}
                      {selectedShow?.host_name === "" ? (
                        ""
                      ) : (
                        <>
                          <p>&#124;</p>
                          <p className={styles.obs_text_host_name}>
                            {formState.guest_host || selectedShow?.host_name}
                          </p>
                        </>
                      )}
                      <div className={styles.obs_location_container}>
                        <p className={styles.obs_text_location}>
                          {selectedShow?.location || "Location"}
                        </p>
                      </div>
                    </div>
                    <img
                      className={styles.fr_logo}
                      src={fr_logo.src}
                      alt={fr_logo.alt}
                    />
                  </>
                ) : (
                  <div className={styles.template_bar}>
                    <p className={styles.text}>
                      {selectedShow?.show_name || "Show Name"}
                    </p>

                    <div className={styles.show_info_container}>
                      {/* if there is no host name then remove the pipe before the day */}
                      {selectedShow?.host_name === "" ? (
                        ""
                      ) : (
                        <>
                          <p className={styles.show_info}>
                            {formState.guest_host || selectedShow?.host_name}
                          </p>
                          <p className={styles.show_info}>&#124;</p>
                        </>
                      )}
                      {/* now playing template shows the day for monthly or weekly */}
                      {(templateName === "archive" &&
                        selectedShow?.frequency === "monthly") ||
                      (templateName === "featured" &&
                        selectedShow?.frequency === "monthly") ||
                      (templateName === "facebook" &&
                        selectedShow?.frequency === "monthly") ||
                      (templateName === "bluesky" &&
                        selectedShow?.frequency === "monthly") ? (
                        " "
                      ) : (
                        <p className={styles.show_info}>
                          {formState.day || "XX"}
                        </p>
                      )}
                      <p className={styles.show_info}>
                        {formState.month_name || "XXX"}
                      </p>
                      <p className={styles.show_info}>
                        {new Date().getFullYear()}
                      </p>
                      <p className={styles.show_info}>&#124;</p>
                      <p className={styles.show_info}>
                        {selectedShow?.time || "00.00 ET"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
            {isAddToQueueDisabled ? (
              <p className={main_styles.note}>
                <i>
                  *You cannot add art to the queue without a show, image, and
                  date selected 🚫
                </i>
              </p>
            ) : (
              <p className={main_styles.note}>
                <i>*Show art is ready to be added to the download queue! 😎</i>
              </p>
            )}

            <div className={main_styles.button_section}>
              <div>
                <button className={main_styles.format_button}>
                  Crop Image
                </button>
                <button className={main_styles.format_button}>
                  Fill Image
                </button>
              </div>
              <input
                type="checkbox"
                disabled={isAddToQueueDisabled}
                checked={isSelected}
                onChange={() => onSelect(templateName)}
                className={main_styles.checkbox}
              />
            </div>
          </div>
        </article>
      </article>
    );
  },
);

export default DefaultTemplate;
