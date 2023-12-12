import { useNavigate } from "react-router-dom";
import { SVGIcon, SVGIconNames } from "../../components/SVGIcon/SVGIcon";

export type Props = {
    name: SVGIconNames;
    title: string;
};
export const Back = ({ title }: Props) => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-row items-center justify-between">
            <button
                className="w-fit p-[0.8rem] bg-[#ffffff0f] rounded-[40px] text-[#fff]"
                onClick={() => navigate(-1)}
            >
                <SVGIcon name={'back'} />
            </button>
            <h2 className="text-[16px] font-bold text-[#fff] mt-[5px]">{title}</h2>
            <div className="w-[32px]"></div>
        </div>
    );
};
