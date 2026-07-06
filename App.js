// App.js es el punto de entrada de la aplicación.
// La lógica del juego se delega al hook useGameLogic;
// este archivo se encarga únicamente de la presentación.

import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import CircularTimer from './src/CircularTimer';
import { useGameLogic } from './src/hooks/useGameLogic';
import { COLORS } from './src/constants/colors';
import { TIME_PER_QUESTION } from './src/constants/config';

export default function App() {
  const {
    current,
    selected,
    score,
    timeLeft,
    finished,
    question,
    totalQuestions,
    handleAnswer,
    restart,
  } = useGameLogic();

  // Decide el color de cada opción según el estado de la respuesta.
  const getOptionStyle = (index) => {
    if (selected === null) return styles.option;
    if (index === question.answer) return [styles.option, styles.correct];
    if (index === selected) return [styles.option, styles.wrong];
    return [styles.option, styles.dimmed];
  };

  // ---------- Pantalla de resultados ----------
  if (finished) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>¡Terminaste!</Text>
          <Text style={styles.resultScore}>
            {score} / {totalQuestions}
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
          Pregunta {current + 1} de {totalQuestions}
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
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  progress: {
    color: COLORS.textSecondary,
    fontSize: 16,
    marginBottom: 16,
  },
  questionBox: {
    marginVertical: 24,
  },
  questionText: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  options: {
    marginTop: 10,
  },
  option: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  optionText: {
    color: COLORS.textPrimary,
    fontSize: 17,
    textAlign: 'center',
  },
  correct: {
    backgroundColor: COLORS.successDark,
    borderColor: COLORS.success,
  },
  wrong: {
    backgroundColor: COLORS.errorDark,
    borderColor: COLORS.error,
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
    color: COLORS.textPrimary,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  resultScore: {
    color: COLORS.success,
    fontSize: 56,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  resultMsg: {
    color: COLORS.textSecondary,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
  },
  restartBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  restartText: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
});
