import { forwardRef } from "react";

const DefaultTemplate = forwardRef(
  (
    {
      formState,
      selectedShow,
      handleDownload,
      isAddToQueueDisabled,
      styles,
      width,
      height,
      templateName,
    },
    ref,
  ) => {
    return (
      <article className={styles.template}>
        <div className={styles.header_container}>
          <p className={styles.template_name}>{templateName} Template</p>
        </div>
        <article className={styles.processor_container}>
          <div>
            <section className={styles.image_container_wrapper}>
              <div
                ref={ref}
                className={styles.image_container}
                style={
                  formState.default_image
                    ? { backgroundImage: `url(${formState.default_image})` }
                    : undefined
                }
              >
                <div className={styles.template_bar}>
                  <p className={styles.text}>
                    {selectedShow?.show_name || "Show Name"}
                  </p>

                  <div className={styles.show_info_container}>
                    <p className={styles.show_info}>
                      {formState.guest_host ||
                        selectedShow?.host_name ||
                        "Host Name"}
                    </p>

                    <p className={styles.show_info}>&#124;</p>
                    {selectedShow?.frequency === "monthly" ? (
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
              </div>
            </section>
            {isAddToQueueDisabled ? (
              <p className={styles.note}>
                <i>
                  *You cannot add art to the queue without a show, image, and
                  date selected 🚫
                </i>
              </p>
            ) : (
              <p className={styles.note}>
                <i>*Show art is ready to be added to the download queue! 😎</i>
              </p>
            )}

            <div className={styles.button_section}>
              <div>
                <button className={styles.format_button}>Crop Image</button>
                <button className={styles.format_button}>Fill Image</button>
              </div>
              {/* this button holds the download functionality,
                we want to move this functionality to a button in the download queue
                and replace this buttons functionality with one that puts the processed
                art in the download queue*/}
              <button
                onClick={() => handleDownload(ref, width, height, templateName)}
                disabled={isAddToQueueDisabled}
                className={styles.stage_download_button}
              >
                check
              </button>
            </div>
          </div>
        </article>
      </article>
    );
  },
);

export default DefaultTemplate;
