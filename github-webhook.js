const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json()); // supaya bisa baca payload JSON dari GitHub

app.post('/github-hook', (req, res) => {
  const log = {
    repo: req.body.repository.full_name,
    pusher: req.body.pusher?.name,
    commit: req.body.head_commit?.message,
    branch: req.body.ref,
    timestamp: new Date().toISOString()
  };

  fs.appendFile('github-log.json', JSON.stringify(log) + '\n', () => {});
  console.log(`[GITHUB] Push ke ${log.repo} oleh ${log.pusher}: ${log.commit}`);
  res.sendStatus(200);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Webhook GitHub aktif di http://localhost:${PORT}/github-hook`));
