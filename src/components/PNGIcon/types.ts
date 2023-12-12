import * as PNGIcons from "../../assets/images/png";

export type PNGIconNames = keyof typeof PNGIcons;

export type Props = {
  name: PNGIconNames;
  width?: string | number;
  height?: string | number;
} & React.HTMLAttributes<HTMLImageElement>;
