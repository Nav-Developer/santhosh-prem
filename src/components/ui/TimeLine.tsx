"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function TimelineList({ items }: { items: any[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {items.map((t) => (
        <Accordion
          key={t.id}
          expanded={open === t.id}
          onChange={(_, isOpen) => setOpen(isOpen ? t.id : null)}
          disableGutters
          elevation={0}
          sx={{
            borderRadius: "16px !important",
            border: "1px solid rgba(255,255,255,0.08)",
            bgcolor: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(12px)",
            backgroundImage: "none",
            color: "inherit",
            "&::before": { display: "none" },
            "&.Mui-expanded": { borderColor: "rgba(139,92,246,0.45)" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#a78bfa" }} />}
            sx={{ px: 3, py: 1 }}
          >
            <Box sx={{ width: "100%", pr: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {t.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "monospace", color: "text.secondary" }}
                >
                  {t.year}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {t.description}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.8, color: "rgba(255,255,255,0.75)" }}
            >
              {t.details}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

// "use client";

// import {
//   Accordion,
//   AccordionDetails,
//   AccordionSummary,
//   Box,
//   Typography,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import type { TimelineItem } from "@/data/about";

// export default function TimelineList({ items }: { items: TimelineItem[] }) {
//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//       {items.map((t) => (
//         <Accordion
//           key={t.id}
//           disableGutters
//           elevation={0}
//           sx={{
//             borderRadius: "16px !important",
//             border: "1px solid rgba(255,255,255,0.08)",
//             bgcolor: "rgba(255,255,255,0.04)",
//             backdropFilter: "blur(12px)",
//             backgroundImage: "none",
//             color: "inherit",
//             "&::before": { display: "none" },
//             "&.Mui-expanded": { borderColor: "rgba(139,92,246,0.45)" },
//           }}
//         >
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon sx={{ color: "#a78bfa" }} />}
//             sx={{ px: 3, py: 1 }}
//           >
//             <Box sx={{ width: "100%", pr: 2 }}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   gap: 2,
//                 }}
//               >
//                 <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                   {t.title}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{ fontFamily: "monospace", color: "text.secondary" }}
//                 >
//                   {t.year}
//                 </Typography>
//               </Box>
//               <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                 {t.description}
//               </Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
//             <Typography
//               variant="body2"
//               sx={{ lineHeight: 1.8, color: "rgba(255,255,255,0.75)" }}
//             >
//               {t.details}
//             </Typography>
//           </AccordionDetails>
//         </Accordion>
//       ))}
//     </Box>
//   );
// }
