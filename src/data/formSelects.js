export const shows = [
  {
    id: 1,
    show_name: "Seinfeld",
    host_name: "Jerry Seinfeld",
    time: "12.00 ET",
    default_featured:
      "https://res.cloudinary.com/dzpne110u/image/upload/v1776031932/fr_image_processor_test/big_shoulders_soul_system_defaults/default_featured_iujco0.png",
    default_archive:
      "https://res.cloudinary.com/dzpne110u/image/upload/v1776031931/fr_image_processor_test/big_shoulders_soul_system_defaults/default_archive_vy1aca.png",
    default_facebook:
      "https://res.cloudinary.com/dzpne110u/image/upload/v1776031931/fr_image_processor_test/big_shoulders_soul_system_defaults/default_facebook_vn1dee.png",
    default_bluesky:
      "https://res.cloudinary.com/dzpne110u/image/upload/v1776031931/fr_image_processor_test/big_shoulders_soul_system_defaults/default_bluesky_pkrpwb.png",
    day: "MON",
    frequency: "weekly",
    location: "New York",
  },
  {
    id: 2,
    show_name: "Big Shoulders Soul System",
    host_name: "Rich Marafioti",
    time: "18.00 ET",
    default_featured:
      "https://res.cloudinary.com/dzpne110u/image/upload/v1774148867/fr_image_processor_test/big_shoulders_121625_ajdr9o.png",
    default_archive:
      "https://res.cloudinary.com/dzpne110u/image/upload/v1774148867/fr_image_processor_test/big_shoulders_121625_ajdr9o.png",
    default_facebook:
      "https://res.cloudinary.com/dzpne110u/image/upload/v1774148867/fr_image_processor_test/big_shoulders_121625_ajdr9o.png",
    default_bluesky:
      "https://res.cloudinary.com/dzpne110u/image/upload/v1774148867/fr_image_processor_test/big_shoulders_121625_ajdr9o.png",
    day: "SAT",
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
