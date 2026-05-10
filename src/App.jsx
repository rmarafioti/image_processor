import { useState, useRef, useEffect } from "react";
import { domToPng } from "modern-screenshot";
import useForm from "./hooks/useForm";

import { months } from "./data/formSelects";
import Controls from "./components/Controls";
import FeaturedTemplate from "./templates/FeaturedTemplate";
import ArchiveTemplate from "./templates/ArchiveTemplate";
import FacebookTemplate from "./templates/FacebookTemplate";
import BlueskyTemplate from "./templates/BlueskyTemplate";
import NowPlayingTemplate from "./templates/NowPlayingTemplate";
import ObsTemplate from "./templates/ObsTemplate";

import styles from "./landing_page.module.css";

// Filenaming and download functionality
const getFileName = (templateName, selectedShow, formState) => {
  const year = String(new Date().getFullYear()).slice(-2);
  const showName =
    selectedShow?.show_name?.toLowerCase().replace(/\s+/g, "-") || "show-name";
  const frequency = selectedShow?.frequency;
  const selectedMonth = months.find((m) => m.abbrev === formState.month_name);
  const month_monthly = formState.month_name.toUpperCase() || "XXX";
  const month_weekly = selectedMonth?.numeric || "XX";
  const date_of_show = formState.day || "XX";
  const day_of_show = selectedShow?.weekday || "no weekday found";
  const week_of = selectedShow?.week_of_month || "X";
  const time = selectedShow?.time?.slice(0, 5) || "00.00";

  const fileNamePostsMonthly = `${month_monthly}${year}-${showName}-${templateName}`;
  const fileNamePostsWeekly = `${month_weekly}${date_of_show}${year}-${showName}-${templateName}`;

  const fileNames = {
    featured: {
      monthly: fileNamePostsMonthly,
      weekly: fileNamePostsWeekly,
    },
    archive: { monthly: fileNamePostsMonthly, weekly: fileNamePostsWeekly },
    facebook: {
      monthly: fileNamePostsMonthly,
      weekly: fileNamePostsWeekly,
    },
    bluesky: { monthly: fileNamePostsMonthly, weekly: fileNamePostsWeekly },
    "now-playing": {
      monthly: `${month_monthly}${year}-${time}-${showName}-${templateName}`,
      weekly: `${month_weekly}${date_of_show}${year}-${time}-${showName}-${templateName}`,
    },
    obs: {
      monthly: `${day_of_show}-${week_of}-${time}-${showName}-${templateName}-${year}`,
      weekly: `${day_of_show}-${time}-${showName}-${templateName}-${year}`,
    },
  };

  return fileNames[templateName][frequency];
};

