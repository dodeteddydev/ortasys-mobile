import { TextInputField } from "@/components/TextInputField";
import { View } from "react-native";
import { useCustomizedContext } from "../context/CustomizedProvider";
import DropdownProductCategory from "@/features/product-category/components/DropdownProductCategory";

const AddServiceBottomScheetContent = () => {
  const { customized } = useCustomizedContext();

  return (
    <View>
      <DropdownProductCategory onChange={(value) => console.log(value)} />
      <TextInputField
        placeholder={`Search products in ${customized?.search?.stateName}, ${customized?.search?.countryName}`}
      />
    </View>
  );
};

export default AddServiceBottomScheetContent;
