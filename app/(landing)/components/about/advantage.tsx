import { ElementType, cloneElement } from "react";
import { IconType } from "react-icons/lib";

type AdvantageProps = {
    icon?: any;
    title: string;
    description: string;
};

const Advantage: React.FC<AdvantageProps> = (props) => {
    return (
        <div id="advantage" className="flex flex-col px-4">
            <div id="icon-text" className="flex flex-col">
                {props.icon && cloneElement(props.icon, { className: "w-20 h-20 mb-4 fill-red stroke-red" })}
                <h2 className="plain-bold-font md:max-w-[300px] ">{props.title}</h2>
            </div>
            <p className="plain-font mt-2 md:max-w-[300px] text-justify">{props.description}</p>
        </div>
    );
};

export default Advantage;