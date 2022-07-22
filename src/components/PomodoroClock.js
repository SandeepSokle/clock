import { startTransition, useEffect, useState } from "react";
import Countdown from "react-countdown";
import { Timer } from "react-countdown-clock-timer";
import playAlert from "alert-sound-notify";
import "./Pomodoro.css";

export const PomodoroClock = () => {
  const [cycle, setCycle] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const Completionist = () => <span>You are good to go!</span>;
  console.log(parseInt(parseInt(cycle) * 1800));
  useEffect(() => {
    if (isStart) {
      let arr = [25, 30];
      for (let i = 2; i <= cycle; i++) {
        let last = arr[arr.length - 1];
        arr.push(parseInt(last) + 25);
        arr.push(parseInt(last) + 30);
      }
      // console.log(last)
      console.log(arr);
      arr.map(async (ele) => {
        var myTimeList = setTimeout(() => {
          playAlert("purr");
          playAlert.volume(1);
          clearTimeout(myTimeList);
        }, ele * 1000);
      });
    }
  }, [isStart]);

  return (
    <div>
      {isStart ? (
        <div className="timer-container">
          <Timer
            durationInSeconds={parseInt(parseInt(cycle) * 1800)}
            // durationInSeconds={5}
            formatted={true}
            isPaused={false}
            showPauseButton={false}
            showResetButton={true}
            onStart={() => {
              console.log("Triggered when the timer starts");
            }}
            onPause={(remainingDuration) => {
              console.log(
                "Triggered when the timer is paused",
                remainingDuration
              );
            }}
            onFinish={() => {
              //   console.log("Triggered when the timer finishes");
              //   playAlert("purr");
              //   playAlert.volume(1);
              window.location.reload();
            }}
            onReset={(remainingDuration) => {
              setIsStart(false);
              window.location.reload();

            }}
            onResume={(remainingDuration) => {
              console.log(
                "Triggered when the timer is resumed",
                remainingDuration
              );
            }}
          />
        </div>
      ) : (
        ""
      )}
      {isStart ? (
        ""
      ) : (
        <div className="cycle-container">
          <input
            type="number"
            onChange={(ele) => {
              setCycle(ele.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              setIsStart(true);
            }}
          >
            Start
          </button>
        </div>
      )}
    </div>
  );
};
