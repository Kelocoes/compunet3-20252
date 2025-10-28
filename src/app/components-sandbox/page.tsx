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

    const components = [
        { title: "Input", component: <CustomInput placeholder="Enter text" /> },
        { title: "Button", component: <CustomButton /> },
        { title: "Slider", component: <CustomSlider /> },
        { title: "Checkbox", component: <CheckBox label="Accept Terms" /> },
        { title: "Tooltip", component: <Tooltip text="This is a tooltip"><CustomButton title="Hover me" /></Tooltip> },
        { title: "Badge", component: <CustomBadge badgeContent={3}><CustomButton title="Click me" /></CustomBadge> },
        { title: "Loader", component: <Loader size={10} /> },
        { title: "Chip", component: <Chip label="Example Chip" /> },
        {
            title: "Z-Index", component: <ZIndex>
                <div className="h-10 w-10 bg-red-700 text-white p-4 rounded-full flex items-center justify-center text-sm border-2">01</div>
                <div className="h-10 w-10 bg-red-700 text-white p-4 rounded-full flex items-center justify-center text-sm border-2">02</div>
                <div className="h-10 w-10 bg-red-700 text-white p-4 rounded-full flex items-center justify-center text-sm border-2">03</div>
            </ZIndex>
        },
        { title: "o.o", component: <h1>On your own!</h1> },
    ];
    return (
        <div id="components-sandbox"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 h-fit w-[90vw] overflow-auto text-black">
            {components.map(({ title, component }, index) => (
                <GridCell key={index} title={title} >
                    {component}
                </GridCell>
            ))}
        </div>
    );
}