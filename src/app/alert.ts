import Swal from "sweetalert2";

interface IncomingCallParams {
  partner: string;
  onAccept: () => void;
  onDeny: () => void;
}

const swalBootstrapBtn = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

const allowOutsideClick = () => {
  const popup = swalBootstrapBtn.getPopup();
  popup!.classList.remove("swal2-show");
  setTimeout(() => {
    popup!.classList.add("animate__animated", "animate__headShake");
  });
  setTimeout(() => {
    popup!.classList.remove("animate__animated", "animate__headShake");
  }, 500);
  return false;
};

const incomingCall = ({
  partner,
  onAccept,
  onDeny,
}: IncomingCallParams) => {
  swalBootstrapBtn.fire({
    title: partner,
    text: "Incoming call...",
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: "accept",
    cancelButtonText: "deny",
    reverseButtons: true,
    allowOutsideClick,
  }).then((result) => {
    if (result.isConfirmed) {
      // if (type === "incoming") {
      //   // acceptCall();
      //   emitter.send(socket, {
      //     type: "call-answer",
      //     content: {
      //       target: callername,
      //       // target: callernameRef.current,
      //     },
      //   });
      //   history.push("/room", { friendname, username });
      // }
      onAccept();
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      // if (type === "dialing") {
      //   // cancelCall();
      //   // setIsCalling(false);
      //   // emitter.send(socket, {
      //   //    "call-cancel" ...
      //   // });
      // }
      // if (type === "incoming") {
      //   // denyCall();
      //   // setIsCalled(false);
      //   // setIsCallAccepted(false);
      // }
      onDeny();
    }
  });
};

interface DialingCallParams {
  partner: string;
  onCancel: () => void;
}
const dialingCall = ({
  partner,
  onCancel,
}: DialingCallParams) => {
  // const swalBootstrapBtn = Swal.mixin({
  //   customClass: {
  //     confirmButton: "btn btn-success",
  //     cancelButton: "btn btn-danger",
  //   },
  //   buttonsStyling: false,
  // });

  swalBootstrapBtn.fire({
    title: partner,
    text: "Dialing...",
    showConfirmButton: false,
    showCancelButton: true,
    cancelButtonText: "cancel",
    reverseButtons: false,
    allowOutsideClick,
  }).then((result) => {
    // if (result.isConfirmed) {
    //   // if (type === "incoming") {
    //   //   // acceptCall();
    //   //   emitter.send(socket, {
    //   //     type: "call-answer",
    //   //     content: {
    //   //       target: callername,
    //   //       // target: callernameRef.current,
    //   //     },
    //   //   });
    //   //   history.push("/room", { friendname, username });
    //   // }
    // } else
    if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      onCancel();
      // if (type === "dialing") {
      //   // cancelCall();
      //   // setIsCalling(false);
      //   // emitter.send(socket, {
      //   //    "call-cancel" ...
      //   // });
      // }
      // if (type === "incoming") {
      //   // denyCall();
      //   // setIsCalled(false);
      //   // setIsCallAccepted(false);
      // }
    }
  });
};

export default { swalBootstrapBtn, incomingCall, dialingCall };
