import React, { useState } from 'react'

import { TASKS } from './constants'

import './App.css'

const totalLength = TASKS.map(it => it.questions).flat().length
const emptyArray = Array.from(Array(totalLength))

function App() {
  const [answers, setAnswers] = useState<Array<any>>(emptyArray)
  const [isAnswersVisible, setIsAnswersVisible] = useState<boolean>(false)
  const [isCheckClicked, setIsCheckClick] = useState<boolean>(false)

  function handleSetChoice(e: any, index: number) {
    const newAnswers = [...answers]
    newAnswers[index] = e.target.value

    setAnswers(newAnswers)
  }

  function handleCheckAnswers() {
    if (checkIfAllSelected()) {
      setIsAnswersVisible(true)
    } else {
      setIsCheckClick(true)
      alert('Please answer all questions')
    }

  }

  function handleRestart() {
    setAnswers(emptyArray)
    setIsAnswersVisible(false)
    setIsCheckClick(false)
  }

  function checkIfAllSelected() {
    return !answers.some(it => !it)
  }

  return (
    <div className="container">
      <div className="header">
        <div>
          <a
            className="link"
            href="https://engblog.ru/comparison-of-adjectives#:~:text=%D0%A1%D1%80%D0%B0%D0%B2%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F%20%D1%81%D1%82%D0%B5%D0%BF%D0%B5%D0%BD%D1%8C%20%D0%BF%D1%80%D0%B8%D0%BB%D0%B0%D0%B3%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D1%85%20%D0%B2%20%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B9%D1%81%D0%BA%D0%BE%D0%BC%20%D1%8F%D0%B7%D1%8B%D0%BA%D0%B5.%20Comparative%20degree"
            target="_blank"
          >
            Comparative degree
          </a>

          <a
            className="link"
            href="https://engblog.ru/comparison-of-adjectives#:~:text=%D0%9F%D1%80%D0%B5%D0%B2%D0%BE%D1%81%D1%85%D0%BE%D0%B4%D0%BD%D0%B0%D1%8F%20%D1%81%D1%82%D0%B5%D0%BF%D0%B5%D0%BD%D1%8C%20%D0%BF%D1%80%D0%B8%D0%BB%D0%B0%D0%B3%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D1%85%20%D0%B2%20%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B9%D1%81%D0%BA%D0%BE%D0%BC%20%D1%8F%D0%B7%D1%8B%D0%BA%D0%B5.%20Superlative%20degree"
            target="_blank"
          >
            Superlative degree
          </a>

          <a
            className="link"
            href="https://engblog.ru/comparison-of-adjectives#:~:text=%D0%9F%D1%80%D0%B8%D0%BB%D0%B0%D0%B3%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%2D%D0%B8%D1%81%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%B8%D1%8F"
            target="_blank"
          >
            Exceptions
          </a>
        </div>

        {!isAnswersVisible ? (
          <button
            className="button"
            onClick={handleCheckAnswers}
          >
            Check Answers
          </button>
        ) : (
          <button
            className="button"
            onClick={handleRestart}
          >
            Restart
          </button>
        )}

      </div>

      {TASKS.map((task, taskIndex) => {
        let startsFrom = 0
        if (taskIndex !== 0) {
          startsFrom = TASKS[taskIndex - 1].questions.length
        }

        return (
          <div key={`task-${taskIndex}`} className="content-container">
            <span className="task-title">
              {task.title}
            </span>

            <div className="task-container">
              {task.questions.map((question, questionIndex) => (
                <div key={`task-${taskIndex}-question-${questionIndex}`}>
                  {isCheckClicked && !answers[startsFrom + questionIndex] ? (
                    <p className="question-text question-text--highlighted">
                      {questionIndex + 1}. {question.text}
                    </p>
                  ) : (
                    <p className="question-text">
                      {questionIndex + 1}. {question.text}
                    </p>
                  )}

                  {question.choices.map((choice, choiceIndex) => (
                    <div key={`task-${taskIndex}-question-${questionIndex}-choice-${choiceIndex}`}>
                      <input
                        type="radio"
                        value={choice}
                        checked={choice === answers[startsFrom + questionIndex]}
                        // @ts-ignore
                        onChange={e => !isAnswersVisible ? handleSetChoice(e, startsFrom + questionIndex) : () => {}}
                      />
                      <span className="question-choice">{choice}</span>
                    </div>
                  ))}

                  {isAnswersVisible && (
                    <>
                      {answers[startsFrom + questionIndex] === question.rightAnswer ? (
                        <p>Ura</p>
                      ) : (
                        <p>Ti loh</p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default App;
