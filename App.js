// App.js es el punto de entrada de la aplicación.
// Aquí está toda la lógica de la trivia:
//   - mostrar una pregunta a la vez
//   - un temporizador de 12 segundos por pregunta (círculo que se consume)
//   - 4 opciones para responder
//   - contar los aciertos y mostrar el resultado final

import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { QUESTIONS } from './src/questions';
import CircularTimer from './src/CircularTimer';

const TIME_PER_QUESTION = 12; // segundos por pregunta
const UPDATE_INTERVAL = 0.1; // actualizar cada 100ms para animación fluida

export default function App() {
  // Índice de la pregunta actual (0 a 10).
  const [current, setCurrent] = useState(0);
  // Opción que el usuario tocó (null si todavía no responde).
  const [selected, setSelected] = useState(null);
  // Cuántas respuestas correctas lleva.
  const [score, setScore] = useState(0);
  // Segundos que quedan en el temporizador (con decimales para animación fluida).
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  // Si ya terminó toda la trivia.
  const [finished, setFinished] = useState(false);

  // Guardamos el id del intervalo para poder detenerlo.
  const timerRef = useRef(null);

  const question = QUESTIONS[current];

  // Este efecto arranca el temporizador cada vez que cambia la pregunta.
  useEffect(() => {
    // No corras el temporizador si ya terminó o si el usuario ya respondió.
    if (finished || selected !== null) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= UPDATE_INTERVAL) {
          clearInterval(timerRef.current);
          // Se acabó el tiempo: marcamos como respuesta incorrecta (-1) y avanzamos.
          handleTimeout();
          return 0;
        }
        return prev - UPDATE_INTERVAL;
      });
    }, 100); // 100ms = 0.1s para animación fluida

    // Limpieza: detenemos el temporizador cuando el efecto se vuelve a ejecutar.
    return () => clearInterval(timerRef.current);
  }, [current, selected, finished]);

  // Cuando se acaba el tiempo sin responder.
  const handleTimeout = () => {
    setSelected(-1); // -1 significa "sin respuesta / tiempo agotado"
    setTimeout(goNext, 1200);
  };

  // Cuando el usuario toca una opción.
  const handleAnswer = (index) => {
    if (selected !== null) return; // evita responder dos veces
    clearInterval(timerRef.current);
    setSelected(index);
    if (index === question.answer) {
      setScore((s) => s + 1);
    }
    setTimeout(goNext, 1200); // esperamos un momento para ver el resultado
  };

  // Avanza a la siguiente pregunta o termina la trivia.
  const goNext = () => {
    if (current + 1 >= QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setTimeLeft(TIME_PER_QUESTION);
    }
  };

  // Reinicia todo para volver a jugar.
  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setTimeLeft(TIME_PER_QUESTION);
    setFinished(false);
  };

  // Decide el color de cada opción según el estado de la respuesta.
  const getOptionStyle = (index) => {
    if (selected === null) return styles.option; // aún no responde
    if (index === question.answer) return [styles.option, styles.correct]; // la correcta
    if (index === selected) return [styles.option, styles.wrong]; // la que eligió (mal)
    return [styles.option, styles.dimmed]; // las demás
  };

  // ---------- Pantalla de resultados ----------
  if (finished) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>¡Terminaste!</Text>
          <Text style={styles.resultScore}>
            {score} / {QUESTIONS.length}
          </Text>
          <Text style={styles.resultMsg}>
            {score >= 9
              ? '¡Excelente! Sabes mucho de Microsoft.'
              : score >= 6
              ? '¡Bien! Pero puedes mejorar.'
              : 'Sigue practicando 💪'}
          </Text>
          <TouchableOpacity style={styles.restartBtn} onPress={restart}>
            <Text style={styles.restartText}>Jugar de nuevo</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ---------- Pantalla de la pregunta ----------
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Encabezado: número de pregunta y temporizador */}
      <View style={styles.header}>
        <Text style={styles.progress}>
          Pregunta {current + 1} de {QUESTIONS.length}
        </Text>
        <CircularTimer timeLeft={timeLeft} total={TIME_PER_QUESTION} />
      </View>

      {/* Texto de la pregunta */}
      <View style={styles.questionBox}>
        <Text style={styles.questionText}>{question.question}</Text>
      </View>

      {/* Las 4 opciones */}
      <View style={styles.options}>
        {question.options.map((opt, index) => (
          <TouchableOpacity
            key={index}
            style={getOptionStyle(index)}
            onPress={() => handleAnswer(index)}
            activeOpacity={0.8}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1f44',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  progress: {
    color: '#94a3b8',
    fontSize: 16,
    marginBottom: 16,
  },
  questionBox: {
    marginVertical: 24,
  },
  questionText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  options: {
    marginTop: 10,
  },
  option: {
    backgroundColor: '#13294b',
    borderWidth: 1,
    borderColor: '#1e3a5f',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  optionText: {
    color: '#ffffff',
    fontSize: 17,
    textAlign: 'center',
  },
  correct: {
    backgroundColor: '#166534',
    borderColor: '#22c55e',
  },
  wrong: {
    backgroundColor: '#7f1d1d',
    borderColor: '#ef4444',
  },
  dimmed: {
    opacity: 0.5,
  },
  resultBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  resultScore: {
    color: '#22c55e',
    fontSize: 56,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  resultMsg: {
    color: '#94a3b8',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
  },
  restartBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  restartText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
