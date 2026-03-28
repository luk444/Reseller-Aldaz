/**
 * Digital services catalog — base prices in USD.
 * `popular` shows optional badge.
 * `downloadId` matches `data/downloads.ts` id for scroll-to-download; omit to scroll only to the downloads section.
 */
export type Service = {
  price: number;
  name: string;
  popular?: boolean;
  downloadId?: string;
};

export const services: Service[] = [
  {
    price: 20.0,
    name: "Aldaz Premium Bypass T2 Hello Screen Untethered",
    popular: true,
    downloadId: "t2r-activator",
  },
  {
    price: 3.5,
    name: "Aldaz Premium Bypass A5 Hello Screen Untethered",
    downloadId: "ia5-mac",
  },
  {
    price: 7.5,
    name: "Aldaz Premium Bypass A12+ | All Model - iPhone/iPad",
    downloadId: "a12-macos",
  },
  {
    price: 10.0,
    name: "Aldaz Bypass Open Menu A12+ | All Model - iPhone/iPad",
    downloadId: "a12-om",
  },
  { price: 6.0, name: "iAldaz A6 RAMDISK", downloadId: "ia6-ramdisk" },
  { price: 12.0, name: "FMI OFF OPEN MENU" },
  {
    price: 8.0,
    name: "Aldaz Premium MDM Bypass - All Model - iPhone | iPad",
    downloadId: "mdm-win",
  },
  {
    price: 30.0,
    name: "iAldazActivator IPhone X [IOS 15/16 With Signal]",
    popular: true,
    downloadId: "checkm8-mac",
  },
  {
    price: 23.0,
    name: "iAldazActivator iPhone 8/8Plus [IOS 15/16 With Signal]",
    downloadId: "checkm8-mac",
  },
  {
    price: 23.0,
    name: "iAldazActivator iPhone 7/7+ [IOS 15 With Signal]",
    downloadId: "checkm8-mac",
  },
  {
    price: 14.0,
    name: "iAldazActivator iPhone 6S/6S+/SE1 [IOS 15/16 With Signal]",
    downloadId: "checkm8-mac",
  },
  {
    price: 25.0,
    name: "Aldaz T2 MDM [PERMANENT REMOVAL]",
    popular: true,
    downloadId: "t2-removal",
  },
];
