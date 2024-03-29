// import SingleProductModal from "./Modal/SingleProductModal";
// import PriceRangeSlider from "./PriceRangeSlider";
// import Drawer from "./Drawer/VanillaDrawer";
// import DrawerWithHeadless from "./Drawer/DrawerWithHeadless";
// import Reviews from "./Reviews";
// import Tabs from "./Tabs";
// import Timeline from "./Timeline";
// import MyDisclosure from "./MyDisclosure";
// import PlaceHolderCard from "./PlaceHolderCard";

import SorterBox from "./SorterBox";

export default function ExperimentPage() {
  return (
    <div className="__container flex items-center justify-center min-h-screen bg-teal-400/50">
      {/* <PriceRangeSlider /> */}
      {/* <SingleProductModal /> */}
      {/* <Drawer>Shopping Cart</Drawer> */}
      {/* <DrawerWithHeadless title="Shopping Cart">
        <div
          className="h-full border-2 border-dashed border-gray-200"
          aria-hidden="true"
        />
      </DrawerWithHeadless> */}
      {/* <Reviews />
        <Tabs /> */}
      {/* <Timeline /> */}
      {/* <MyDisclosure /> */}
      {/* <PlaceHolderCard /> */}
      <SorterBox />
    </div>
  );
}
