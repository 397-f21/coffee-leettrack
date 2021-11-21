import { useState, useEffect } from "react";

function getQuestionsFromStorage(defaultValue) {
  // getting stored value
  const saved = JSON.parse(localStorage.getItem('questions'));
  return saved || defaultValue;
}

export const useLocalStorage = (questions, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getQuestionsFromStorage(defaultValue);
  });

  useEffect(() => {
    // storing input name
    window.localStorage.setItem(`questions`, JSON.stringify(questions));
  }, [questions, value]);

  return [value, setValue];
};