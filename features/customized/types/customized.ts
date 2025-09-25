import { HotelRoomSchema } from "../schemas/hotelRoomSchema";
import { SearchSchema } from "../schemas/searchShema";
import { ContractResponse } from "./contractResponse";
import { HotelSimpleResponse } from "./hotelSimpleResponse";
import { PackageSimpleResponse } from "./packageSimpleResponse";
import { RoomSimpleResponse } from "./roomSimpleResponse";

export type ResponseCustomized = {
  partOfDay?: number;
  hotel?: HotelSimpleResponse;
  room?: RoomSimpleResponse;
  contract?: ContractResponse;
  activities?: PackageSimpleResponse[];
};

export type HotelRoomCustomized = {
  payload: HotelRoomSchema;
  response: ResponseCustomized | null;
};

export type Customized = {
  search?: SearchSchema;
  hotelRoomCustomized?: HotelRoomCustomized[];
};
