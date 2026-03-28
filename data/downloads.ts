/**
 * Enlaces Mediafire — mismos nombres y metadatos que en el panel de Mediafire
 * (referencia: listado `item-name` / detalles de archivo).
 */
export type DownloadItem = {
  id: string;
  /** Nombre exacto como en Mediafire */
  label: string;
  url: string;
  /** Tamaño mostrado en Mediafire (ej. "18 MB") */
  size?: string;
  /** Contador de descargas en Mediafire */
  downloads?: number;
  /** Fecha/hora de subida en Mediafire (texto del panel) */
  uploadedAt?: string;
};

export const downloadItems: DownloadItem[] = [
  {
    id: "a12-macos",
    label: "Aldaz Activator A12+ macOS .pkg",
    url: "https://www.mediafire.com/file/38vtu1r6kntodoq/Aldaz_Activator_A12%252B_macOS_.pkg/file",
    size: "18 MB",
    downloads: 21106,
    uploadedAt: "2026-03-21 20:24:53",
  },
  {
    id: "a12-om",
    label: "AldazA12-OM.pkg",
    url: "https://www.mediafire.com/file/vpoxqtlcatmgosp/AldazA12-OM.pkg/file",
    size: "22 MB",
    downloads: 2402,
    uploadedAt: "2025-12-06 18:41:16",
  },
  {
    id: "a12-windows",
    label: "AldazActivator A12+ Windows.zip",
    url: "https://www.mediafire.com/file/3tzy4d72zkg3z49/AldazActivator_A12%252B_Windows.zip/file",
    size: "82 MB",
    downloads: 16956,
    uploadedAt: "2026-03-11 06:17:42",
  },
  {
    id: "checkm8-mac",
    label: "AldazActivator CHECKM8.pkg",
    url: "https://www.mediafire.com/file/ioufptjgltq9mhv/AldazActivator_CHECKM8.pkg/file",
    size: "20 MB",
    downloads: 2941,
    uploadedAt: "2026-01-11 19:19:00",
  },
  {
    id: "checkm8-win",
    label: "AldazActivator CHECKM8_win.zip",
    url: "https://www.mediafire.com/file/79csssgn4787xco/AldazActivator_CHECKM8_win.zip/file",
    size: "102 MB",
    downloads: 1206,
    uploadedAt: "2026-03-08 19:00:10",
  },
  {
    id: "mac-removal",
    label: "AldazMacRemoval.pkg",
    url: "https://www.mediafire.com/file/w7w31igh28c549d/AldazMacRemoval.pkg/file",
    size: "4 MB",
    downloads: 338,
    uploadedAt: "2026-01-29 12:36:51",
  },
  {
    id: "r-activator",
    label: "AldazRActivator.pkg",
    url: "https://www.mediafire.com/file/iymidg4dwto53ec/AldazRActivator.pkg/file",
    size: "29 MB",
    downloads: 13487,
    uploadedAt: "2026-02-21 23:19:39",
  },
  {
    id: "t2r-activator",
    label: "AldazT2RActivator.pkg",
    url: "https://www.mediafire.com/file/b7uqhju9kvqzkny/AldazT2RActivator.pkg/file",
    size: "25 MB",
    downloads: 2407,
    uploadedAt: "2026-02-21 01:19:14",
  },
  {
    id: "t2-removal",
    label: "AldazT2Removal.pkg",
    url: "https://www.mediafire.com/file/6dzyay1xl22rzbt/AldazT2Removal.pkg/file",
    size: "24 MB",
    downloads: 302,
    uploadedAt: "2026-02-18 07:21:55",
  },
  {
    id: "ia6-ramdisk",
    label: "iAldazA6RamDisk.pkg",
    url: "https://www.mediafire.com/file/6rijhirg1nqdcsh/iAldazA6RamDisk.pkg/file",
    size: "386 MB",
    downloads: 1701,
    uploadedAt: "2025-12-20 12:02:18",
  },
  {
    id: "ia5-mac",
    label: "iAldazActivatorA5.pkg",
    url: "https://www.mediafire.com/file/08yll8uqxpbejaw/iAldazActivatorA5.pkg/file",
    size: "10 MB",
    downloads: 3169,
    uploadedAt: "2026-02-27 09:06:35",
  },
  {
    id: "ia5-win",
    label: "iAldazActivatorA5_winOS.zip",
    url: "https://www.mediafire.com/file/8ips7oe8nnfygbi/iAldazActivatorA5_winOS.zip/file",
    size: "36 MB",
    downloads: 12317,
    uploadedAt: "2026-03-08 19:06:45",
  },
  {
    id: "mdm-win",
    label: "iAldazActivatorMDM_winOS.zip",
    url: "https://www.mediafire.com/file/aei8slxu23oaab2/iAldazActivatorMDM_winOS.zip/file",
    size: "135 MB",
    downloads: 2295,
    uploadedAt: "2026-03-23 21:43:55",
  },
  {
    id: "ram-passcode",
    label: "iAldazActivatorRAM-Passcode.pkg",
    url: "https://www.mediafire.com/file/f47puckt3qf9sro/iAldazActivatorRAM-Passcode.pkg/file",
    size: "9 MB",
    downloads: 126,
    uploadedAt: "2026-03-26 11:11:41",
  },
];
