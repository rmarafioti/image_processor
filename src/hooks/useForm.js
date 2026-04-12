import { useState } from "react";
import { shows } from "../data/formSelects";

const useForm = () => {
  const formInitialState = {
    show: "",
    month_name: "",
    day: "",
    guest_host: "",
    show_image: "",
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
      setFormState((prev) => ({ ...prev, show_image: event.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleDefaultImage = () => {
    if (!selectedShow?.default_image) return;
    setFormState((prev) => ({
      ...prev,
      show_image: selectedShow.default_image,
    }));
  };

  const handleClearImage = () => {
    setFormState((prev) => ({ ...prev, show_image: "" }));
  };

  const isAddToQueueDisabled =
    !formState.show ||
    !formState.show_image ||
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
