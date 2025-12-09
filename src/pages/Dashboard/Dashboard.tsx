import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const RevenueCard: React.FC = () => {
  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      {/* Floating Arrow Button */}
      <IconButton
        sx={{
          position: "absolute",
          top: -1,       // ← Keeps distance from card
          right: -1,     // ← Keeps distance from card
          zIndex: 20,
          width: 35,
          height: 35,
          backgroundColor: "white",
          boxShadow: 10,
          "&:hover": { backgroundColor: "#f1f1f1" },
        }}
      >
        <ArrowOutwardIcon />
      </IconButton>

      {/* Curvy Card */}
      <Card
        sx={{
          width: 380,
          padding: 2,
          pt: 3,
          borderRadius: "30px 120px 30px 30px", // ← Curvy top-right corner
          background: "linear-gradient(135deg, #92FF6C 0%, #34C94B 100%)",
          boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
          position: "relative",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Revenue
          </Typography>

          <Typography variant="h3" sx={{ fontWeight: 700, mt: 1 }}>
            $120,873
          </Typography>

          {/* Growth Section */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Chip
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <ArrowUpwardIcon fontSize="small" /> +17%
                </Box>
              }
              sx={{
                backgroundColor: "white",
                borderRadius: "14px",
                height: "28px",
                fontWeight: 600,
              }}
            />
            <Typography sx={{ ml: 1, fontWeight: 500 }}>
              Than last month
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RevenueCard;
