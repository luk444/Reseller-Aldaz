/**
 * Catálogo de servicios digitales — precios base en USD.
 * `popular` muestra badge opcional en la UI.
 */
export type Service = {
  price: number;
  name: string;
  popular?: boolean;
};

export const services: Service[] = [
  {
    price: 20.0,
    name: "Aldaz Premium Bypass T2 Hello Screen Untethered",
    popular: true,
  },
  { price: 3.5, name: "Aldaz Premium Bypass A5 Hello Screen Untethered" },
  {
    price: 7.5,
    name: "Aldaz Premium Bypass A12+ | All Model - iPhone/iPad",
  },
  {
    price: 10.0,
    name: "Aldaz Bypass Open Menu A12+ | All Model - iPhone/iPad",
  },
  { price: 6.0, name: "iAldaz A6 RAMDISK" },
  { price: 12.0, name: "FMI OFF OPEN MENU" },
  {
    price: 8.0,
    name: "Aldaz Premium MDM Bypass - All Model - iPhone | iPad",
  },
  {
    price: 30.0,
    name: "iAldazActivator IPhone X [IOS 15/16 With Signal]",
    popular: true,
  },
  {
    price: 23.0,
    name: "iAldazActivator iPhone 8/8Plus [IOS 15/16 With Signal]",
  },
  {
    price: 23.0,
    name: "iAldazActivator iPhone 7/7+ [IOS 15 With Signal]",
  },
  {
    price: 14.0,
    name: "iAldazActivator iPhone 6S/6S+/SE1 [IOS 15/16 With Signal]",
  },
  {
    price: 25.0,
    name: "Aldaz T2 MDM [PERMANENT REMOVAL]",
    popular: true,
  },
];
