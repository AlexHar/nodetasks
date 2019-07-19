import { Router } from "express";

const routes = new Router();

let requests = 0;
const projects = [];

//Validations need create middleware route

function verifyProjectId(req, res, next) {
  const { id } = req.params;
  const existId = projects.find(p => p.id == id);
  if (!existId) {
    return res.status(400).json({ error: "Project not found" });
  }
  return next();
}

function logRequests(req, res, next) {
  requests++;

  console.log(`Requests number: ${requests}`);

  return next();
}

routes.use(logRequests);

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

routes.put("/projects/:id", verifyProjectId, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  project.title = title;
  return res.json(project);
});

routes.delete("/projects/:id", verifyProjectId, (req, res) => {
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  projects.splice(project, 1);
  res.send();
});

routes.post("/projects/:id/tasks", verifyProjectId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);
  return res.json(projects);
});

export default routes;
