import Swal from "sweetalert2";

interface IncomingCallParams {
  partner: string;
  onAccept: () => void;
  onDeny: () => void;
}

const swalBootstrapBtn = Swal.mixin({
  buttonsStyling: false,
  width: "20rem",
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
    // text: "Incoming call...",
    html: "<p class='text-purple-500 text-base font-light'>Incoming Call<p>",
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: "accept",
    cancelButtonText: "deny",
    reverseButtons: true,
    allowOutsideClick,
    imageUrl: "/images/call/waving-hand.gif",
    customClass: {
      popup: "rounded-lg",
      image: "w-24 h-24 mt-3 mb-0",
      title: "font-semibold text-2xl text-purple-500 mt-0 mb-0",
      htmlContainer: "pt-0",
      // actions: "mt-0",
      cancelButton: "w-32 h-14 rounded-lg bg-yellow-500 text-white focus:outline-none mr-3",
      confirmButton: "w-32 h-14 rounded-lg bg-purple-500 text-white focus:outline-none ml-3",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      onAccept();
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
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
  swalBootstrapBtn.fire({
    title: partner,
    html: "<p class='text-purple-500 text-base font-light'>calling<p>",
    showConfirmButton: false,
    showCancelButton: true,
    cancelButtonText: "Cancel Call",
    reverseButtons: false,
    allowOutsideClick,
    imageUrl: "/images/call/call-me-hand.gif",
    customClass: {
      popup: "rounded-lg",
      image: "w-24 h-24 mt-3 mb-0",
      title: "font-semibold text-2xl text-purple-500 mt-0 mb-0",
      htmlContainer: "pt-0",
      // actions: "mt-0",
      cancelButton: "w-72 h-14 rounded-lg bg-yellow-500 text-white focus:outline-none",
    },
  }).then((result) => {
    if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      onCancel();
    }
  });
};

export default { swalBootstrapBtn, incomingCall, dialingCall };
