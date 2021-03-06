function solution(n, words) {
  let last = "";
  const wordBox = [];
  let answer = [];
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    if (word.length == 1) {
      answer = [(i + 1) % n, (i + 1) / n + 1];
      break;
    } else if (i == 0) {
      last = word[word.length - 1];
      wordBox.push(word);
    } else if (word[0] !== last || wordBox.includes(word)) {
      answer = [(i % n) + 1, Math.ceil((i + 1) / n)];
      break;
    }
    last = word[word.length - 1];
    wordBox.push(word);
  }

  return answer.length == 0 ? [0, 0] : answer;
}

solution(2, ["hello", "one", "even", "never", "now", "world", "draw"]);

// reduce
function solution2(n, words) {
  let stop = false;
  return words.slice(1).reduce(
    (acc, cur, i) => {
      const prev = words[i];

      i++;
      const player = (i % n) + 1;
      const turn = Math.floor(i / n) + 1;

      if (stop === false) {
        if (cur[0] !== prev[prev.length - 1] || words.indexOf(cur) !== i) {
          stop = true;
          return [player, turn];
        }
      }
      return acc;
    },
    [0, 0]
  );
}
