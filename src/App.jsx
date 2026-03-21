import { useState } from "react";
import styles from "./landing_page.module.css";

export default function App() {
  const formInitialState = {
    show: "",
    month_name: "",
    day: "",
    guest_host: "",
  };

  const [formState, setFormState] = useState(formInitialState);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearGuestHost = () => {
    setFormState((prev) => ({ ...prev, guest_host: "" }));
  };

  const shows = [
    {
      id: 1,
      show_name: "Test Show",
      host_name: "Jerry Seinfeld",
      time: "12.00 ET",
      frequency: "weekly",
    },
    {
      id: 2,
      show_name: "BIG SHOULDERS SOUL SYSTEM",
      host_name: "Rich Marafioti",
      time: "18.00 ET",
      frequency: "monthly",
    },
  ];

  const selectedShow = shows.find((show) => show.id === Number(formState.show));

  const days = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );

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
          <div>
            <section className={styles.image_container_wrapper}>
              <div className={styles.image_container}>
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
                    <p>&#124;</p>
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
                    <p>&#124;</p>
                    <p className={styles.show_info}>
                      {selectedShow?.time || "00.00 ET"}
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <div className={styles.action_container}>
              <button>Download Art</button>
              <button className={styles.clear_image_button}>Clear Image</button>
            </div>
          </div>
          <section className={styles.fields}>
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
            <p>Optional Guest Host</p>
            <div className={styles.guest_host_container}>
              <input
                className={styles.field}
                type="text"
                name="guest_host"
                aria-label="guest_host"
                value={formState.guest_host}
                onChange={handleFormChange}
                placeholder="enter guest host name"
              />
              {formState.guest_host != "" ? (
                <button
                  onClick={handleClearGuestHost}
                  className={styles.guest_host_button}
                >
                  Clear Guest Name
                </button>
              ) : (
                ""
              )}
            </div>
            <p>Select day</p>
            <select
              className={styles.field}
              name="day"
              value={formState.day}
              aria-label="users_selected_day"
              onChange={handleFormChange}
            >
              <option value="">Select a day</option>
              {days.map((day, index) => (
                <option key={index} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <p>Select a Month</p>
            <select
              className={styles.field}
              name="month_name"
              value={formState.month_name}
              aria-label="users_selected_month"
              onChange={handleFormChange}
            >
              <option value="">Select a month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <div className={styles.action_container}>
              <button>Use Default Image</button>
              <button>Upload Image</button>
            </div>
            {/*<p>Next Template</p>*/}
          </section>
        </article>
      </section>
    </>
  );
}
