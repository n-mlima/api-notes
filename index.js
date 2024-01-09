require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Configuração do CORS
const allowedOrigins = ['https://notes-nlima.netlify.app'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

let listdo = []; 

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
