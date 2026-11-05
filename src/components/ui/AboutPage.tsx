"use client";

import { Box, Container, Typography } from "@mui/material";
import MotionBackground from "@/components/ui/MotionBackground";

import { about } from "@/data/about";
import TimelineList from "./TimeLine";
import SectionHeader from "./SectionHeader";
import Image from "next/image";
import assets from "@/assets";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const LIME = "#c6ff00";
const DISPLAY = "Impact, 'Arial Narrow Bold', sans-serif";
const WIPE_EASE = [0.76, 0, 0.24, 1] as const;

export default function AboutPage() {
  const [isHovered, setIsHovered] = useState(false);

  // ---- 3D tilt (follows the cursor) ----
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), {
    stiffness: 150,
    damping: 15,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleEnter = () => setIsHovered(true);

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
    setIsHovered(false);
  };

  return (
    <MotionBackground className="min-h-screen">
      <Container maxWidth="lg" sx={{ pt: 20, pb: 8 }} id="about">
        <SectionHeader eyebrow={about.eyebrow} heading={about.heading} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "5fr 7fr",
            },
            gap: 5,
            alignItems: "start",
          }}
        >
          <Box>
            {/* Perspective wrapper so the tilt looks 3D */}
            <Box sx={{ perspective: "900px" }}>
              <motion.div
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                onMouseMove={handleMove}
                animate={{
                  boxShadow: isHovered
                    ? `4px 4px 0 ${LIME}`
                    : `10px 10px 0 ${LIME}`,
                  x: isHovered ? 3 : 0,
                  y: isHovered ? 3 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  aspectRatio: "4 / 5",
                  border: `3px solid ${LIME}`,
                  cursor: "pointer",
                  background: "#111",
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Base image (always visible, grayscale) */}
                <Image
                  src={assets.images.trainerHover}
                  alt="Trainer"
                  fill
                  priority
                  sizes="(min-width:900px) 40vw, 100vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "top",
                    filter: "grayscale(1) contrast(1.2)",
                  }}
                />

                {/* Hover image: wipes in from the bottom, in full color */}
                <motion.div
                  initial={false}
                  animate={{
                    clipPath: isHovered
                      ? "inset(0% 0% 0% 0%)"
                      : "inset(100% 0% 0% 0%)",
                  }}
                  transition={{ duration: 0.6, ease: WIPE_EASE }}
                  style={{ position: "absolute", inset: 0 }}
                >
                  <motion.div
                    initial={false}
                    animate={{ scale: isHovered ? 1 : 1.15 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ position: "absolute", inset: 0 }}
                  >
                    <Image
                      src={assets.images.trainer}
                      alt="Trainer"
                      fill
                      sizes="(min-width:900px) 40vw, 100vw"
                      style={{
                        objectFit: "cover",
                        objectPosition: "top",
                        filter: "contrast(1.1) saturate(1.2)",
                      }}
                    />
                  </motion.div>
                </motion.div>

                {/* Lime scan line that travels with the reveal */}
                <motion.div
                  initial={false}
                  animate={{
                    bottom: isHovered ? "100%" : "0%",
                    opacity: isHovered ? 0 : 1,
                  }}
                  transition={{ duration: 0.6, ease: WIPE_EASE }}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    height: 4,
                    background: LIME,
                    boxShadow: `0 0 18px ${LIME}`,
                    pointerEvents: "none",
                  }}
                />

                {/* Lime Overlay (fades out on hover so the color photo is clean) */}
                <motion.div
                  initial={false}
                  animate={{ opacity: isHovered ? 0 : 0.15 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: LIME,
                    mixBlendMode: "multiply",
                    pointerEvents: "none",
                  }}
                />

                {/* Bottom Gradient */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(transparent 60%, rgba(0,0,0,0.9))",
                    pointerEvents: "none",
                  }}
                />

                {/* Image Caption (swaps on hover) */}
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    p: 3,
                    pointerEvents: "none",
                    overflow: "hidden",
                  }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={isHovered ? "hover-caption" : "default-caption"}
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -24, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <Typography
                        sx={{
                          fontFamily: DISPLAY,
                          textTransform: "uppercase",
                          fontSize: 24,
                          color: isHovered ? LIME : "#fff",
                        }}
                      >
                        {isHovered ? "See the real me →" : about.imageCaption}
                      </Typography>
                    </motion.div>
                  </AnimatePresence>
                </Box>
              </motion.div>
            </Box>

            {/* Stats */}
            <Box
              sx={{
                mt: 5,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
              }}
            >
              {about.stats.map((s, i) => (
                <Box
                  key={s.label}
                  sx={{
                    p: 2,
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderTop: `4px solid ${LIME}`,
                    bgcolor: "#111",
                    gridColumn:
                      i === about.stats.length - 1 && about.stats.length % 2
                        ? "1 / -1"
                        : "auto",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: DISPLAY,
                      fontSize: 38,
                      lineHeight: 1,
                      color: LIME,
                    }}
                  >
                    {s.value}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "text.secondary",
                    }}
                  >
                    {s.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right: Timeline */}
          <TimelineList items={about.timeline} />
        </Box>
      </Container>
    </MotionBackground>
  );
}
