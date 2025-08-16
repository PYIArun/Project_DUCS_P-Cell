import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const { id } = useParams(); // get company id from route
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCompany = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/company/${id}`);
        setCompany(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) getCompany();
  }, [id]);

  return (
    <CompanyContext.Provider value={{ company, setCompany, loading }}>
      {children}
    </CompanyContext.Provider>
  );
};

// custom hook
export const useCompany = () => useContext(CompanyContext);
