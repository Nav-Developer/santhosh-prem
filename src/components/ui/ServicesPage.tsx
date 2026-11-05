"use client";

import { useState } from "react";
import type { ElementType } from "react";

import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import MotionBackground from "@/components/ui/MotionBackground";
import SectionHeader from "./SectionHeader";

import LanguageIcon from "@mui/icons-material/Language";
import VideocamIcon from "@mui/icons-material/Videocam";
import LayersIcon from "@mui/icons-material/Layers";
import CodeIcon from "@mui/icons-material/Code";
import ApiIcon from "@mui/icons-material/Api";
import PaletteIcon from "@mui/icons-material/Palette";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import SchoolIcon from "@mui/icons-material/School";
import TimerIcon from "@mui/icons-material/Timer";
import MemoryIcon from "@mui/icons-material/Memory";
import ExploreIcon from "@mui/icons-material/Explore";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import EcoIcon from "@mui/icons-material/AcUnit";

import { creatorHub, services } from "@/data/service";
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/data/constant";
import EnquiryDialog from "../layout/EnquiryDialog";

const MotionBox = motion.create(Box);
const LIME = "#c6ff00";
const DISPLAY = "Impact, 'Arial Narrow Bold', sans-serif";

const iconMap: Record<string, ElementType> = {
  web: LanguageIcon,
  video: VideocamIcon,
  fullstack: LayersIcon,
  react: CodeIcon,
  api: ApiIcon,
  ui: PaletteIcon,
  portfolio: AutoAwesomeIcon,
  landing: RocketLaunchIcon,
  fitness: FitnessCenterIcon,
  nutrition: EcoIcon,
  cooking: SoupKitchenIcon,
  tutorials: SchoolIcon,
  productivity: TimerIcon,
  tech: MemoryIcon,
  journey: ExploreIcon,
};

const gridSx = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, 1fr)",
    md: "repeat(4, 1fr)",
  },
  gap: 2,
};

const cardSx = {
  position: "relative",
  p: 2.5,
  border: "1px solid rgba(255,255,255,0.12)",
  bgcolor: "#111",
  transition: "border-color .25s, transform .25s, background-color .25s",
  "&:hover": {
    borderColor: LIME,
    transform: "translateY(-4px)",
    bgcolor: "#151515",
  },
};

function IconBubble({
  name,
  tone = "lime",
}: {
  name: string;
  tone?: "lime" | "outline";
}) {
  const Icon = iconMap[name] ?? CodeIcon;
  const solid = tone === "lime";

  return (
    <Box
      sx={{
        width: 44,
        height: 44,
        display: "grid",
        placeItems: "center",
        bgcolor: solid ? LIME : "transparent",
        border: solid ? "none" : `2px solid ${LIME}`,
        color: solid ? "#000" : LIME,
      }}
    >
      <Icon sx={{ fontSize: 22 }} />
    </Box>
  );
}

function ServiceCards() {
  const [selectedService, setSelectedService] = useState<
    (typeof services.items)[number] | null
  >(null);

  return (
    <>
      <Box sx={gridSx}>
        {services.items.map((s, i) => (
          <MotionBox
            key={s.id}
            role="button"
            tabIndex={0}
            aria-label={`Enquire about ${s.title}`}
            onClick={() => setSelectedService(s)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelectedService(s);
              }
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: (i % 4) * 0.07 }}
            sx={{
              ...cardSx,
              minHeight: 200,
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              outline: "none",
              "&:focus-visible": { borderColor: LIME },
            }}
          >
            <IconBubble name={s.icon} />

            <Typography
              sx={{
                mt: 3,
                fontFamily: DISPLAY,
                textTransform: "uppercase",
                fontSize: 22,
                lineHeight: 1.1,
              }}
            >
              {s.title}
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 0.75, fontSize: 12.5, lineHeight: 1.5 }}
            >
              {s.description}
            </Typography>

            <Box
              sx={{
                mt: "auto",
                pt: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 11.5,
                color: "text.secondary",
              }}
            >
              <span>
                Starting at{" "}
                <Box component="b" sx={{ color: LIME }}>
                  {s.price}
                </Box>
              </span>
              <ArrowOutwardIcon sx={{ fontSize: 16, color: LIME }} />
            </Box>
          </MotionBox>
        ))}
      </Box>

      <EnquiryDialog
        open={Boolean(selectedService)}
        onClose={() => setSelectedService(null)}
        title={`${selectedService?.title ?? ""} Enquiry`}
        enquiryLabel={`${selectedService?.title ?? ""} Enquiry`}
        defaultSubject={`${selectedService?.title ?? ""} Enquiry`}
        defaultMessage={`Hi, I'm interested in ${selectedService?.title.toLowerCase() ?? ""}. I'd like to know more about the plan, pricing and how to get started.`}
        whatsappNumber={WHATSAPP_NUMBER}
        email={CONTACT_EMAIL}
        recipientName="Santhosh Prem "
        header={
          <>
            <IconBubble name={selectedService?.icon ?? "fitness"} />
            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                {selectedService?.title}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: 11 }}>
                Starting at {selectedService?.price}
              </Typography>
            </Box>
          </>
        }
      />
    </>
  );
}

export function CurrentServicesSection() {
  return (
    <Box>
      <SectionHeader
        eyebrow={services.eyebrow}
        heading={services.heading}
        subheading={services.subheading}
      />
      <ServiceCards />
    </Box>
  );
}

export function ServicesSection() {
  return <CurrentServicesSection />;
}

export function CreatorHubSection() {
  return (
    <Box>
      <SectionHeader
        eyebrow={creatorHub.eyebrow}
        heading={creatorHub.heading}
        subheading={creatorHub.subheading}
      />

      <Box sx={gridSx}>
        {creatorHub.items.map((c, i) => (
          <MotionBox
            key={c.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: (i % 4) * 0.07 }}
            sx={{ ...cardSx, minHeight: 140 }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                px: 1,
                py: 0.2,
                fontSize: 9,
                fontFamily: "monospace",
                letterSpacing: 1,
                color: "#000",
                bgcolor: LIME,
              }}
            >
              COMING SOON
            </Box>

            <IconBubble name={c.icon} tone="outline" />

            <Typography
              sx={{
                mt: 2,
                fontFamily: DISPLAY,
                textTransform: "uppercase",
                fontSize: 20,
              }}
            >
              {c.title}
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 0.5, fontSize: 12.5 }}>
              {c.description}
            </Typography>
          </MotionBox>
        ))}
      </Box>
    </Box>
  );
}

export default function ServicesPage() {
  return (
    <MotionBackground className="min-h-screen">
      <Container
        maxWidth="lg"
        id="services"
        sx={{ pt: 18, pb: 10, display: "grid", gap: 14 }}
      >
        <ServicesSection />
        <CreatorHubSection />
      </Container>
    </MotionBackground>
  );
}
