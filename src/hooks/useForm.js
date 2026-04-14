import { useState } from "react";
import { shows } from "../data/formSelects";

const useForm = () => {
  const formInitialState = {
    show: "",
    month_name: "",
    day: "",
    guest_host: "",
    show_images: {
      archive: "",
      featured: "",
      facebook: "",
      bluesky: "",
    },
  };

  const [formState, setFormState] = useState(formInitialState);

  const selectedShow = shows.find((show) => show.id === Number(formState.show));

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

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormState((prev) => ({
        ...prev,
        show_images: {
          archive: event.target.result,
          featured: event.target.result,
          facebook: event.target.result,
          bluesky: event.target.result,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDefaultImage = () => {
    if (!selectedShow) return;
    setFormState((prev) => ({
      ...prev,
      show_images: {
        archive: selectedShow.default_archive || "",
        featured: selectedShow.default_featured || "",
        facebook: selectedShow.default_facebook || "",
        bluesky: selectedShow.default_bluesky || "",
      },
    }));
  };

  const handleClearImage = () => {
    setFormState((prev) => ({
      ...prev,
      show_images: {
        archive: "",
        featured: "",
        facebook: "",
        bluesky: "",
      },
    }));
  };

  const isAddToQueueDisabled =
    !formState.show ||
    // disable if no images have been set across and template
    !Object.values(formState.show_images).some(Boolean) ||
    !formState.month_name ||
    /* we need separtate conditions for each tempalate to add to the queue
 - if weekly, the first 4 templates need a name, day and month
 - if monthly the first 4 templates need a name and month only
 - both weekly and monthly need a name day and month for the 5th template
 - both weekly and monthly need a name, location and full show timespan for the 6th template */
    (selectedShow?.frequency === "weekly" && !formState.day);

  return {
    formState,
    selectedShow,
    handleFormChange,
    handleClearGuestHost,
    handleUploadImage,
    handleDefaultImage,
    handleClearImage,
    isAddToQueueDisabled,
  };
};

export default useForm;
