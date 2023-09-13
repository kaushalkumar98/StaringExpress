import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [input, setInput] = useState("");
  const [showData, setShowData] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    id: "",
    name: "",
    dob: "",
    photoUrl: "",
    birthPlace: "",
    fifties: "",
    wickets: "",
    average: "",
    matches: "",
    score: "",
    career: "",
    centuries: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: input,
    };
    try {
      const result = await axios.post(
        "http://localhost:3000/api/players/search",
        data
      );
      const response = result.data.result;
      setData({
        id: response.id,
        name: response.name,
        dob: response.dob,
        photoUrl: response.photoUrl,
        birthPlace: response.birthPlace,
        fifties: response.fifties,
        wickets: response.wickets,
        average: response.average,
        matches: response.matches,
        score: response.score,
        career: response.career,
        centuries: response.centuries,
      });
      setShowData(true);
    } catch (error) {
      console.error(error);
      setShowData(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        Swal.fire(error.response.data.message, "", "error");
      } else {
        // If there's no specific message from the backend, show a generic error message
        Swal.fire("Internal Server Error!", "", "error");
      }
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{ width: { xs: "90%", sm: "80%", md: "50%", lg: "40%" }, mt: 15 }}
        mx="auto"
      >
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            autoComplete="off"
            placeholder="Enter Player Name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="large" type="submit" disabled={!input}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            size="small"
          />
        </form>
      </Box>
      {showData && (
        <Box my={5}>
          <Grid container spacing={2} sx={{ px: { xs: 2, sm: 5, md: 8 } }}>
            <Grid item xs={12} md={3} lg={3}>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  p: 1,
                  minHeight: "50vh",
                }}
                elevation={4}
              >
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  variant="rounded"
                  src={data.photoUrl}
                />
                <h2 style={{ textAlign: "center" }}>{data.name}</h2>
                <Divider>
                  <Chip label="Player Info" />
                </Divider>
                <h4>Date of Birth: {data.dob}</h4>
                <h4>Number Of Matches: {data.matches}</h4>
                <h4>Runs: {data.score}</h4>
                <h4>Number of Fifties: {data.fifties}</h4>
                <h4>Number of Centuries: {data.centuries}</h4>
                <h4>Average: {data.average}</h4>
                <h4>Wickets: {data.wickets}</h4>
              </Paper>
            </Grid>
            <Grid item xs={12} md={9} lg={9}>
              <Paper
                elevation={4}
                sx={{
                  minHeight: "50vh",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography variant="h4">Career Details</Typography>
                <h3>{data.career}</h3>
              </Paper>
            </Grid>
          </Grid>
          <Box
            my={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              endIcon={<EditIcon />}
              onClick={() => navigate(`/edit/${data.id}`)}
            >
              Edit Player Details
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Search;
