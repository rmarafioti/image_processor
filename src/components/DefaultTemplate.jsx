import { forwardRef, useState } from "react";
import { fr_logo } from "../data/formSelects";
import useEditImage from "../hooks/useEditImage";

import main_styles from "../styling/default_template.module.css";

const DefaultTemplate = forwardRef((props, ref) => {
  const {
    formState,
    selectedShow,
    isSelected,
    onSelect,
    isAddToQueueDisabled,
    isUploadedImage,
    styles,
    templateName,
    imageFill,
  } = props;

  const [isCropping, setIsCropping] = useState(false);
  const {
    position,
    scale,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleResizeMouseDown,
    resetPosition,
  } = useEditImage();

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
                style={isCropping ? { overflow: "visible" } : undefined}
                onMouseMove={isCropping ? handleMouseMove : undefined}
                onMouseUp={isCropping ? handleMouseUp : undefined}
              >
                {isCropping && <div className={main_styles.crop_frame} />}
                <div
                  className={main_styles.image_stage}
                  style={{
                    transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
                    ...(imageFill && { width: "100%" }),
                  }}
                >
                  {formState.show_images[templateName] && (
                    <div
                      className={main_styles.image_wrap}
                      style={{
                        ...(imageFill ? { width: "100%" } : undefined),
                        transform: `scale(${scale})`,
                        transformOrigin: "center center",
                      }}
                    >
                      <img
                        className={main_styles.image}
                        src={formState.show_images[templateName]}
                        onMouseDown={isCropping ? handleMouseDown : undefined}
                        draggable="false"
                        alt=""
                        style={{
                          ...(imageFill
                            ? { width: "100%", height: "auto" }
                            : undefined),
                          opacity: isCropping ? 0.8 : 1,
                        }}
                      />
                      {isCropping && (
                        <div className={main_styles.crop_overlay}>
                          <span
                            className={`${main_styles.handle} ${main_styles.tl}`}
                            onMouseDown={(e) => handleResizeMouseDown(e, "tl")}
                          />
                          <span
                            className={`${main_styles.handle} ${main_styles.tr}`}
                            onMouseDown={(e) => handleResizeMouseDown(e, "tr")}
                          />
                          <span
                            className={`${main_styles.handle} ${main_styles.bl}`}
                            onMouseDown={(e) => handleResizeMouseDown(e, "bl")}
                          />
                          <span
                            className={`${main_styles.handle} ${main_styles.br}`}
                            onMouseDown={(e) => handleResizeMouseDown(e, "br")}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
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
                *You cannot add art to the queue without a show, image, and date
                selected 🚫
              </i>
            </p>
          ) : (
            <div className={main_styles.template_ready}>
              <p className={main_styles.note}>
                <i>*Show art is ready to be added to the download queue! 😎</i>
              </p>
              <input
                type="checkbox"
                disabled={isAddToQueueDisabled}
                checked={isSelected}
                onChange={() => onSelect(templateName)}
                className={main_styles.checkbox}
              />
            </div>
          )}
          {isUploadedImage(templateName) && (
            <div
              className={main_styles.button_section}
              style={
                isCropping ? { position: "relative", zIndex: 10 } : undefined
              }
            >
              <div>
                <button
                  className={`${main_styles.format_button} ${
                    isCropping ? main_styles.active_button : ""
                  }`}
                  onClick={() => setIsCropping((prev) => !prev)}
                >
                  Crop
                </button>
                <button
                  className={main_styles.format_button}
                  onClick={() => {
                    resetPosition();
                    setIsCropping(false);
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </article>
    </article>
  );
});

export default DefaultTemplate;
