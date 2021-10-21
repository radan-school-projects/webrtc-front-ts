/// <reference types="react-scripts" />

// declare module "*.svg" {
//   import { ReactElement, SVGProps } from "react";

//   const content: (props: SVGProps<SVGElement>) => ReactElement;
//   export default content;
// }

// declare module "*.svg" {
//   import React = require("react");

//   export const SVGComponent: React.FC<React.SVGProps<SVGSVGElement>>;
//   const src: string;
//   export default src;
// }

declare module "*.svg" {
  import React from "react";

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement> & { title?: string }>;
  const src: string;
  export default src;
}
