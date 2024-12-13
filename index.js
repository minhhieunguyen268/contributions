const simpleGit = require('simple-git');
const git = simpleGit();
const jsonfile = require('jsonfile');
const moment = require('moment');
const random = require('random');

const FILE_PATH = './data.json';

// Hàm cập nhật file và commit
const makeCommit = async (n) => {
  if (n === 0) return;

  const date = moment().subtract(n, 'd').format();
  const data = {
    date,
    value: random.int(1, 100),
  };

  jsonfile.writeFile(FILE_PATH, data, () => {
    git.add('./*')
      .commit(date, { '--date': date })
      .push()
      .then(() => makeCommit(n - 1));
  });
};

git.init().then(() => makeCommit(100));