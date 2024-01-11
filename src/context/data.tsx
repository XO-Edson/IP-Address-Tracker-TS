import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type dataProviderProps = {
  children: ReactNode;
};

type DataContextTypes = {
  ipData: IpData | null;
  ipAddress: string | undefined;
  ipAddressStatic: string | undefined;
  IPAddressFn: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchBtn: (ipAddress: string) => void;
  mapRef: any;
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

export const DataContext = createContext<DataContextTypes>({
  ipData: null,
  ipAddress: undefined,
  ipAddressStatic: undefined,
  IPAddressFn: () => {},
  searchBtn: () => {},
  mapRef: undefined,
});

export const DataProvider = ({ children }: dataProviderProps) => {
  const [ipData, setIpData] = useState<IpData | null>(null);
  const [ipAddress, setIpAddress] = useState<string>("");
  const [ipAddressStatic, setIpAddressStatic] = useState<string>("");

  const IPAddressFn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIpAddress(e.target.value);
  };

  const mapRef = useRef<any>();

  useEffect(() => {
    if (ipData) {
      mapRef.current.setView([ipData.location.lat, ipData.location.lng], 13);
    }
  }, [ipData]);

  const fetchData = async (ipAddress: string) => {
    try {
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_wUxloupzjZvJh7GNrX8t6H2pQmPTA&ipAddress=${ipAddress}`
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

  const searchBtn = async () => {
    console.log("click");

    if (ipAddress) {
      setIpAddressStatic(ipAddress);
      await fetchData(ipAddress);
    }
  };

  return (
    <DataContext.Provider
      value={{
        ipData,
        ipAddress,
        IPAddressFn,
        ipAddressStatic,
        searchBtn,
        mapRef,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

/* HOOK */
export const useIpData = (): DataContextTypes => {
  const { ipData, ipAddress, IPAddressFn, ipAddressStatic, searchBtn, mapRef } =
    useContext(DataContext);

  return { ipData, ipAddress, IPAddressFn, ipAddressStatic, searchBtn, mapRef };
};
