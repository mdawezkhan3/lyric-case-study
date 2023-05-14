import Drawer from '@mui/material/Drawer';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { groupArrayByDate, sortArrayByTimestamp } from '../utils/util';
import styles from "../App.module.scss";
import HistoryClockIcon from "../assets/icons/history-clock-icon.svg";
import CloseIcon from "../assets/icons/close-icon.svg"

export const HistoryDrawer = ({ open, toggleHistoryDrawer, history }) => {
  const historyTimelineObj = modifyHistoryArrayAccordingToTimeline();

  function modifyHistoryArrayAccordingToTimeline () {
    const sortedHistoryArrayByTimestamp = sortArrayByTimestamp(history);
    const groupHistoryArrayByDate = groupArrayByDate(sortedHistoryArrayByTimestamp);
    return groupHistoryArrayByDate;
  }

  return (
    <Drawer
    open={open}
    anchor="right"
    onClose={toggleHistoryDrawer}
    >
      <section className={styles.historyDrawer}>
      <header>
        <div style={{display: "flex", alignItems: "center"}}>
          <img src={HistoryClockIcon} width="18px" height="18px" />
          <p style={{marginLeft: 16}}>History</p>
        </div>
        <img onClick={toggleHistoryDrawer} style={{cursor: "pointer"}} src={CloseIcon} width="20px" height="20px" />
      </header>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {Object.keys(historyTimelineObj).map((timelineKey) => (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <h3 className={styles.timelineDate}>{timelineKey}</h3>
              {historyTimelineObj[timelineKey].map((dateObj) => (
                <div className={styles.timelineModfiyLabelContainer}>
                  <p className={styles.timelineModfiyLabel}>{`${dateObj.type} value at row ${dateObj.rowIndex + 1}, column ${dateObj.columnIndex + 1}`}</p>
                  <p className={styles.timelineModfiyLabel} style={{paddingLeft: 100}}>{dateObj.timestamp.split(",")[1]}</p>
                </div>
              ))}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      </section>
    </Drawer>
  );
};
