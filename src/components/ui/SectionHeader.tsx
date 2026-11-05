import { Box } from "@mui/material";

type Props = {
  eyebrow: string;
  heading: string;
  subheading?: string;
  gradientEnd?: string; // kept so old calls don't break, not used
  align?: "left" | "center";
};

export default function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = "left",
}: Props) {
  const center = align === "center";
  return (
    <Box
      sx={{
        mb: 6,
        textAlign: center ? "center" : "left",
        display: "flex",
        flexDirection: "column",
        alignItems: center ? "center" : "flex-start",
      }}
    >
      <Box
        sx={{
          px: 1.5,
          py: 0.4,
          bgcolor: "#c6ff00",
          color: "#000",
          fontFamily: "Impact, 'Arial Narrow Bold', sans-serif",
          letterSpacing: "0.2em",
          fontSize: 14,
          textTransform: "uppercase",
        }}
      >
        {eyebrow}
      </Box>

      <Box
        component="h2"
        sx={{
          mt: 2,
          m: 0,
          fontFamily: "Impact, 'Arial Narrow Bold', sans-serif",
          fontWeight: 400,
          textTransform: "uppercase",
          lineHeight: 0.95,
          color: "#fff",
          fontSize: "clamp(2.6rem, 6vw, 5rem)",
        }}
      >
        {heading}
      </Box>

      <Box sx={{ mt: 2, width: 90, height: 5, bgcolor: "#c6ff00" }} />

      {subheading && (
        <Box
          sx={{
            mt: 2.5,
            maxWidth: 560,
            color: "rgba(255,255,255,0.65)",
            fontSize: { xs: 15, md: 17 },
          }}
        >
          {subheading}
        </Box>
      )}
    </Box>
  );
}
