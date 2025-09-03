import z from "zod";

const activitySchema = z.object({
  day: z.number(),
  date: z.string(),
  priceAdult: z.number(),
  priceChild: z.number(),
  packageCategoryId: z.number(),
  packageElementId: z.number(),
  location: z.string(),
  rate: z.number(),
  totalItem: z.number().nullable(),
  pricePerItem: z.number(),
  isPricePerItem: z.boolean(),
  description: z.string(),
  base: z.number(),
  markup: z.number(),
  markupAgent: z.number(),
  adult: z.number(),
  child: z.number(),
});

const hotelRoomSchema = z.object({
  day: z.number(),
  date: z.string(),
  hotelId: z.number(),
  hotelRoomId: z.number(),
  contractRateId: z.number(),
  hotelRoomConfigurationId: z.string(),
  rate: z.number(),
  isCheckout: z.boolean(),
  base: z.number(),
  markupAgent: z.number(),
  markupHotel: z.number(),
  checkIn: z.boolean(),
  activities: z.array(activitySchema),
});

type HotelRoom = z.infer<typeof hotelRoomSchema>;

export type HotelRoomSchema = Partial<HotelRoom>;
