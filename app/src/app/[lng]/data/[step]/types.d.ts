type SubSector = {
  id: number | string;
  title: string;
  scopes: number[];
  isAdded: boolean;
  sectorName: string;
};

type DataSource = {
  id: number | string;
  icon: any;
  title: string;
  dataQuality: "low" | "medium" | "high";
  scopes: number[];
  description: string;
  url: string;
  isConnected: boolean;
  updateFrequency: string;
  sources: string[];
  methodology: string;
};
