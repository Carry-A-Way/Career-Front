import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";
import { useEffect, useState } from "react";
import { USER_CONSULT_LIST } from "../api/api";

const useGetConsult = () => {
  const [lastUpcomingConsult, setLastUpcomingConsult] = useState([]);
  const [upcomingConsult, setUpcomingConsult] = useState([]);
  const [completedConsult, setCompletedConsult] = useState([]);

  const fetchConsults = async () => {
    try {
      const response = await axios.get(`${SV_LOCAL}/${USER_CONSULT_LIST}`, {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      });
      setLastUpcomingConsult(response.data.object.lastUpcomingConsult);
      setUpcomingConsult(response.data.object.upcomingConsult);
      setCompletedConsult(response.data.object.previousConsult);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchConsults();
  }, []);

  return {
    lastUpcomingConsult,
    upcomingConsult,
    completedConsult,
    fetchConsults,
  };
};

export default useGetConsult;
