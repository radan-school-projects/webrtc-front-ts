/* eslint-disable import/prefer-default-export */
// export const rtcConfig = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

export const rtcConfig = {
  iceServers: [
    {
      urls: "stun:stun.stunprotocol.org",
    },
    {
      urls: "turn:numb.viagenie.ca",
      credential: "muazkh",
      username: "webrtc@live.com",
    },
  ],
};
