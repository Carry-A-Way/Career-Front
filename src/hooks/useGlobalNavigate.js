import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

let globalNavigate = null;

export const useGlobalNavigate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    globalNavigate = navigate;
  }, [navigate]);
  return navigate;
};

export const getGlobalNavigate = () => globalNavigate;
