import { useState, useRef } from "react";
import { shows } from "./data/formSelects";
import { domToPng } from "modern-screenshot";

import Controls from "./components/Controls";
import FeaturedTemplate from "./components/FeaturedTemplate";
import ArchiveTemplate from "./components/ArchiveTemplate";
import FacebookTemplate from "./components/FacebookTemplate";
import BlueskyTemplate from "./components/BlueskyTemplate";

import styles from "./landing_page.module.css";

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

  const templateArchiveRef = useRef(null);
  const templateFeaturedRef = useRef(null);

  const handleDownload = async (ref, width, height, templateName) => {
    if (!ref.current) return;

    // Temporarily remove the transform so it captures at full image
    ref.current.style.transform = "none";

    const dataUrl = await domToPng(ref.current, {
      width,
      height,
      scale: 1,
    });

    // Restore the transform
    ref.current.style.transform = "scale(0.3)";

    const year = String(new Date().getFullYear()).slice(-2);
    const month = formState.month_name?.toUpperCase() || "XXX";
    const showName =
      selectedShow?.show_name?.toLowerCase().replace(/\s+/g, "-") || "show-art";

    const fileName = `${month}${year}-${showName}-${templateName}`;

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
    /*above comment is false we actually need the day now playing templat even if weekly
    remove the statemeng below*/
    (selectedShow?.frequency === "weekly" && !formState.day);

  return (
    <>
      <section className={styles.center}>
        <h1>image processor</h1>
        <Controls
          formState={formState}
          handleFormChange={handleFormChange}
          handleClearGuestHost={handleClearGuestHost}
          handleDefaultImage={handleDefaultImage}
          handleClearImage={handleClearImage}
        />
        <div className={styles.template_section}>
          <FeaturedTemplate
            formState={formState}
            selectedShow={selectedShow}
            handleDownload={handleDownload}
            isAddToQueueDisabled={isAddToQueueDisabled}
            ref={templateFeaturedRef}
          />
          <ArchiveTemplate
            formState={formState}
            selectedShow={selectedShow}
            handleDownload={handleDownload}
            isAddToQueueDisabled={isAddToQueueDisabled}
            ref={templateArchiveRef}
          />
        </div>
        <div className={styles.template_section}>
          <FacebookTemplate
            formState={formState}
            selectedShow={selectedShow}
            handleDownload={handleDownload}
            isAddToQueueDisabled={isAddToQueueDisabled}
            ref={templateArchiveRef}
          />
          <BlueskyTemplate
            formState={formState}
            selectedShow={selectedShow}
            handleDownload={handleDownload}
            isAddToQueueDisabled={isAddToQueueDisabled}
            ref={templateArchiveRef}
          />
        </div>
      </section>
    </>
  );
}
