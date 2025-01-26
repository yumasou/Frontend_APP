import React, { useEffect, useState } from "react";
import { MdNotificationsActive } from "react-icons/md";
import { useApp } from "../ThemedApp";
function SnapBar() {
  const { globalmsg } = useApp();
  const [showsnap, setShowSnap] = useState(false);
  useEffect(() => {
    setShowSnap(true);
    setTimeout(() => setShowSnap(false), 6000);
  }, [globalmsg]);
  return (
    showsnap && (
      <div className="fixed bottom-20 right-9">
        {globalmsg.massage && (
          <div className="flex gap-2 items-center ">
            <MdNotificationsActive className="fill-yellow-500  " size={50} />
            <p className="text-red-500  font-bold text-xl">{`${globalmsg.massage} !`}</p>
          </div>
        )}
      </div>
    )
  );
}

export default SnapBar;
