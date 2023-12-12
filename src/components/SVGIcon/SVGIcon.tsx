import React from 'react';

import * as Svgs from '../../assets/images/svg';

export type SVGIconNames = keyof typeof Svgs;

export type Props = {
  name: SVGIconNames;
} & React.SVGProps<SVGSVGElement>;

export const SVGIcon: React.FC<Props> = ({ name, width = '16', height = '16', ...rest }) => {
  // eslint-disable-next-line
  const Icon = Svgs[name];

  const style: { width?: number | string; height?: number | string } = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return Icon ? <Icon {...style} {...rest} /> : null;
};
