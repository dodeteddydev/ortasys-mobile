import { HotelRoomSchema } from "../schemas/hotelRoomSchema";
import { SearchSchema } from "../schemas/searchShema";
import { ContractResponse } from "./contractResponse";
import { HotelSimpleResponse } from "./hotelSimpleResponse";
import { RoomSimpleResponse } from "./roomSimpleResponse";

export type ResponseCustomized = {
  hotel: HotelSimpleResponse;
  room: RoomSimpleResponse;
  contract: ContractResponse;
};

export type HotelRoomCustomized = {
  payload: HotelRoomSchema;
  response: ResponseCustomized | null;
};

export type Customized = {
  search?: SearchSchema;
  hotelRoomCustomized?: HotelRoomCustomized[];
};
