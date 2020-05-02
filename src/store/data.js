//Starter data for application

const storeData = [
  {
    id: 1,
    name: "Hyundai Grand i10",
    imgSrc:
      "https://media.thethao247.vn/upload/2uannh.92/2019/07/21/danh-gia-xe-Huyndai-Grand-i10.jpg",
    vehicleNumber: "RJ14 DB 7898",
    color: "grey",
    carType: "petrol car",
    engine: "1.2 Kappa dual VTVT BS6 Petrol engine",
    description:
      "Hyundai Grand i10 price starts at Rs.6.01 lakh (Ex-Showroom, Delhi) and the top end variant Hyundai Grand i10 Sportz is priced at Rs. 6.36 lakh (Ex-Showroom, Delhi). The Hyundai Grand i10 is exclusively available in petrol-manual guise. It is powered by a 1.2-litre petrol engine, which produces 83PS of power and 113Nm of torque. A CNG variant is also on offer which makes 66PS and 98Nm. The engine is paired with a 5-speed manual transmission. Although the official figures have not yet been revealed, we expect the i10 to offer a fuel economy of around 18.9kmpl similar to its BS4 predecessor.",
    seater: 4,
    rentPerDay: "350",
    available: true,
  },
  {
    id: 2,
    name: "Ford EcoSport",
    imgSrc:
      "https://img.gaadicdn.com/images/carexteriorimages/630x420/Ford/Ford-Ecosport/6414/1550839738093/front-left-side-47.jpg",
    vehicleNumber: "GJ04 SU 2456",
    color: "blue",
    carType: "diesel car",
    engine: "BS6 Compliant 1496 to 1498 cc engine",
    description:
      "Ford EcoSport price starts at ₹ 8.04 Lakh and goes upto ₹ 11.61 Lakh. The price of Petrol version for EcoSport ranges between ₹ 8.04 Lakh - ₹ 11.43 Lakh and the price of Diesel version for EcoSport ranges between ₹ 8.54 Lakh - ₹ 11.61 Lakh. The new Ford EcoSport has been launched with more features over its predecessor. Ford EcoSport is available in six trims – Ambiente, Trend, Titanium, Titanium+, EcoSport S and the Thunder Edition. The newly introduced feature-loaded Thunder Edition is based on the Titanium variant and it replaces the Signature trim. The updated model is available in both petrol and diesel engine options.",
    seater: 5,
    rentPerDay: "1350",
    available: true,
  },
  {
    id: 3,
    name: "Maruti Suzuki XL6",
    imgSrc:
      "https://www.sundayguardianlive.com/wp-content/uploads/2019/08/exterior-1.jpg",
    vehicleNumber: "TN11 CH 8787",
    color: "purple",
    carType: "petrol car",
    engine: "BS6 Compliant 1.5 L 4-cylinder 1462 cc engine",
    description:
      "Maruti Suzuki XL6 price starts at ₹ 9.85 Lakh and goes upto ₹ 11.52 Lakh. The price of Petrol variant for XL6 ranges between ₹ 9.85 Lakh - ₹ 11.52 Lakh. XL6 is available in 4 variants. Out of these 4 variants, 2 are Manual and 2 are Automatic. XL6 is offered in 6 colours: Metallic Premium Silver, Metallic Magma Gray, Prime Auburn Red, Pearl Brave Khaki, Pearl Arctic White and Nexa Blue. However, some of these colours are available in specific versions. XL6 is competing against Maruti Suzuki Ertiga, Mahindra Marazzo, Renault Captur, Maruti Suzuki S-Cross, Mahindra TUV300 PLUS and Kia Seltos.",
    seater: 6,
    rentPerDay: "850",
    available: false,
    currentBooking: {
      name: "john doe",
      mobile: "917898899889",
      issueDate: "3rd May, 2020",
      returnDate: "8th May, 2020",
    },
  },
  {
    id: 4,
    name: "Honda CR-V",
    imgSrc:
      "https://s.aolcdn.com/os/ab/_cms/2020/03/06123654/2020-honda-cr-v-f34-1.jpg",
    vehicleNumber: "KA51 MD 3456",
    color: "rock blue",
    carType: "petrol car",
    engine: "BS6 Compliant 1997 cc engine",
    description:
      "The new CR-V has grown in size, has more space inside, is now available as a diesel model and gets additional two seats good for kids. It has its fair share of negatives like a noisy diesel engine with no pep, a mediocre touch screen system and limited boot space for luggage of five adults. Nonetheless, the CR-V has managed to tick boxes for a family-oriented SUV with good looks, a premium interior and car-like driving manners.",
    seater: 5,
    rentPerDay: "450",
    available: true,
  },
];

export default storeData;
