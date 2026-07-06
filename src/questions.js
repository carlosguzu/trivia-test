// Aquí guardamos las 11 preguntas de la trivia.
// Cada pregunta tiene:
//   - question: el texto de la pregunta
//   - options: un arreglo de 4 respuestas posibles
//   - answer: el índice (0-3) de la opción correcta dentro de "options"

export const QUESTIONS = [
  {
    question: '¿En qué año fue fundada Tesla?',
    options: ['1999', '2003', '2008', '2010'],
    answer: 1,
  },
  {
    question: '¿Quiénes fundaron Tesla?',
    options: [
      'Elon Musk y Peter Thiel',
      'Martin Eberhard y Marc Tarpenning',
      'Larry Page y Sergey Brin',
      'Elon Musk y JB Straubel',
    ],
    answer: 1,
  },
  {
    question: '¿Cuál es el símbolo (ticker) de la acción de Tesla en la bolsa?',
    options: ['TSL', 'TESL', 'TSLA', 'TLSA'],
    answer: 2,
  },
  {
    question: '¿En qué bolsa de valores cotiza principalmente Tesla?',
    options: ['NYSE', 'NASDAQ', 'LSE', 'TSX'],
    answer: 1,
  },
  {
    question: '¿Quién es el CEO de Tesla desde 2008?',
    options: ['Martin Eberhard', 'JB Straubel', 'Elon Musk', 'Jeff Bezos'],
    answer: 2,
  },
  {
    question: '¿Cuál fue el primer auto que produjo Tesla?',
    options: ['Model S', 'Roadster', 'Model 3', 'Cybertruck'],
    answer: 1,
  },
  {
    question: '¿Cuál de estos productos NO es de Tesla?',
    options: ['Model Y', 'Powerwall', 'Bolt', 'Cybertruck'],
    answer: 2,
  },
  {
    question: '¿Qué empresa compró Tesla en 2016 por unos 2.6 mil millones de dólares?',
    options: ['Rivian', 'SolarCity', 'Panasonic', 'Lucid'],
    answer: 1,
  },
  {
    question: '¿En qué estado de EE.UU. se construyó la primera Gigafactory de Tesla?',
    options: ['California', 'Nevada', 'Texas', 'Nueva York'],
    answer: 1,
  },
  {
    question: '¿Cómo se llama el sistema de conducción asistida de Tesla?',
    options: ['Autopilot', 'SuperCruise', 'ProPilot', 'BlueCruise'],
    answer: 0,
  },
  {
    question: '¿En qué año superó Tesla por primera vez el billón (trillion en inglés) de dólares de valor de mercado?',
    options: ['2018', '2020', '2021', '2023'],
    answer: 2,
  },
];
