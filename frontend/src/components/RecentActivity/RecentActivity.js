import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { Timeline } from "antd";

function RecentActivity() {
  const [recentActivities, setRecentActivities] = useOutletContext();

  return (
    <RecentActivityTimeline
      reverse={true}
      items={recentActivities}
    ></RecentActivityTimeline>
  );
}

const RecentActivityTimeline = styled(Timeline)`
  overflow: auto;
  max-height: 20rem;
  padding: 20px 0 0;
`;

export default RecentActivity;
