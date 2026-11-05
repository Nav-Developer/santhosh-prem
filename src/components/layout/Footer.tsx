import { Box, Typography } from "@mui/material";

export default function Footer() {
  const INSTAGRAM_URL = "https://www.instagram.com/nk_freaky/";
  const WEBSITE_URL = "https://www.naveenkumar.site";
  const link =
    "transition hover:text-[#f3d9a0] hover:underline underline-offset-2";
  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        py: 5,
        textAlign: "center",
        color: "rgba(255,255,255,0.6)",
        bgcolor: "#0a0a0a",
        borderTop: "4px solid #c6ff00",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Impact, 'Arial Narrow Bold', sans-serif",
          textTransform: "uppercase",
          fontSize: 28,
          color: "#fff",
          mb: 1,
        }}
      >
        Train · Eat · Sleep · <span style={{ color: "#c6ff00" }}>Repeat</span>
      </Typography>
      {/* <Typography variant="body2" sx={{ letterSpacing: "0.1em" }}> */}

      <div className="border-t border-white/10 px-6 py-5 text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-white/50">
          © {new Date().getFullYear()} Santhosh Prem . ALL RIGHTS RESERVED.
        </p>
        <p className="text-xs uppercase tracking-[0.18em] text-white/50">
          Designed & Developed by{" "}
          <a
            href={WEBSITE_URL}
            target="_blank"
            rel="noreferrer"
            className="text-neon-400 transition hover:text-white"
          >
            Naveen Kumar
          </a>
          <span>·</span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className={link}
          >
            Instagram ↗
          </a>
        </p>
      </div>
      {/* </Typography> */}
    </Box>
  );
}
