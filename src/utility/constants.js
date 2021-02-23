export const DIFFICULTY_LEVEL = [
  { value: "easy", label: "EASY" },
  { value: "medium", label: "MEDIUM" },
  { value: "hard", label: "HARD" },
];

export const DIFFICULTY_LEVELS = {
    EASY : 'easy',
    MEDIUM : 'medium',
    HARD : 'hard'
};

export const difficulties = [
  {label:"Easy", value:1},
  {label:"Medium", value:1.5},
  {label:"Hard", value:2}
]
  

export const DIFFICULTY_CONFIG = {
    [DIFFICULTY_LEVELS.EASY] : {value: 'easy', label: 'EASY', factor : 1},
    [DIFFICULTY_LEVELS.MEDIUM] : {value: 'medium', label: 'MEDIUM', factor : 1.5},
    [DIFFICULTY_LEVELS.HARD] : {value: 'hard', label: 'HARD', factor : 2}
};

export const PLAYER_NAME_ERROR = "PLEASE ENTER YOUR NAME.";

export const DIFFICULTY_FACTOR_INCREASE_RATE = 0.01;