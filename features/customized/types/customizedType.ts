import { HotelRoomSchema } from "../schemas/hotelRoomSchema";
import { SearchSchema } from "../schemas/searchShema";

export type CustomizedType = {
  search?: SearchSchema;
  hotelRoom?: HotelRoomSchema[];
};
