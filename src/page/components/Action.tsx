import { SVGIcon, SVGIconNames } from "../../components/SVGIcon/SVGIcon";

export type Props = {
    name: SVGIconNames;
    title: string;
    onAction: () => void;
};
export const Action = ({ name, title, onAction }: Props) => {
    return (
        <div className="flex flex-col items-center">
            <button
                className="w-fit p-[1.5rem] rounded-[15px] text-[#fff]"
                style={{
                    background:
                        "linear-gradient(209deg, rgb(37, 5, 202), rgb(120, 77, 229))",
                }}
                onClick={onAction}
            >
                <SVGIcon name={name} />
            </button>

            <p className="text-[14px] text-[#fff] mt-[5px]">{title}</p>
        </div>
    );
};
