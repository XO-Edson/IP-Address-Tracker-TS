import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type dataProviderProps = {
  children: ReactNode;
};

export type IpData = {
  ip: string;
  location: {
    country: string;
    timezone: string;
    lat?: number;
    lng?: number;
  };
  isp: string;
};

export const DataContext = createContext<IpData | null>(null);

export const DataProvider = ({ children }: dataProviderProps) => {
  const [ipdata, setIpData] = useState<IpData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geo.ipify.org/api/v2/country,city?apiKey=at_wUxloupzjZvJh7GNrX8t6H2pQmPTA&ipAddress=8.8.8.8"
        );

        if (!response.ok) {
          throw new Error("Network response not okay");
        }

        const result = await response.json();
        setIpData(result as IpData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return <DataContext.Provider value={ipdata}>{children}</DataContext.Provider>;
};

/* HOOK */
export const useIpData = (): IpData | null => {
  const ipData = useContext(DataContext);
  return ipData;
};
