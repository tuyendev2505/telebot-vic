import React, { CSSProperties } from 'react';

import * as PNGIcons from '../../assets/images/png';

import { Props } from './types';

export const PNGIcon: React.FC<Props> = ({ name, width, height, ...rest }) => {
  // eslint-disable-next-line
  const Icon = PNGIcons[name] || null;
  if (!Icon) return null;

  const style: CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return <img style={style} src={Icon} {...rest} />;
};
