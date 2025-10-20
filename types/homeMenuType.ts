import { Href } from "expo-router";
import { ReactNode } from "react";

export type HomeMenu = {
  title: string;
  path: Href;
  icon: ReactNode;
};
