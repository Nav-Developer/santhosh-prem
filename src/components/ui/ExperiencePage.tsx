"use client";

import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import MotionBackground from "@/components/ui/MotionBackground";
import SectionHeader from "./SectionHeader";

import { experience } from "@/data/experience";

const MotionBox = motion.create(Box);
const LIME = "#c6ff00";
const DISPLAY = "Impact, 'Arial Narrow Bold', sans-serif";

export default function ExperiencePage() {
  return (
    <MotionBackground className="min-h-screen">
      <Container maxWidth="md" sx={{ pt: 20, pb: 10 }} id="experience">
        <SectionHeader
          eyebrow={experience.eyebrow}
          heading={experience.heading}
        />

        <Box sx={{ position: "relative", pl: { xs: 4, md: 6 } }}>
          {/* vertical line */}
          <Box
            sx={{
              position: "absolute",
              left: 8,
              top: 0,
              bottom: 0,
              width: "3px",
              background: `linear-gradient(180deg, ${LIME} 0%, rgba(198,255,0,0.15) 100%)`,
            }}
          />

          {experience.items.map((item, i) => (
            <MotionBox
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              sx={{ position: "relative", mb: 4 }}
            >
              {/* square marker */}
              <Box
                sx={{
                  position: "absolute",
                  left: { xs: -32, md: -48 },
                  top: 28,
                  width: 14,
                  height: 14,
                  bgcolor: LIME,
                  transform: "rotate(45deg)",
                  boxShadow: "0 0 14px rgba(198,255,0,0.6)",
                }}
              />

              <Box
                sx={{
                  p: { xs: 2.5, md: 3 },
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderLeft: `4px solid ${LIME}`,
                  bgcolor: "#111",
                  transition: "border-color .25s, transform .25s",
                  "&:hover": {
                    borderColor: LIME,
                    transform: "translateX(4px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: DISPLAY,
                        textTransform: "uppercase",
                        fontSize: 26,
                        lineHeight: 1.1,
                      }}
                    >
                      {item.role}
                    </Typography>
                    <Typography variant="body2" sx={{ color: LIME, mt: 0.5 }}>
                      {item.company}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      fontSize: 12,
                      fontFamily: "monospace",
                      color: "#000",
                      bgcolor: LIME,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.period}
                  </Box>
                </Box>

                <Box component="ul" sx={{ listStyle: "none", p: 0, my: 2.5 }}>
                  {item.points.map((p) => (
                    <Box
                      component="li"
                      key={p}
                      sx={{
                        display: "flex",
                        gap: 1.25,
                        mb: 1,
                        color: "rgba(255,255,255,0.75)",
                        fontSize: 14,
                        lineHeight: 1.6,
                      }}
                    >
                      <Box sx={{ color: LIME, fontSize: 10, mt: "5px" }}>■</Box>
                      {p}
                    </Box>
                  ))}
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {item.tech.map((t) => (
                    <Box
                      key={t}
                      sx={{
                        px: 1.25,
                        py: 0.4,
                        fontSize: 11,
                        fontFamily: "monospace",
                        border: "1px solid rgba(255,255,255,0.25)",
                        color: "rgba(255,255,255,0.85)",
                        textTransform: "uppercase",
                      }}
                    >
                      {t}
                    </Box>
                  ))}
                </Box>
              </Box>
            </MotionBox>
          ))}
        </Box>
      </Container>
    </MotionBackground>
  );
}
