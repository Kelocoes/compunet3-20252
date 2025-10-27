import CheckBox from "../_components/CheckBox";
import Chip from "../_components/Chip";
import CustomBadge from "../_components/CustomBadge";
import CustomButton from "../_components/CustomButton";
import CustomInput from "../_components/CustomInput";
import CustomSlider from "../_components/CustomSlider";
import Loader from "../_components/Loader";
import Tooltip from "../_components/Tooltip";
import ZIndex from "../_components/ZIndex";
import GridCell from "./components/GridCell";

export default function ComponentsPage() {
    return (
        <div id="components-sandbox"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 h-fit w-[90vw] overflow-auto text-black">
            <GridCell title="Input">
                <CustomInput placeholder="Enter text" />
            </GridCell>
            <GridCell title="Button">
                <CustomButton />
            </GridCell>
            <GridCell title="Slider">
                <CustomSlider />
            </GridCell>
            <GridCell title="Checkbox">
                <CheckBox label="Accept Terms" />
            </GridCell>
            <GridCell title="Tooltip">
                <Tooltip text="This is a tooltip">
                    <CustomButton title="Hover me" />
                </Tooltip>
            </GridCell>
            <GridCell title="Badge">
                <CustomBadge badgeContent={3}>
                    <CustomButton title="Click me" />
                </CustomBadge>
            </GridCell>
            <GridCell title="Loader">
                <Loader size={10}/>
            </GridCell>
            <GridCell title="Chip">
                <Chip label="Example Chip" />
            </GridCell>
            <GridCell title="Z-Index">
                <ZIndex>
                    <div className="h-10 w-10 bg-red-700 text-white p-4 rounded-full flex items-center justify-center text-sm border-2">01</div>
                    <div className="h-10 w-10 bg-red-700 text-white p-4 rounded-full flex items-center justify-center text-sm border-2">02</div>
                    <div className="h-10 w-10 bg-red-700 text-white p-4 rounded-full flex items-center justify-center text-sm border-2">03</div>
                </ZIndex>
            </GridCell>
            <GridCell title="o.o">
                <h1>On your own!</h1>
            </GridCell>
        </div>
    );
}