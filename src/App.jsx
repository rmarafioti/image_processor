import { useState, useRef } from "react";
import { shows } from "./data/formSelects";
import { domToPng } from "modern-screenshot";

import Controls from "./components/Controls";
import FeaturedTemplate from "./templates/FeaturedTemplate";
import ArchiveTemplate from "./templates/ArchiveTemplate";
import FacebookTemplate from "./templates/FacebookTemplate";
import BlueskyTemplate from "./templates/BlueskyTemplate";

import styles from "./landing_page.module.css";

export default function App() {
  /* form functionality */
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

  /* end form functionality */

  /* download functionality */

  const templateArchiveRef = useRef(null);
  const templateFeaturedRef = useRef(null);
  const templateFacebookRef = useRef(null);
  const templateBlueskyRef = useRef(null);

  /* add this is a separte date file and import? */
  const templates = [
    {
      ref: templateArchiveRef,
      width: 1400,
      height: 1400,
      templateName: "archive",
    },
    {
      ref: templateFeaturedRef,
      width: 1400,
      height: 1750,
      templateName: "featured",
    },
    {
      ref: templateFacebookRef,
      width: 1200,
      height: 630,
      templateName: "facebook",
    },
    {
      ref: templateBlueskyRef,
      width: 1200,
      height: 600,
      templateName: "bluesky",
    },
  ];

  const [selectedTemplates, setSelectedTemplates] = useState([]);

  const handleTemplateSelect = (templateName) => {
    setSelectedTemplates((prev) =>
      prev.includes(templateName)
        ? prev.filter((t) => t !== templateName)
        : [...prev, templateName],
    );
  };

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

  const handleDownloadAll = async () => {
    const toDownload = templates.filter((t) =>
      selectedTemplates.includes(t.templateName),
    );
    for (const template of toDownload) {
      await handleDownload(
        template.ref,
        template.width,
        template.height,
        template.templateName,
      );
    }
  };

  /* end download functionality */

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
            isSelected={selectedTemplates.includes("featured")}
            onSelect={handleTemplateSelect}
            ref={templateFeaturedRef}
          />
          <ArchiveTemplate
            formState={formState}
            selectedShow={selectedShow}
            handleDownload={handleDownload}
            isAddToQueueDisabled={isAddToQueueDisabled}
            isSelected={selectedTemplates.includes("archive")}
            onSelect={handleTemplateSelect}
            ref={templateArchiveRef}
          />
        </div>
        <div className={styles.template_section}>
          <FacebookTemplate
            formState={formState}
            selectedShow={selectedShow}
            handleDownload={handleDownload}
            isAddToQueueDisabled={isAddToQueueDisabled}
            isSelected={selectedTemplates.includes("facebook")}
            onSelect={handleTemplateSelect}
            ref={templateFacebookRef}
          />
          <BlueskyTemplate
            formState={formState}
            selectedShow={selectedShow}
            handleDownload={handleDownload}
            isAddToQueueDisabled={isAddToQueueDisabled}
            isSelected={selectedTemplates.includes("bluesky")}
            onSelect={handleTemplateSelect}
            ref={templateBlueskyRef}
          />
        </div>
        <button
          onClick={handleDownloadAll}
          disabled={isAddToQueueDisabled || selectedTemplates.length === 0}
        >
          Download Selected
        </button>
      </section>
    </>
  );
}
