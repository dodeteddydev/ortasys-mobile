import { BookingStatusEnum } from "@/enums/bookingStatusEnum";
import { dateFormat } from "@/utilities/dateFormat";
import { addDays } from "date-fns";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import { BookingDetailResponse } from "../types/bookingDetailResponse";

export const bookingHtmlPDFFormat = async (
  data: BookingDetailResponse
): Promise<string> => {
  // Load the image
  const logoAsset = Asset.fromModule(
    require("@/assets/images/vectors/ortasys-logo.png")
  );
  await logoAsset.downloadAsync();

  // Convert to Base64
  const base64 = await FileSystem.readAsStringAsync(logoAsset.localUri!, {
    encoding: "base64",
  });

  // Make the data URL
  const logoBase64 = `data:image/png;base64,${base64}`;

  const dailyRoomTh = ["Date", "Hotel Name", "Room", "Qty", "Benefit"]
    .map(
      (item) => `<th
                style="
                  border: 1px solid;
                  text-align: start;
                  padding: 5px;
                  font-size: 14px;
                  background-color: gainsboro;
                "
              >
                ${item}
              </th>`
    )
    .join("");

  const dailyRoomTd =
    data?.bookingRooms?.length > 0
      ? data?.bookingRooms
          ?.map(
            (item, index) => `
            <tr>
              <td
                style="
                  border: 1px solid;
                  text-align: start;
                  padding: 5px;
                  font-size: 14px;
                "
              >
                ${dateFormat(
                  addDays(new Date(data?.checkIn), index).toISOString(),
                  "day-long"
                )}
              </td>
              <td
                style="
                  border: 1px solid;
                  text-align: start;
                  padding: 5px;
                  font-size: 14px;
                "
              >
                ${item?.room?.hotelName}
              </td>
              <td
                style="
                  border: 1px solid;
                  text-align: start;
                  padding: 5px;
                  font-size: 14px;
                "
              >
                ${item?.room?.roomTypeDescription}
              </td>
              <td
                style="
                  border: 1px solid;
                  text-align: start;
                  padding: 5px;
                  font-size: 14px;
                "
              >
                ${item?.totalRoom}
              </td>
              <td
                style="
                  border: 1px solid;
                  text-align: start;
                  padding: 5px;
                  font-size: 14px;
                "
              >
                ${item?.room?.benefit}
              </td>
            </tr>
            `
          )
          .join("")
      : "<td colspan='5' style='border: 1px solid; padding: 1rem; text-align: center'>No Room</td>";

  const activityTh = ["Day", "Date", "Activity", "Location", "Description"]
    .map(
      (item) => `<th
                style="
                  border: 1px solid;
                  text-align: start;
                  padding: 5px;
                  font-size: 14px;
                  background-color: gainsboro;
                "
              >
                ${item}
              </th>`
    )
    .join("");

  const activityTd =
    "<td colspan='5' style='border: 1px solid; padding: 1rem; text-align: center'>No Activity</td>";
  // <td
  //   style="
  //     border: 1px solid;
  //     text-align: start;
  //     padding: 5px;
  //     font-size: 14px;
  //   "
  // >
  //   1
  // </td>
  // <td
  //   style="
  //     border: 1px solid;
  //     text-align: start;
  //     padding: 5px;
  //     font-size: 14px;
  //   "
  // >
  //   28 September 2025
  // </td>
  // <td
  //   style="
  //     border: 1px solid;
  //     text-align: start;
  //     padding: 5px;
  //     font-size: 14px;
  //   "
  // >
  //   Jet Sky 30 Minutes
  // </td>
  // <td
  //   style="
  //     border: 1px solid;
  //     text-align: start;
  //     padding: 5px;
  //     font-size: 14px;
  //   "
  // >
  //   Benoa
  // </td>
  // <td
  //   style="
  //     border: 1px solid;
  //     text-align: start;
  //     padding: 5px;
  //     font-size: 14px;
  //   "
  // >
  //   Maximal 2 Person
  // </td>

  return `
      <html>
  <head>
    <style>
      body {
        font-family: Helvetica, Arial, sans-serif;
        padding: 0;
        margin: 0;
      }
    </style>
  </head>
  <body>
    <!-- HEADER -->
    <header
      style="display: flex; justify-content: space-between; padding: 3rem"
    >
      <!-- GUEST INFORMATION -->
      <div>
        <h4 style="margin: 0">Guest Information</h4>
        <!-- NAME -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">Name</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0">${data?.guestFirstName}</h5>
        </div>
        <!-- PHONE -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">Phone</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0">${data?.guestPhone}</h5>
        </div>
        <!-- EMAIL -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">Email</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0">${data?.guestEmail}</h5>
        </div>
        <!-- ADULT -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">Adult</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0">${data?.adult}</h5>
        </div>
        <!-- CHILD -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">Child</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0">${data?.child}</h5>
        </div>
        <!-- CHECK IN -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">Check In</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0">${dateFormat(data?.checkIn, "day-long")}</h5>
        </div>
        <!-- CHECK OUT -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">Check Out</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0">${dateFormat(data?.checkOut, "day-long")}</h5>
        </div>
      </div>

      <!-- INVOICE -->
      <div>
        <h4 style="margin: 0">Invoice</h4>
        <!-- ID BOOKING -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">ID Booking</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0">${data?.bookNumber}</h5>
        </div>
        <!-- AGENT NAME -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">Agent Name</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0">${data?.agentName}</h5>
        </div>
        <!-- AGENT PHONE -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">Agent Phone</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0">${data?.agentPhone}</h5>
        </div>
        <!-- BOOKING DATE -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">Booking Date</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0">${
            data?.bookingExpiredAt
              ? dateFormat(data?.bookingExpiredAt, "day-long")
              : "-"
          }</h5>
        </div>
        <!-- STATUS -->
        <div style="margin-top: 10px; display: flex; column-gap: 0.5rem">
          <h5 style="margin: 0">Status</h5>
          <h5 style="margin: 0">:</h5>
          <h5 style="margin: 0; text-transform: capitalize; border-radius: 50px; color: ${
            BookingStatusEnum.Pending === data?.status
              ? "goldenrod"
              : BookingStatusEnum.Booked === data?.status
              ? "blue"
              : BookingStatusEnum.Paid === data?.status
              ? "green"
              : BookingStatusEnum.Canceled === data?.status
              ? "red"
              : BookingStatusEnum.Confirmed === data?.status
              ? "seagreen"
              : BookingStatusEnum.Updated === data?.status
              ? "purple"
              : "gray"
          }">${
    BookingStatusEnum.Pending === data?.status
      ? "pending"
      : BookingStatusEnum.Booked === data?.status
      ? "booked"
      : BookingStatusEnum.Paid === data?.status
      ? "paid"
      : BookingStatusEnum.Canceled === data?.status
      ? "canceled"
      : BookingStatusEnum.Confirmed === data?.status
      ? "confirmed"
      : BookingStatusEnum.Updated === data?.status
      ? "updated"
      : "processing"
  }</h5>
        </div>
      </div>
    </header>

    <!-- BODY -->
    <section style="padding: 3rem; padding-top: 0">
      <div>
        <h4 style="margin: 0; margin-bottom: 0.5rem">Daily Room</h4>

        <table
          style="width: 100%; border-collapse: collapse; border-spacing: 0"
        >
          <thead>
            <tr>
            ${dailyRoomTh}
            </tr>
          </thead>
          <tbody>
            ${dailyRoomTd}
          </tbody>
        </table>
      </div>

      ${
        data?.specialRequest?.trim()
          ? `<div style="margin-bottom: 2rem; margin-top: 2rem">
        <h4 style="margin: 0; margin-bottom: 0.5rem">Special Request</h4>
        
        <p style="margin: 0">${data?.specialRequest}</p>
        </div>`
          : '<div style="margin-bottom: 2rem; margin-top: 2rem"></div>'
      }

      <div>
        <h4 style="margin: 0; margin-bottom: 0.5rem">Activites</h4>

        <table
          style="width: 100%; border-collapse: collapse; border-spacing: 0"
        >
          <thead>
            <tr>
            ${activityTh}
            </tr>
          </thead>
          <tbody>
            <tr>
            ${activityTd}
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <hr />

    <!-- FOOTER -->
    <footer
      style="
        display: flex;
        justify-content: space-between;
        padding: 3rem;
        padding-top: 1rem;
      "
    >
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
        src="${logoBase64}"
        height="50"
        width="50"
      />
    </footer>
  </body>
</html>
    `;
};
