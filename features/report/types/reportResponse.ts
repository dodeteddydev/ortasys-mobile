export type ReportResponse = {
  id: number;
  guestFirstName: string;
  guestLastName: string;
  hotelName: string;
  agentName: string;
  agentEmail: string;
  bookingDate: string;
  checkIn: string;
  checkOut: string;
  night: number;
  totalRevenue: number;
  amount: number;
  status: number;
  systemFee: number;
  affiliatorIncentive: number;
};
