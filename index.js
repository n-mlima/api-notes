require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin: * ','Content-Security-Policy', 'font-src \'self\' *.vercel.com *.gstatic.com *.netlify.com *.netlify.app');
  next();
});


// Middleware para permitir solicitações de origens diferentes (CORS)
app.use(cors());
// Middleware para analisar o corpo das solicitações como JSON
app.use(bodyParser.json());

// Dados de exemplo
let listdo = [
  
];

// Rota para obter todas as tarefas
app.get('/listdo', (req, res) => {
  res.json(listdo);
});

// Rota para criar uma nova tarefa
app.post('/listdo', (req, res) => {
  const newTask = req.body;
  newTask.id = Math.floor(Math.random() * (10000 - 1) + 1);
  listdo.push(newTask);
  res.json(newTask);
});

// Rota para atualizar uma tarefa
app.put('/listdo/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;

  listdo = listdo.map((task) =>
    task.id === taskId ? { ...task, ...updatedTask } : task
  );

  res.json(updatedTask);
});

// Rota para excluir uma tarefa
app.delete('/listdo/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  listdo = listdo.filter((task) => task.id !== taskId);
  res.json({ message: 'Task deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
