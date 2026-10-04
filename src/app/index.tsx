import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

function PracticeTracker({
  solved,
  onSolve,
  onReset,
}: {
  solved: number;
  onSolve: () => void;
  onReset: () => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.solved}>Solved: {solved}</Text>

      <View style={styles.buttonRow}>
        <Pressable style={styles.button} onPress={onSolve}>
          <Text style={styles.buttonText}>Solve +1</Text>
        </Pressable>

        <Pressable style={styles.resetButton} onPress={onReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>

      {solved >= 5 && (
        <Text style={styles.greatJob}>Great job!</Text>
      )}
    </View>
  );
}

function useStopwatch(isRunning: boolean) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return seconds;
}

function Stopwatch({
  seconds,
  isRunning,
}: {
  seconds: number;
  isRunning: boolean;
}) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const time = `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds
  ).padStart(2, '0')}`;

  return (
    <View style={styles.card}>
      <Text style={styles.timer}>{time}</Text>

      <Text style={styles.status}>
        {isRunning ? 'Running...' : 'Paused'}
      </Text>
    </View>
  );
}

export default function LabScreen() {
  const [solved, setSolved] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const seconds = useStopwatch(isRunning);

  const handleSolve = () => {
    setSolved((s) => s + 1);
  };

  const handleReset = () => {
    setSolved(0);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lab Practice Tracker</Text>

      <PracticeTracker
        solved={solved}
        onSolve={handleSolve}
        onReset={handleReset}
      />

      <Stopwatch
        seconds={seconds}
        isRunning={isRunning}
      />

      <View style={styles.buttonRow}>
        <Pressable style={styles.startButton} onPress={handleStart}>
          <Text style={styles.buttonText}>Start</Text>
        </Pressable>

        <Pressable style={styles.stopButton} onPress={handleStop}>
          <Text style={styles.buttonText}>Stop</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  card: {
    width: '100%',
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  solved: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  timer: {
    fontSize: 45,
    fontWeight: 'bold',
  },

  status: {
    fontSize: 20,
    marginTop: 5,
  },

  greatJob: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },

  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  resetButton: {
    backgroundColor: '#777',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  startButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  stopButton: {
    backgroundColor: '#F44336',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});