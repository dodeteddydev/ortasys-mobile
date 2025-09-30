import { BookingDetailResponse } from "../types/BookingDetailResponse";

export const htmlPDFFormat = (data: BookingDetailResponse): string => {
  return `
      <html>
  <head>
    <style>
      body {
        font-family: Helvetica, Arial, sans-serif;
      }
    </style>
  </head>
  <body>
    <!-- HEADER -->
    <header style="display: flex; justify-content: space-between">
      <!-- GUEST INFORMATION -->
      <div>
        <h3 style="margin: 0">Guest Information</h3>
        <!-- NAME -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">Name</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0">First Name</h5>
        </div>
        <!-- PHONE -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">Phone</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0">First Name</h5>
        </div>
        <!-- EMAIL -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">Email</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0">First Name</h5>
        </div>
        <!-- ADULT -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">Adult</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0">First Name</h5>
        </div>
        <!-- CHILD -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">Child</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0">First Name</h5>
        </div>
        <!-- CHECK IN -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">Check In</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0">First Name</h5>
        </div>
        <!-- CHECK OUT -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">Check Out</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0">First Name</h5>
        </div>
      </div>

      <!-- INVOICE -->
      <div>
        <h3>Invoice</h3>
        <!-- ID BOOKING -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">ID Booking</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0">First Name</h5>
        </div>
        <!-- AGENT NAME -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">Agent Name</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0">First Name</h5>
        </div>
        <!-- AGENT PHONE -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">Agent Phone</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0">First Name</h5>
        </div>
        <!-- BOOKING DATE -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">Booking Date</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0">First Name</h5>
        </div>
        <!-- STATUS -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">Status</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0; background-color: red">First Name</h5>
        </div>
      </div>
    </header>

    <!-- BODY -->
    <section></section>

    <hr />

    <!-- FOOTER -->
    <footer style="display: flex; justify-content: space-between">
      <!-- THANK YOU -->
      <div>
        <p style="margin: 0">Thank you for your business</p>
        <a
          href="https://www.ortasys.com/en"
          target="_blank"
          style="font-style: italic"
          >www.ortasys.com</a
        >
      </div>

      <!-- LOGO -->
      <img
        src="https://dummyimage.com/600x400/000/fff"
        height="50"
        width="50"
      />
    </footer>
  </body>
</html>
    `;
};
