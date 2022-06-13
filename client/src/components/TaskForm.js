import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

const TaskForm = () => {
  const [task, setTask] = useState({
    nombre: "",
    email: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      loadTask(params.id);
    }
  }, [params.id]);

  const loadTask = async (id) => {
    const res = await fetch("http://localhost:4000/tasks/" + id);
    const data = await res.json();
    setTask({ nombre: data.nombre, email: data.email, website: data.website });
    setEditing(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        const response = await fetch(
          "http://localhost:4000/tasks/" + params.id,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
          }
        );
        await response.json();
      } else {
        const response = await fetch("http://localhost:4000/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task),
        });
        await response.json();
      }

      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{
            backgroundColor: "#DADDDD",
            padding: "1rem",
          }}
        >
          <Typography variant="h5" textAlign="center" color="black">
            {editing ? "Actualizar Cliente" : "Crear Cliente"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Escribe tu nombre"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="nombre"
                onChange={handleChange}
                value={task.nombre}
                inputProps={{ style: { color: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
              />
              <TextField
                variant="filled"
                label="Escribe tu email"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="email"
                onChange={handleChange}
                value={task.email}
                inputProps={{ style: { color: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
              />
              <TextField
                variant="filled"
                label="Escribe tu website"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="website"
                onChange={handleChange}
                value={task.website}
                inputProps={{ style: { color: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!task.nombre || !task.email ||  !task.website}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={25} />
                ) : (
                  "Save"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TaskForm;
