export type ContractResponse = {
  hotelRoomConfigurationId: string;
  contractRateId: number;
  contractDescription: string;
  rate: number;
  minimumStay: number;
  policies: {
    benefit: string;
    cancel: string;
    deposit: string;
    other: string;
  };
  markupAgent: number;
  markupHotel: number;
  base: number;
  markets: {
    id: number;
    code: string;
    marketName: string;
  }[];
};
