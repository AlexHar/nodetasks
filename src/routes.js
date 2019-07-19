import { Router } from "express";

const routes = new Router();

const projects = [];

routes.get("/projects", (req, res) => {
  return res.json(projects);
});

routes.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  res.json(project);
});

routes.put("/projects/:id", (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  project.title = title;
  return res.json(project);
});

routes.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);
  res.send();
});

routes.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);
  return res.json(projects);
});

export default routes;
