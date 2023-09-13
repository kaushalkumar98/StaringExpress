import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Backdrop,
  CircularProgress,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const { id } = useParams();
  const editMode = id ? true : false;
  const [data, setData] = useState({
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
  const [loading, isLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (
      data.name === "" ||
      data.average === "" ||
      data.birthPlace === "" ||
      data.centuries === "" ||
      data.career === "" ||
      data.score === "" ||
      data.fifties === "" ||
      data.matches === "" ||
      data.photoUrl === "" ||
      data.dob === "" ||
      data.wickets === ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  const submitData = async () => {
    const isEmptyFields = validate();
    if (isEmptyFields) {
      Swal.fire("All the Fields are Mandatory!", "", "warning");
      return;
    }
    try {
      isLoading(true);
      await axios.post("http://localhost:3000/api/players/", data);
      Swal.fire("Player Created!", "", "success");
      isLoading(false);
      setData({
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
    } catch (error) {
      console.log(error);
      Swal.fire("Internal Server Error!", "", "error");
      isLoading(false);
    }
  };

  useEffect(() => {
    const fetchByName = async () => {
      if (!editMode) {
        return;
      }
      try {
        isLoading(true);
        const result = await axios.get(
          `http://localhost:3000/api/players/${id}`
        );
        const response = result.data.data;
        if (!response) {
          navigate("/");
        }
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
        isLoading(false);
      } catch (error) {
        console.log(error);
        Swal.fire("Internal Server Error!", "", "error");
        isLoading(false);
      }
    };
    fetchByName();
  }, [editMode]);

  const editData = async () => {
    const isEmptyFields = validate();
    if (isEmptyFields) {
      Swal.fire("All the Fields are Mandatory!", "", "warning");
      return;
    }
    try {
      isLoading(true);
      const result = await axios.put(
        `http://localhost:3000/api/players/${id}`,
        data
      );
      if (result.data.success) {
        Swal.fire("Data Updated!", "", "success");
      }
      isLoading(false);
    } catch (error) {
      Swal.fire("Internal Server Error!", "", "error");
      isLoading(false);
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Navbar />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ mb: { xs: 0, sm: 5, md: 10 }, mt: { xs: 5, md: 10 } }}
      >
        <Grid item xs={12} md={8} lg={5}>
          <Card sx={{ p: 3 }}>
            <CardContent>
              <Typography
                variant="h4"
                textAlign={"center"}
                sx={{ fontWeight: "bold" }}
              >
                {editMode ? "Edit Player Stats" : "Player Information"}
              </Typography>
              <Divider />
              <Box display={"flex"} flexDirection={"column"} gap={2} my={2}>
                <TextField
                  label="Name"
                  variant="outlined"
                  value={data.name}
                  onChange={(e) =>
                    setData({
                      ...data,
                      name: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Date of Birth"
                  variant="outlined"
                  value={data.dob}
                  onChange={(e) =>
                    setData({
                      ...data,
                      dob: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Photo Url"
                  variant="outlined"
                  value={data.photoUrl}
                  onChange={(e) =>
                    setData({
                      ...data,
                      photoUrl: e.target.value,
                    })
                  }
                />
                <TextField
                  label="BirthPlace"
                  variant="outlined"
                  value={data.birthPlace}
                  onChange={(e) =>
                    setData({
                      ...data,
                      birthPlace: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Career"
                  variant="outlined"
                  multiline
                  rows={3}
                  value={data.career}
                  onChange={(e) =>
                    setData({
                      ...data,
                      career: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Number of Matches"
                  variant="outlined"
                  type="number"
                  value={data.matches}
                  onChange={(e) =>
                    setData({
                      ...data,
                      matches: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Score"
                  variant="outlined"
                  type="number"
                  value={data.score}
                  onChange={(e) =>
                    setData({
                      ...data,
                      score: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Fifties"
                  variant="outlined"
                  type="number"
                  value={data.fifties}
                  onChange={(e) =>
                    setData({
                      ...data,
                      fifties: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Centuries"
                  variant="outlined"
                  type="number"
                  value={data.centuries}
                  onChange={(e) =>
                    setData({
                      ...data,
                      centuries: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Wickets"
                  variant="outlined"
                  type="number"
                  value={data.wickets}
                  onChange={(e) =>
                    setData({
                      ...data,
                      wickets: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Average"
                  variant="outlined"
                  type="number"
                  value={data.average}
                  onChange={(e) =>
                    setData({
                      ...data,
                      average: e.target.value,
                    })
                  }
                />
              </Box>
            </CardContent>
            <CardActions>
              {editMode ? (
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ mx: "auto" }}
                  onClick={editData}
                >
                  Save Changes
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mx: "auto" }}
                  onClick={submitData}
                >
                  Submit
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
