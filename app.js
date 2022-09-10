const moment = require("moment");
const getBooking = require("./getBooking.js");
const createPass = require("./createPass.js");

async function boardingPass() {
  const getBookingPayload = {
    bookingconfirmation: "288EB545",
    passengerlastname: "Hopkins",
  };

  const bookingData = await getBooking(getBookingPayload); // Fetch getBooking

  // Check response
  if (bookingData.success || bookingData.aerocrs.success) {
    const { fromcode, tocode, depart, arrive, flightdate, number } = bookingData.aerocrs.booking.flights.flight[0];
    const { paxtitle, lastname } = bookingData.aerocrs.booking.passengers.passenger[0];

    // Create new date and format
    const flightDepart = moment(new Date(`${flightdate} ${depart}`)).format();
    const flightArrive = moment(new Date(`${flightdate} ${arrive}`)).format();

    const createPassPayload = {
      fields: [
        { key: "from", value: fromcode },
        { key: "to", value: tocode },
        { key: "departure", value: flightDepart },
        { key: "flight", value: number },
        { key: "arrival", value: flightArrive },
        { key: "seat", value: "" },
        { key: "boardingTime", value: "" },
        { key: "gate", value: "" },
        { key: "passenger", value: paxtitle + lastname },
      ],
    };

    const res = await createPass(createPassPayload); // Fetch createPass
    console.log(res); // Log response

  } else {
    console.log("unsuccessful response:", bookingData);
  }
}

boardingPass();
