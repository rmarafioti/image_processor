import { useState, useRef, useEffect } from "react";
import { domToPng } from "modern-screenshot";
import useForm from "./hooks/useForm";

import Controls from "./components/Controls";
import FeaturedTemplate from "./templates/FeaturedTemplate";
import ArchiveTemplate from "./templates/ArchiveTemplate";
import FacebookTemplate from "./templates/FacebookTemplate";
import BlueskyTemplate from "./templates/BlueskyTemplate";

import styles from "./landing_page.module.css";

export default function App() {
  const {
    formState,
    selectedShow,
    handleFormChange,
    handleClearGuestHost,
    handleDefaultImage,
    handleClearImage,
  } = useForm();

  /* download functionality */

  const templateArchiveRef = useRef(null);
  const templateFeaturedRef = useRef(null);
  const templateFacebookRef = useRef(null);
  const templateBlueskyRef = useRef(null);

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

  const [downloadStatus, setDownloadStatus] = useState("idle"); // "idle" | "downloading" | "success" | "error"

  const downloadLabel = {
    idle: "Download Selected",
    downloading: "Downloading...",
    success: "Download Successful! ✓",
    error: "Error Downloading ✗",
  };

  const handleDownloadAll = async () => {
    const toDownload = templates.filter((t) =>
      selectedTemplates.includes(t.templateName),
    );

    setDownloadStatus("downloading");

    try {
      for (const template of toDownload) {
        await handleDownload(
          template.ref,
          template.width,
          template.height,
          template.templateName,
        );
      }
      setDownloadStatus("success");
    } catch (error) {
      setDownloadStatus("error");
    }
  };

  const isAddToQueueDisabled =
    !formState.show ||
    !formState.default_image ||
    !formState.month_name ||
    /* we need separtate conditions for each tempalate to add to the queue
 - if weekly, the first 4 templates need a name, day and month
 - if monthly the first 4 templates need a name and month only
 - both weekly and monthly need a name day and month for the 5th template
 - both weekly and monthly need a name, location and full show timespan for the 6th template */
    (selectedShow?.frequency === "weekly" && !formState.day);

  useEffect(() => {
    if (isAddToQueueDisabled) {
      setSelectedTemplates([]);
    }
  }, [isAddToQueueDisabled]);

  return (
    <>
      <section className={styles.center}>
        <h1>image processor</h1>
        <Controls
          formState={formState}
          selectedShow={selectedShow}
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
          disabled={
            isAddToQueueDisabled ||
            selectedTemplates.length === 0 ||
            downloadStatus === "downloading"
          }
        >
          {downloadLabel[downloadStatus]}
        </button>
      </section>
    </>
  );
}
