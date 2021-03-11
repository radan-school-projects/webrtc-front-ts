import React, { useState, useEffect } from "react";
import { Typography, Collapse } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import theme from "../../theme";

type MessageAlertProps = {
  severity: "error" | "info" | "success" | "warning",
  message: string[],
};

const MessageAlert = ({ severity, message }: MessageAlertProps) => {
  // const show: any = () => visible ? "flex" : "none";
  const aintEmpty = (arr: any[]) => arr.length != 0 ? true : false;

  const [visible, setVisible] =
    useState<boolean>(aintEmpty(message));

  const handleVisibility = () => {
    setVisible(false);
  };

  useEffect(() => {
    setVisible(aintEmpty(message));
  }, [message]);

  return (
    <Collapse
      in={visible}
      sx={{
        width: "100%",
      }}
    >
      <Alert
        severity={severity}
        sx={{
          backgroundColor: theme.palette.error.light,
          marginTop: theme.spacing(2),
        }}
        onClose={handleVisibility}
      >
        {message.map((e, index) =>
          (<Typography key={index} variant="body2">{e}</Typography>),
        )}
      </Alert>
    </Collapse>
  );
};

export default MessageAlert;
