export type PackageSimpleResponse = {
  id: number;
  packageCategory: {
    id: number;
    category: string;
    isPricePerItem: boolean;
  };
  productName: string;
  vendorName: string;
  beginStayDate: string;
  endStayDate: string;
  beginBookingDate: string;
  endBookingDate: string;
  priceAdult: number;
  priceChild: number;
  markup: number;
  location: string;
  pricePerItem: number;
  emailReservation: string;
  isPackageAdmin: boolean;
  agentAffiliateId: number;
  markupAgent: number;
  description: string;
  accountId: number;
  base: number;
  productImage: string;
  markets: {
    id: number;
    code: string;
    marketName: string;
  }[];
};
