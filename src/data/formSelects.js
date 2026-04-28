export const shows = [
  {
    id: 1,
    show_name: "Test SHow",
    host_name: "Test Host",
    time: "12.00 ET",
    /* time_range: "" */
    default_featured:
      "https://res.cloudinary.com/dzpne110u/image/upload/v1776127474/fr_image_processor_test/image_testers/featured_tester_smaxfd.png",
    default_archive:
      "https://res.cloudinary.com/dzpne110u/image/upload/v1776127483/fr_image_processor_test/image_testers/archive_tester_r87t4v.png",
    default_facebook:
      "https://res.cloudinary.com/dzpne110u/image/upload/v1776127474/fr_image_processor_test/image_testers/facebook_tester_u8w1a3.png",
    default_bluesky:
      "https://res.cloudinary.com/dzpne110u/image/upload/v1776127479/fr_image_processor_test/image_testers/bluesky_tester_l2amkn.png",
    weekday: "Mon",
    week_of_month: "",
    frequency: "weekly",
    location: "Brooklyn",
  },
  {
    id: 2,
    show_name: "Big Shoulders Soul System",
    host_name: "Rich Marafioti",
    time: "18.00 ET",
    /* time_range: "" */
    default_featured:
      "https://res.cloudinary.com/dzpne110u/image/upload/v1776031932/fr_image_processor_test/big_shoulders_soul_system_defaults/default_featured_iujco0.png",
    default_archive:
      "https://res.cloudinary.com/dzpne110u/image/upload/v1776031931/fr_image_processor_test/big_shoulders_soul_system_defaults/default_archive_vy1aca.png",
    default_facebook:
      "https://res.cloudinary.com/dzpne110u/image/upload/v1776031931/fr_image_processor_test/big_shoulders_soul_system_defaults/default_facebook_vn1dee.png",
    default_bluesky:
      "https://res.cloudinary.com/dzpne110u/image/upload/v1776031931/fr_image_processor_test/big_shoulders_soul_system_defaults/default_bluesky_pkrpwb.png",
    weekday: "Tues",
    week_of_month: "3",
    frequency: "monthly",
    location: "Chicago",
  },
];

export const days = Array.from({ length: 31 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);

export const months = [
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

/*export const months = [
  { abbrev: "Jan", numeric: "01" },
  { abbrev: "Feb", numeric: "02" },
  { abbrev: "Mar", numeric: "03" },
  { abbrev: "Apr", numeric: "04" },
  { abbrev: "May", numeric: "05" },
  { abbrev: "Jun", numeric: "06" },
  { abbrev: "Jul", numeric: "07" },
  { abbrev: "Aug", numeric: "08" },
  { abbrev: "Sep", numeric: "09" },
  { abbrev: "Oct", numeric: "10" },
  { abbrev: "Nov", numeric: "11" },
  { abbrev: "Dec", numeric: "12" },
];*/
