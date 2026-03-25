import { useState, useRef, useCallback, useEffect } from 'react';
import {
  HOLES, GAME_DURATION, MOLES, BOMB,
  BOMB_CHANCE, SCORE_HIT, SCORE_BOMB, DIFF_SETTINGS,
} from '../constants';

/**
 * Creates an initial array of hole state objects.
 */
function makeHoles() {
  return Array.from({ length: HOLES }, () => ({
    active: false,
    isBomb: false,
    emoji:  MOLES[0],
    state:  'idle', // 'idle' | 'up' | 'hit' | 'explode'
  }));
}

/**
 * useGame — encapsulates all Whack-a-Mole game state and logic.
 */
export function useGame() {
  const [holes,    setHoles]    = useState(makeHoles);
  const [score,    setScore]    = useState(0);
  const [best,     setBest]     = useState(0);
  const [missed,   setMissed]   = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [running,  setRunning]  = useState(false);
  const [diff,     setDiff]     = useState('medium');
  const [message,  setMessage]  = useState({ text: 'Press Start to play!', type: '' });
  const [scorePops, setScorePops] = useState([]);

  // Mutable refs to avoid stale closures in timers
  const runningRef    = useRef(false);
  const scoreRef      = useRef(0);
  const missedRef     = useRef(0);
  const holesRef      = useRef(makeHoles());
  const activeRef     = useRef(new Set());
  const moleTimers    = useRef([]);
  const spawnTimeout  = useRef(null);
  const countdownRef  = useRef(null);
  const diffRef       = useRef(diff);

  // Keep diffRef in sync
  useEffect(() => { diffRef.current = diff; }, [diff]);

  // ── Helpers ──────────────────────────────────────────────────────────────

  const syncHoles = useCallback(() => {
    setHoles([...holesRef.current]);
  }, []);

  const addPop = useCallback((x, y, text, color) => {
    const id = Date.now() + Math.random();
    setScorePops(prev => [...prev, { id, x, y, text, color }]);
    setTimeout(() => {
      setScorePops(prev => prev.filter(p => p.id !== id));
    }, 850);
  }, []);

  const showMsg = useCallback((text, type = '') => {
    setMessage({ text, type });
  }, []);

  // ── Core game actions ────────────────────────────────────────────────────

  const showMole = useCallback(() => {
    if (!runningRef.current) return;

    const available = holesRef.current
      .map((_, i) => i)
      .filter(i => !activeRef.current.has(i));

    if (available.length === 0) return;

    const idx    = available[Math.floor(Math.random() * available.length)];
    const isBomb = Math.random() < BOMB_CHANCE;
    const emoji  = isBomb ? BOMB : MOLES[Math.floor(Math.random() * MOLES.length)];
    const { showTime } = DIFF_SETTINGS[diffRef.current];

    holesRef.current[idx] = { active: true, isBomb, emoji, state: 'up' };
    activeRef.current.add(idx);
    syncHoles();

    const t = setTimeout(() => {
      if (!holesRef.current[idx].active) return;
      holesRef.current[idx] = { active: false, isBomb: false, emoji: MOLES[0], state: 'idle' };
      activeRef.current.delete(idx);
      syncHoles();

      if (!isBomb && runningRef.current) {
        missedRef.current += 1;
        setMissed(missedRef.current);
        showMsg('Missed! 😅', 'bad');
      }
    }, showTime);

    moleTimers.current.push(t);
  }, [syncHoles, showMsg]);

  const scheduleMole = useCallback(() => {
    if (!runningRef.current) return;
    const { interval } = DIFF_SETTINGS[diffRef.current];
    spawnTimeout.current = setTimeout(() => {
      showMole();
      scheduleMole();
    }, interval + Math.random() * 200);
  }, [showMole]);

  const whack = useCallback((idx, rect) => {
    if (!runningRef.current) return;
    const hole = holesRef.current[idx];
    if (!hole.active) return;

    activeRef.current.delete(idx);

    if (hole.isBomb) {
      scoreRef.current = Math.max(0, scoreRef.current + SCORE_BOMB);
      holesRef.current[idx] = { ...hole, active: false, state: 'explode' };
      syncHoles();
      setTimeout(() => {
        holesRef.current[idx] = { active: false, isBomb: false, emoji: MOLES[0], state: 'idle' };
        syncHoles();
      }, 400);
      showMsg('Ouch! Bomb! -5 💥', 'bad');
      if (rect) addPop(rect.left + rect.width / 2 - 20, rect.top - 10, `${SCORE_BOMB}`, '#ff6b6b');
    } else {
      scoreRef.current += SCORE_HIT;
      holesRef.current[idx] = { ...hole, active: false, state: 'hit' };
      syncHoles();
      setTimeout(() => {
        holesRef.current[idx] = { active: false, isBomb: false, emoji: MOLES[0], state: 'idle' };
        syncHoles();
      }, 300);
      showMsg('+10! Nice hit! 🎯', 'good');
      if (rect) addPop(rect.left + rect.width / 2 - 20, rect.top - 10, `+${SCORE_HIT}`, '#4ecb71');
    }

    setScore(scoreRef.current);
  }, [syncHoles, showMsg, addPop]);

  const endGame = useCallback(() => {
    runningRef.current = false;
    setRunning(false);
    clearInterval(countdownRef.current);
    clearTimeout(spawnTimeout.current);
    moleTimers.current.forEach(clearTimeout);
    moleTimers.current = [];

    holesRef.current = makeHoles();
    activeRef.current.clear();
    syncHoles();

    const finalScore = scoreRef.current;
    setBest(prev => Math.max(prev, finalScore));
    setTimeLeft(0);
    showMsg('', '');
  }, [syncHoles, showMsg]);

  const startGame = useCallback(() => {
    // Reset state
    scoreRef.current  = 0;
    missedRef.current = 0;
    runningRef.current = true;

    clearInterval(countdownRef.current);
    clearTimeout(spawnTimeout.current);
    moleTimers.current.forEach(clearTimeout);
    moleTimers.current = [];
    activeRef.current.clear();

    holesRef.current = makeHoles();

    setScore(0);
    setMissed(0);
    setTimeLeft(GAME_DURATION);
    setRunning(true);
    syncHoles();
    showMsg('Hit the moles! 🔨', '');

    // Countdown
    let tl = GAME_DURATION;
    countdownRef.current = setInterval(() => {
      tl -= 1;
      setTimeLeft(tl);
      if (tl <= 0) {
        clearInterval(countdownRef.current);
        endGame();
      }
    }, 1000);

    scheduleMole();
  }, [syncHoles, showMsg, scheduleMole, endGame]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearInterval(countdownRef.current);
      clearTimeout(spawnTimeout.current);
      moleTimers.current.forEach(clearTimeout);
    };
  }, []);

  return {
    holes, score, best, missed, timeLeft,
    running, diff, setDiff,
    message, scorePops,
    startGame, whack,
  };
}