export default function App() {
  /* handle form functionality */
  const {
    formState,
    selectedShow,
    handleFormChange,
    handleFormClear,
    handleClearGuestHost,
    handleUploadImage,
    handleDefaultImage,
    handleClearImage,
    isAddToQueueDisabledPosts,
    isAddToQueueDisabledNowPlaying,
    isAddToQueueDisabledObs,
    isUploadedImage,
  } = useForm();

  /* select queued up templates */
  const [selectedTemplates, setSelectedTemplates] = useState([]);

  const handleTemplateSelect = (templateName) => {
    setSelectedTemplates((prev) =>
      prev.includes(templateName)
        ? prev.filter((t) => t !== templateName)
        : [...prev, templateName],
    );
  };

  /* clear queued templates when form conditions are not met */
  useEffect(() => {
    setSelectedTemplates((prev) =>
      prev.filter((t) => {
        if (t === "now-playing") return !isAddToQueueDisabledNowPlaying;
        if (t === "obs") return !isAddToQueueDisabledObs;
        return !isAddToQueueDisabledPosts; // featured, archive, facebook, bluesky
      }),
    );
  }, [
    isAddToQueueDisabledPosts,
    isAddToQueueDisabledNowPlaying,
    isAddToQueueDisabledObs,
  ]);

  /* download status for download button */
  const [downloadStatus, setDownloadStatus] = useState("idle"); // "idle" | "downloading" | "success" | "error"

  const downloadLabel = {
    idle: "Download Selected",
    downloading: "Downloading...",
    success: "Download Successful! ✓",
    error: "Error Downloading ✗",
  };

  /* refs and config for each template */
  const templateArchiveRef = useRef(null);
  const templateFeaturedRef = useRef(null);
  const templateFacebookRef = useRef(null);
  const templateBlueskyRef = useRef(null);
  const templateNowPlayingRef = useRef(null);
  const templateObsRef = useRef(null);

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
    {
      ref: templateNowPlayingRef,
      width: 1080,
      height: 1920,
      templateName: "now-playing",
    },
    {
      ref: templateObsRef,
      width: 1920,
      height: 1080,
      templateName: "obs",
    },
  ];

  /* capture and download a single template */
  const handleDownload = async (ref, width, height, templateName) => {
    if (!ref.current) return;

    // Clone the node
    const clone = ref.current.cloneNode(true);

    // Remove scaling on the clone only
    clone.style.transform = "none";

    // Ensure correct positioning
    clone.style.position = "fixed";
    clone.style.top = "0";
    clone.style.left = "0";
    clone.style.margin = "0";

    document.body.appendChild(clone);

    const dataUrl = await domToPng(clone, {
      width,
      height,
      scale: 1,
    });

    document.body.removeChild(clone);

    const fileName = getFileName(templateName, selectedShow, formState);

    const link = document.createElement("a");
    link.download = `${fileName}.png`;
    link.href = dataUrl;
    link.click();
  };

  /* download all selected at once */
  const dialogRef = useRef(null);

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
      setSelectedTemplates([]);
      dialogRef.current.showModal();
    } catch (error) {
      setDownloadStatus("error");
      dialogRef.current.showModal();
    }
  };

  return (
    <article className={styles.layout}>
      <section className={styles.center}>
        <h1>image processor</h1>
        <div className={styles.template_section}>
          <FeaturedTemplate
            formState={formState}
            selectedShow={selectedShow}
            handleDownload={handleDownload}
            isAddToQueueDisabledPosts={isAddToQueueDisabledPosts}
            isSelected={selectedTemplates.includes("featured")}
            onSelect={handleTemplateSelect}
            isUploadedImage={isUploadedImage}
            ref={templateFeaturedRef}
          />
          <ArchiveTemplate
            formState={formState}
            selectedShow={selectedShow}
            handleDownload={handleDownload}
            isAddToQueueDisabledPosts={isAddToQueueDisabledPosts}
            isSelected={selectedTemplates.includes("archive")}
            onSelect={handleTemplateSelect}
            isUploadedImage={isUploadedImage}
            ref={templateArchiveRef}
          />
        </div>
        <div className={styles.template_section}>
          <FacebookTemplate
            formState={formState}
            selectedShow={selectedShow}
            handleDownload={handleDownload}
            isAddToQueueDisabledPosts={isAddToQueueDisabledPosts}
            isSelected={selectedTemplates.includes("facebook")}
            onSelect={handleTemplateSelect}
            isUploadedImage={isUploadedImage}
            ref={templateFacebookRef}
          />
          <BlueskyTemplate
            formState={formState}
            selectedShow={selectedShow}
            handleDownload={handleDownload}
            isAddToQueueDisabledPosts={isAddToQueueDisabledPosts}
            isSelected={selectedTemplates.includes("bluesky")}
            onSelect={handleTemplateSelect}
            isUploadedImage={isUploadedImage}
            ref={templateBlueskyRef}
          />
        </div>
        <div className={styles.template_section}>
          <NowPlayingTemplate
            formState={formState}
            selectedShow={selectedShow}
            handleDownload={handleDownload}
            isAddToQueueDisabledNowPlaying={isAddToQueueDisabledNowPlaying}
            isSelected={selectedTemplates.includes("now-playing")}
            onSelect={handleTemplateSelect}
            isUploadedImage={isUploadedImage}
            ref={templateNowPlayingRef}
          />
          <ObsTemplate
            formState={formState}
            selectedShow={selectedShow}
            handleDownload={handleDownload}
            isAddToQueueDisabledObs={isAddToQueueDisabledObs}
            isSelected={selectedTemplates.includes("obs")}
            onSelect={handleTemplateSelect}
            isUploadedImage={isUploadedImage}
            ref={templateObsRef}
          />
        </div>
      </section>
      <Controls
        formState={formState}
        selectedShow={selectedShow}
        handleFormChange={handleFormChange}
        handleClearGuestHost={handleClearGuestHost}
        handleUploadImage={handleUploadImage}
        handleDefaultImage={handleDefaultImage}
        handleClearImage={handleClearImage}
        selectedTemplates={selectedTemplates}
        downloadStatus={downloadStatus}
        handleDownloadAll={handleDownloadAll}
        isAddToQueueDisabledPosts={isAddToQueueDisabledPosts}
        isAddToQueueDisabledNowPlaying={isAddToQueueDisabledNowPlaying}
        isAddToQueueDisabledObs={isAddToQueueDisabledObs}
        dialogRef={dialogRef}
        handleFormClear={handleFormClear}
      />
      <dialog ref={dialogRef}>
        {downloadStatus === "success" ? (
          <p>Download Successful!</p>
        ) : (
          <p>Error Downloading</p>
        )}
        <div className={styles.dialog_button_container}>
          <button onClick={() => dialogRef.current.close()}>
            Continue Editing
          </button>
          <button
            onClick={() => {
              dialogRef.current.close();
              handleFormClear();
            }}
          >
            Edit a New Show
          </button>
        </div>
      </dialog>
    </article>
  );
}
