// Aquí guardamos las 11 preguntas de la trivia.
// Cada pregunta tiene:
//   - question: el texto de la pregunta
//   - options: un arreglo de 4 respuestas posibles
//   - answer: el índice (0-3) de la opción correcta dentro de "options"

export const QUESTIONS = [
  {
    question: '¿En qué año fue fundada Microsoft?',
    options: ['1971', '1975', '1980', '1985'],
    answer: 1,
  },
  {
    question: '¿Quiénes fundaron Microsoft?',
    options: [
      'Steve Jobs y Steve Wozniak',
      'Bill Gates y Paul Allen',
      'Larry Page y Sergey Brin',
      'Bill Gates y Steve Ballmer',
    ],
    answer: 1,
  },
  {
    question: '¿Cuál es el símbolo (ticker) de la acción de Microsoft en la bolsa?',
    options: ['MSF', 'MCS', 'MSFT', 'MICR'],
    answer: 2,
  },
  {
    question: '¿En qué bolsa de valores cotiza principalmente Microsoft?',
    options: ['NYSE', 'NASDAQ', 'LSE', 'TSX'],
    answer: 1,
  },
  {
    question: '¿Quién es el CEO de Microsoft desde 2014?',
    options: ['Bill Gates', 'Steve Ballmer', 'Satya Nadella', 'Tim Cook'],
    answer: 2,
  },
  {
    question: '¿Cómo se llama el servicio de nube de Microsoft?',
    options: ['AWS', 'Azure', 'Google Cloud', 'OneCloud'],
    answer: 1,
  },
  {
    question: '¿Cuál de estos productos NO es de Microsoft?',
    options: ['Windows', 'Xbox', 'Photoshop', 'Excel'],
    answer: 2,
  },
  {
    question: '¿Qué empresa compró Microsoft en 2016 por unos 26 mil millones de dólares?',
    options: ['GitHub', 'LinkedIn', 'Skype', 'Nokia'],
    answer: 1,
  },
  {
    question: '¿Qué plataforma de desarrollo compró Microsoft en 2018?',
    options: ['GitLab', 'GitHub', 'Bitbucket', 'SourceForge'],
    answer: 1,
  },
  {
    question: '¿Cómo se llama el asistente / chatbot con IA de Microsoft?',
    options: ['Cortana', 'Copilot', 'Alexa', 'Siri'],
    answer: 1,
  },
  {
    question: '¿En qué año superó Microsoft por primera vez el billón (trillion en inglés) de dólares de valor de mercado?',
    options: ['2015', '2017', '2019', '2021'],
    answer: 2,
  },
];
