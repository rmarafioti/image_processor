import { useState, useRef } from "react";
import { shows, months, days } from "../data/formSelects";

import { MdClose } from "react-icons/md";

import styles from "../styling/controls.module.css";

export default function Controls({
  formState,
  selectedShow,
  handleFormChange,
  handleClearGuestHost,
  handleUploadImage,
  handleDefaultImage,
  handleClearImage,
}) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const fileInputRef = useRef(null);

  return (
    <>
      <button
        className={styles.control_icon}
        onClick={() => setIsMenuVisible(true)}
      >
        Edit Art
      </button>
      {isMenuVisible && (
        <>
          <section className={styles.control_menu}>
            <button
              className={styles.close_button}
              onClick={() => setIsMenuVisible(false)}
            >
              <MdClose />
            </button>
            <div>
              <p>Select a show</p>
              <select
                className={styles.field}
                name="show"
                value={formState.show}
                aria-label="users_selected_show"
                onChange={handleFormChange}
              >
                <option value="">Select a show</option>
                {shows.map((show) => (
                  <option key={show.id} value={show.id}>
                    {show.show_name} / {show.host_name}
                  </option>
                ))}
              </select>
            </div>
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
                      <option key={index} value={month}>
                        {month}
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
                    disabled={!formState.show_image}
                    className={styles.remove_button}
                  >
                    Remove Image
                  </button>
                </div>
              </>
            )}
          </section>
        </>
      )}
    </>
  );
}
