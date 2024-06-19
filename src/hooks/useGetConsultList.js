import { useState } from "react";
import { useQuery } from "react-query";
import { fetchUserConsult } from "../api/consult/fetchConsult";
import { fetchMentorCalendar } from "../api/calendar";
import { transformConsultData } from "../utils/TransformConsultData";

export const useGetConsultList = (target) => {
  const [menteeEvent, setMenteeEvent] = useState({
    upcomingConsult: [],
    lastUpcomingConsult: [],
  });
  const [mentorEvent, setMentorEvent] = useState({
    upcomingConsult: [],
    lastUpcomingConsult: [],
  });
  const { isLoading, refetch } = useQuery(
    [target],
    () =>
      target === null ? fetchUserConsult() : fetchMentorCalendar(target.id),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const convertedData = {
          lastUpcomingConsult: transformConsultData(
            data.lastUpcomingConsult,
            target
          ),
          upcomingConsult: transformConsultData(data.upcomingConsult, target),
        };
        if (!!target) {
          fetchUserConsult()
            .then((menteeData) => {
              console.log(menteeData);
              const convertedMenteeData = {
                lastUpcomingConsult: transformConsultData(
                  menteeData.lastUpcomingConsult,
                  null
                ),
                upcomingConsult: transformConsultData(
                  menteeData.upcomingConsult,
                  null
                ),
              };
              setMenteeEvent({ ...convertedMenteeData });
              const existingConsultIds = new Set(
                convertedMenteeData.lastUpcomingConsult.map(
                  (consult) => consult.consultId
                )
              );

              const filteredLastUpcomingConsult =
                convertedData.lastUpcomingConsult.filter(
                  (consult) => !existingConsultIds.has(consult.consultId)
                );

              console.log(
                filteredLastUpcomingConsult,
                convertedMenteeData.lastUpcomingConsult
              );
              return setMentorEvent({
                lastUpcomingConsult: [
                  ...convertedMenteeData.lastUpcomingConsult,
                  ...filteredLastUpcomingConsult,
                ],
                upcomingConsult: [
                  ...convertedMenteeData.upcomingConsult,
                  ...convertedData.upcomingConsult,
                ],
              });
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          console.log(convertedData);
          setMenteeEvent({ ...convertedData });
        }
      },
    }
  );
  return { isLoading, refetch, menteeEvent, mentorEvent };
};
