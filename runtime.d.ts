/* eslint @typescript-eslint/no-explicit-any: off */

interface Opal {
  [key: string]: OpalObjectClass;
  nil: any;
  Object: OpalObjectClass;
}

declare class OpalObjectClass {
  public $new(...args: any[]): any;
  [key: string]: any;
}

declare const opal: Opal;
export default opal;
