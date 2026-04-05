export const shows = [
  {
    id: 1,
    show_name: "Seinfeld",
    host_name: "Jerry Seinfeld",
    time: "12.00 ET",
    default_image:
      "https://res.cloudinary.com/dzpne110u/image/upload/v1774145188/fr_image_processor_test/seinfled_archive_default_lkc2lz.jpg",
    day: "MON",
    frequency: "weekly",
    location: "New York",
  },
  {
    id: 2,
    show_name: "Big Shoulders Soul System",
    host_name: "Rich Marafioti",
    time: "18.00 ET",
    default_image:
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
