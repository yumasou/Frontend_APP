import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { MdNotificationsActive } from "react-icons/md";
import { useApp } from "../ThemedApp";
function SnapBar() {
  const { globalmsg } = useApp();
  const [showsnap, setShowSnap] = useState(false);
  const MySwal = withReactContent(Swal);

  const alert = () =>
    MySwal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      text:`${globalmsg.massage}`
    });
  useEffect(() => {
    if(globalmsg.massage) {alert()}
  }, [globalmsg]);
  return (
    <div>
      </div>
  );
}

export default SnapBar;
