import { useState, useRef } from "react";
import { domToPng } from "modern-screenshot";
import styles from "./landing_page.module.css";
import { shows, months, days } from "./data/formSelects";

export default function App() {
  const formInitialState = {
    show: "",
    month_name: "",
    day: "",
    guest_host: "",
    default_image: "",
  };

  const [formState, setFormState] = useState(formInitialState);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "show") {
      setFormState({ ...formInitialState, show: value });
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleClearGuestHost = () => {
    setFormState((prev) => ({ ...prev, guest_host: "" }));
  };

  const handleDefaultImage = () => {
    if (!selectedShow?.default_image) return;
    setFormState((prev) => ({
      ...prev,
      default_image: selectedShow.default_image,
    }));
  };

  const handleClearImage = () => {
    setFormState((prev) => ({ ...prev, default_image: "" }));
  };

  const selectedShow = shows.find((show) => show.id === Number(formState.show));

  const containerRef = useRef(null);

  const handleDownload = async () => {
    if (!containerRef.current) return;

    // Temporarily remove the transform so it captures at full 1400px
    containerRef.current.style.transform = "none";

    const dataUrl = await domToPng(containerRef.current, {
      width: 1400,
      height: 1400,
      scale: 1,
    });

    // Restore the transform
    containerRef.current.style.transform = "scale(0.3)";

    const year = String(new Date().getFullYear()).slice(-2);
    const month = formState.month_name?.toUpperCase() || "XXX";
    const showName =
      selectedShow?.show_name?.toLowerCase().replace(/\s+/g, "-") || "show-art";

    const fileName = `${month}${year}-${showName}`;

    const link = document.createElement("a");
    link.download = `${fileName}.png`;
    link.href = dataUrl;
    link.click();
  };

  const isAddToQueueDisabled =
    !formState.show ||
    !formState.default_image ||
    !formState.month_name ||
    /*if show is weekly button is disbaled if no day is selected*/
    (selectedShow?.frequency === "weekly" && !formState.day);

  return (
    <>
      <section className={styles.center}>
        <h1>the face radio image processor</h1>
        <section className={styles.fields}>
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
                  {show.show_name}
                </option>
              ))}
            </select>
          </div>
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
                disabled={!formState.show}
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
        </section>
        <section className={styles.fields}>
          <button
            name="default_image"
            value={formState.default_image}
            onClick={handleDefaultImage}
            disabled={!formState.show}
          >
            Use Default Image
          </button>
          <button disabled={!formState.show}>Upload Image</button>
          <button disabled={!formState.default_image}>
            Fill Image in Frame
          </button>
          <button disabled={!formState.default_image}>Adjust Image</button>
          <button
            onClick={handleClearImage}
            disabled={!formState.default_image}
          >
            Clear Image
          </button>
        </section>
        <article className={styles.processor_container}>
          <div>
            <section className={styles.image_container_wrapper}>
              <div
                ref={containerRef}
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

            <div>
              {/* this button holds the download functionality,
              we want to move this functionality to a button in the download queue
              and replace this buttons functionality with one that puts the processed
              art in the download queue*/}
              <button
                onClick={handleDownload}
                disabled={isAddToQueueDisabled}
                className={styles.queue_button}
              >
                Add Art to Download Queue
              </button>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
