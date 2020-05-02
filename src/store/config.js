import { configureStore } from "@reduxjs/toolkit";
import reducer from "./cars";

export default function configureAppStore() {
  return configureStore({ reducer });
}
