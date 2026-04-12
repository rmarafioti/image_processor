import { useState } from "react";
import { shows } from "../data/formSelects";

const useForm = () => {
  const formInitialState = {
    show: "",
    month_name: "",
    day: "",
    guest_host: "",
    default_image: "",
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

  return {
    formState,
    selectedShow,
    handleFormChange,
    handleClearGuestHost,
    handleDefaultImage,
    handleClearImage,
  };
};

export default useForm;
