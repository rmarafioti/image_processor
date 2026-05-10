import { useState, useRef } from "react";
import { shows, months, days } from "../data/formSelects";
import ShowSearch from "./ShowSearch";

import { SlSettings } from "react-icons/sl";
import { BsArrowBarRight } from "react-icons/bs";

import styles from "../styling/controls.module.css";

export default function Controls({
  formState,
  selectedShow,
  handleFormChange,
  handleClearGuestHost,
  handleUploadImage,
  handleDefaultImage,
  handleClearImage,
  selectedTemplates,
  downloadStatus,
  handleDownloadAll,
  isAddToQueueDisabledPosts,
  isAddToQueueDisabledNowPlaying,
  isAddToQueueDisabledObs,
  dialogRef,
  handleFormClear,
}) {
  const fileInputRef = useRef(null);

  const isSetToDownload =
    selectedTemplates.length === 0 ||
    downloadStatus === "downloading" ||
    selectedTemplates.some((t) => {
      if (t === "now-playing") return isAddToQueueDisabledNowPlaying;
      if (t === "obs") return isAddToQueueDisabledObs;
      return isAddToQueueDisabledPosts;
    });

  return (
    <>
      <section className={styles.control_menu}>
        <ShowSearch
          value={formState.show}
          onChange={(show) =>
            handleFormChange({ target: { name: "show", value: show.id } })
          }
          options={shows}
          //
        />
        {formState.show !== "" && (
          <>
            <div>
              <p>Optional Guest Host</p>
              <div className={styles.guest_host_container}>
                <input
                  className={styles.field}
                  type="text"
                  name="guest_host"
                  aria-label="guest_host"
                  value={formState.guest_host}
                  onChange={handleFormChange}
                  placeholder="enter guest name here"
                />
                <button
                  onClick={handleClearGuestHost}
                  disabled={!formState.guest_host}
                  className={styles.guest_host_button}
                >
                  Clear Guest Name
                </button>
              </div>
            </div>
            <div>
              <p>Select day</p>
              <select
                className={styles.field}
                name="day"
                value={formState.day}
                aria-label="users_selected_day"
                onChange={handleFormChange}
                disabled={!formState.show}
              >
                <option value="">Select a day</option>
                {days.map((day, index) => (
                  <option key={index} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p>Select a Month</p>
              <select
                className={styles.field}
                name="month_name"
                value={formState.month_name}
                aria-label="users_selected_month"
                onChange={handleFormChange}
                disabled={!formState.show}
              >
                <option value="">Select a month</option>
                {months.map((month, index) => (
                  <option key={index} value={month.abbrev}>
                    {month.abbrev}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        {((selectedShow?.frequency === "weekly" &&
          formState.show !== "" &&
          formState.day !== "" &&
          formState.month_name !== "") ||
          (selectedShow?.frequency === "monthly" &&
            formState.show !== "" &&
            formState.month_name !== "")) && (
          <>
            <div>
              <p>Pick an image</p>
              <div className={styles.button_section}>
                <button
                  onClick={handleDefaultImage}
                  disabled={!formState.show}
                  className={styles.image_button}
                >
                  Default
                </button>
                <button
                  onClick={() => fileInputRef.current.click()}
                  disabled={!formState.show}
                  className={styles.image_button}
                >
                  Upload
                </button>
              </div>
              <input
                type="file"
                accept="image/*"
                className={styles.hidden_input}
                ref={fileInputRef}
                onChange={handleUploadImage}
              />
              <button
                onClick={handleClearImage}
                disabled={!formState.show_images}
                className={styles.remove_button}
              >
                Remove Image
              </button>
            </div>
          </>
        )}
        {!isSetToDownload && (
          <>
            <p className={styles.download_header}>Download Queue:</p>
            <ul className={styles.download_list}>
              {selectedTemplates.map((templateName) => (
                <li className={styles.download} key={templateName}>
                  {templateName} /
                </li>
              ))}
            </ul>
            <button onClick={handleDownloadAll}>
              {downloadStatus === "downloading"
                ? "Downloading..."
                : "Download Selected"}
            </button>
          </>
        )}
      </section>
    </>
  );
}
