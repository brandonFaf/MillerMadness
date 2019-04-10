const HIGHSCORES = 3;
const getHighscores = gameMode => {
  const scores = JSON.parse(localStorage.getItem(gameMode)) || [];
  return scores.slice(0, HIGHSCORES);
};
const generateHighscores = gameMode => {
  if (getHighscores(gameMode).length === 0) {
    saveScore(gameMode, 12, 'ABC', 30);
    saveScore(gameMode, 9, 'ABC', 30);
    saveScore(gameMode, 7, 'ABC', 30);
    saveScore(gameMode, 17, 'ABC', 30);
    saveScore(gameMode, 47, 'ABC', 60);
    saveScore(gameMode, 42, 'ABC', 60);
    saveScore(gameMode, 18, 'ABC', 60);
  }
};
const getDate = () => {
  const date = new Date();
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
};
const saveScore = (gameMode, score, initials, time) => {
  const game = {
    gameMode,
    score,
    initials,
    time,
    date: getDate()
  };
  const scores = JSON.parse(localStorage.getItem(gameMode)) || [];
  scores.push(game);
  scores.sort((a, b) => b.score - a.score);
  localStorage.setItem(gameMode, JSON.stringify(scores));
  return !!scores.slice(0, HIGHSCORES).find(x => x === game);
};
export { saveScore, getHighscores, generateHighscores };
