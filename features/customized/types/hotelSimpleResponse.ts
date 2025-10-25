export type HotelSimpleResponse = {
  affiliateId: number;
  hotelId: number;
  hotelCode: string;
  hotelName: string;
  propertyType: {
    id: number;
    propertyType: string;
  };
  logoPath: string;
  active: boolean;
  star: number;
  countryName: string;
  stateName: string;
  city: string;
  childAgeMin: number;
  childAgeMax: number;
  highlight: string;
};
