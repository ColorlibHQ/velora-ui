import props from "./component-props.json";

export interface PropDoc {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description?: string;
}

export interface ComponentPropsDoc {
  components: {
    name: string;
    description?: string;
    extends: string[];
    props: PropDoc[];
  }[];
  types: { name: string; source: string }[];
}

/** Props tables extracted by scripts/build-docs.mjs. Server-only — large. */
export const componentProps = props as Record<string, ComponentPropsDoc>;
