export type BookingListQueryParams = {
  search?: string;
  destination?: string;
  city?: string;
  state?: string;
  country?: string;
  checkIn?: string;
  checkOut?: string;
  minPrice?: number;
  maxPrice?: number;
  stars?: number;
  maxAdult?: number;
  maxChild?: number;
  countryName?: string;
  stateName?: string;
};
