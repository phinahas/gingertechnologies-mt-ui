// ...existing imports...
import { Paper, Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
// ...existing code...

const XOXGameBoardComponent = ({
    loggedInUser,
    activeUser,
    users,
    board
}) => {



    return (

        <Box
            sx={{
                mt: 5,
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: { xs: 2, sm: 4 },
                    borderRadius: 4,
                    background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
                    maxWidth: 340,
                }}
            >
                <Grid container spacing={1}>
                    {[0, 1, 2].map((row) => (
                        <Grid item xs={12} key={row}>
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                {[0, 1, 2].map((col) => (
                                    <Box
                                        key={col}
                                        sx={{
                                            width: { xs: 60, sm: 80 },
                                            height: { xs: 60, sm: 80 },
                                            background: "#f5f5f5",
                                            border: "2px solid #bdbdbd",
                                            borderRadius: 2,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: { xs: 32, sm: 40 },
                                            fontWeight: "bold",
                                            color: "#bdbdbd",
                                            mx: 0.5,
                                            my: 0.5,
                                            transition: "background 0.3s",
                                            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                                            cursor: "pointer",
                                            userSelect: "none",
                                            "&:hover": {
                                                background: "#e3f2fd",
                                            },
                                        }}
                                    >
                                        {/* Empty for now */}
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
            {
                loggedInUser != activeUser ?
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            bgcolor: "rgba(255,255,255,0.6)",
                            zIndex: 10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            pointerEvents: "all", // Block mouse events
                            borderRadius: 4,
                        }}
                    >
                        <Typography variant="h6" color="text.secondary">
                            Waiting for your turn...
                        </Typography>
                    </Box>
                    :
                    null
            }

        </Box>

    );
};

export default XOXGameBoardComponent;