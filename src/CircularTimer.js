// Este componente dibuja un círculo que se va "consumiendo" con el tiempo.
// Usamos react-native-svg para dibujar:
//   - un círculo gris de fondo
//   - un círculo de color encima que va desapareciendo (el progreso)
// Dentro del círculo mostramos los segundos restantes.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { COLORS } from './constants/colors';

export default function CircularTimer({ timeLeft, total, size = 120, strokeWidth = 10 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = Math.max(timeLeft, 0) / total;
  const strokeDashoffset = circumference * (1 - progress);

  // Cambiamos el color según el tiempo que queda (verde -> naranja -> rojo).
  let color = COLORS.success;
  if (timeLeft <= 3) color = COLORS.error;
  else if (timeLeft <= 6) color = COLORS.warning;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        {/* Círculo de fondo */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={COLORS.border}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Círculo de progreso (se va consumiendo) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      {/* Número de segundos, posicionado en el centro del círculo */}
      <View style={styles.center}>
        <Text style={[styles.seconds, { color }]}>
          {Math.max(Math.ceil(timeLeft), 0)}
        </Text>
        <Text style={styles.label}>seg</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seconds: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});
