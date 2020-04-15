const express = require("express");
const {uuid,isUuid} = require('uuidv4');

const app = express();

app.use(express.json());

/**
 * 
 */

const projects = [];

function logRequests(request, response, next){
  const {method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  return next(); //Próximo middleware

}

function validateProjectId(request, response, next){

  const {id} = request.params;

  if(!isUuid(id)) {
    return response.status(400).json({error: "Invalid project ID."});
  }

  return next();

}

app.use(logRequests);

/**
 * Pode ser usado desta forma que estará abrangendo a todas rotas que atenderem aos parâmetros
 * "... app.use('/projects/:id',validateProjectId, middleware1, middleware2,) ...""
*/

app.get('/projects', (request, response) => {
  
  const {title} = request.query;

  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects;

  return response.json(results);
});

app.post('/projects', (request, response) => {

  const {title,owner} = request.body;

  const project = {id: uuid(),title, owner};
  projects.push(project);

  return response.json(project);
})

app.put('/projects/:id', validateProjectId, (request, response) => {
  const {id} = request.params;
  const {title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id=== id);

  if(projectIndex<0){
    return response.status(400).json({error: "Project Not Found"});
  }

  const project = {

    id,
    title,
    owner,

  }
  projects[projectIndex]= project;

  return response.json(project);
})

app.delete('/projects/:id', validateProjectId, (request, response) => {

  const {id}=request.params;
 
  const projectIndex = projects.findIndex(project => project.id=== id);

  if(projectIndex<0){
    return response.status(400).json({error: "Project Not Found"});
  }
  /**
   * SPLICE = Método para retirar alguma informação de dentro de um array
   */

  projects.splice(projectIndex,1);

  return response.status(204).send();
})

app.listen(3333,() => {
  console.log('Back-end Started!🚀');
} );