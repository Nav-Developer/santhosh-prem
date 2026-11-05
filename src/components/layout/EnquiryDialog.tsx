"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";

export type EnquiryChannel = "whatsapp" | "email";

export interface EnquiryDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  header?: ReactNode;
  defaultSubject: string;
  defaultMessage: string;
  enquiryLabel: string;
  whatsappNumber: string;
  email: string;
  recipientName?: string;
  defaultChannel?: EnquiryChannel;
}

const LIME = "#c6ff00";
const DISPLAY = "Impact, 'Arial Narrow Bold', sans-serif";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 0,
    "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" },
    "&.Mui-focused fieldset": { borderColor: LIME },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: LIME },
};

export default function EnquiryDialog({
  open,
  onClose,
  title,
  subtitle = "Tell me your goal. Let's get to work.",
  header,
  defaultSubject,
  defaultMessage,
  enquiryLabel,
  whatsappNumber,
  email,
  recipientName = "there",
  defaultChannel = "whatsapp",
}: EnquiryDialogProps) {
  const [channel, setChannel] = useState<EnquiryChannel>(defaultChannel);
  const [subject, setSubject] = useState(defaultSubject);
  const [description, setDescription] = useState(defaultMessage);

  useEffect(() => {
    if (open) {
      setSubject(defaultSubject);
      setDescription(defaultMessage);
      setChannel(defaultChannel);
    }
  }, [open, defaultSubject, defaultMessage, defaultChannel]);

  const canSend = subject.trim() !== "" && description.trim() !== "";

  const handleSend = () => {
    if (!canSend) return;

    if (channel === "whatsapp") {
      const message = [
        `Hi ${recipientName}!`,
        ``,
        `*${enquiryLabel}*`,
        ``,
        `*Subject:* ${subject.trim()}`,
        ``,
        `*My Goal:*`,
        description.trim(),
        ``,
        `Looking forward to training with you!`,
      ].join("\n");

      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer",
      );
    } else {
      const body = [
        `Hi ${recipientName},`,
        ``,
        description.trim(),
        ``,
        `Enquiry type: ${enquiryLabel}`,
        ``,
        `Looking forward to training with you!`,
      ].join("\n");

      window.location.href = `mailto:${email}?subject=${encodeURIComponent(
        subject.trim(),
      )}&body=${encodeURIComponent(body)}`;
    }

    onClose();
  };

  const isWhatsApp = channel === "whatsapp";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            bgcolor: "#0a0a0a",
            color: "#fff",
            border: "2px solid #c6ff00",
            borderRadius: 0,
            backgroundImage: "none",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: DISPLAY,
              textTransform: "uppercase",
              fontSize: 28,
              color: LIME,
              lineHeight: 1,
            }}
          >
            {title}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.75, fontSize: 12 }}>
            {subtitle}
          </Typography>
        </Box>

        <IconButton
          onClick={onClose}
          sx={{ color: "#fff", borderRadius: 0 }}
          aria-label="Close enquiry"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {header && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              p: 1.5,
              mb: 2,
              bgcolor: "rgba(255,255,255,0.04)",
              borderLeft: `4px solid ${LIME}`,
            }}
          >
            {header}
          </Box>
        )}

        <ToggleButtonGroup
          exclusive
          fullWidth
          size="small"
          value={channel}
          onChange={(_, value: EnquiryChannel | null) => {
            if (value) setChannel(value);
          }}
          aria-label="Send enquiry via"
          sx={{
            mb: 1,
            "& .MuiToggleButton-root": {
              color: "rgba(255,255,255,0.6)",
              borderColor: "rgba(255,255,255,0.2)",
              borderRadius: 0,
              textTransform: "uppercase",
              fontFamily: DISPLAY,
              letterSpacing: "0.08em",
              fontSize: 15,
              gap: 1,
              py: 0.9,
            },
            "& .MuiToggleButton-root.Mui-selected": {
              color: "#000",
              bgcolor: LIME,
              borderColor: LIME,
            },
            "& .MuiToggleButton-root.Mui-selected:hover": {
              bgcolor: "#d9ff4d",
            },
          }}
        >
          <ToggleButton value="whatsapp">
            <WhatsAppIcon sx={{ fontSize: 18 }} />
            WhatsApp
          </ToggleButton>
          <ToggleButton value="email">
            <EmailIcon sx={{ fontSize: 18 }} />
            Email
          </ToggleButton>
        </ToggleButtonGroup>

        <TextField
          fullWidth
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          margin="normal"
          size="small"
          sx={fieldSx}
        />

        <TextField
          fullWidth
          multiline
          rows={5}
          label="Your Goal"
          placeholder="Fat loss, muscle gain, contest prep... tell me what you want."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          sx={fieldSx}
        />

        <Typography color="text.secondary" sx={{ mt: 1, fontSize: 11 }}>
          {isWhatsApp
            ? "Your enquiry will open directly in WhatsApp. Review and send it there."
            : "Your enquiry will open in your email app. Review and send it from there."}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1, gap: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "text.secondary",
            textTransform: "none",
            borderRadius: 0,
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          startIcon={isWhatsApp ? <WhatsAppIcon /> : <EmailIcon />}
          onClick={handleSend}
          disabled={!canSend}
          sx={{
            bgcolor: LIME,
            color: "#000",
            borderRadius: 0,
            px: 3,
            fontFamily: DISPLAY,
            fontSize: 17,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            boxShadow: "none",
            "&:hover": { bgcolor: "#fff", boxShadow: "none" },
            "&.Mui-disabled": {
              bgcolor: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.35)",
            },
          }}
        >
          {isWhatsApp ? "Send via WhatsApp" : "Send via Email"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
