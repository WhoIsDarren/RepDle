const exercises = {
    'Barbell Bench Press': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Chest',
        'Isolation or Compound': 'Compound',
        'Popularity': '4/4',
        'Motion 💵': 'Push'
    },
    'Squat': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Legs',
        'Isolation or Compound': 'Compound',
        'Popularity': '4/4',
        'Motion 💵': 'Push'
    },
    'Deadlift': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Back',
        'Isolation or Compound': 'Compound',
        'Popularity': '4/4',
        'Motion 💵': 'Pull'
    },
    'Overhead Press': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Shoulders',
        'Isolation or Compound': 'Compound',
        'Popularity': '3/4',
        'Motion 💵': 'Push'
    },
    'Pull-up': {
        'Equipment Used': 'Bodyweight',
        'MAIN Muscle Group': 'Back',
        'Isolation or Compound': 'Compound',
        'Popularity': '4/4',
        'Motion 💵': 'Pull'
    },
    'Dumbbell Row': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Back',
        'Isolation or Compound': 'Compound',
        'Popularity': '3/4',
        'Motion 💵': 'Pull'
    },
    'Leg Press': {
        'Equipment Used': 'Machine',
        'MAIN Muscle Group': 'Legs',
        'Isolation or Compound': 'Compound',
        'Popularity': '3/4',
        'Motion 💵': 'Push'
    },
    'Lat Pulldown': {
        'Equipment Used': 'Cable',
        'MAIN Muscle Group': 'Back',
        'Isolation or Compound': 'Compound',
        'Popularity': '4/4',
        'Motion 💵': 'Pull'
    },
    'Dumbbell Bicep Curl': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Arms',
        'Isolation or Compound': 'Isolation',
        'Popularity': '4/4',
        'Motion 💵': 'Pull'
    },
    'Tricep Pushdown': {
        'Equipment Used': 'Cable',
        'MAIN Muscle Group': 'Arms',
        'Isolation or Compound': 'Isolation',
        'Popularity': '3/4',
        'Motion 💵': 'Push'
    },
    'Leg Extension': {
        'Equipment Used': 'Machine',
        'MAIN Muscle Group': 'Legs',
        'Isolation or Compound': 'Isolation',
        'Popularity': '2/4',
        'Motion 💵': 'Push'
    },
    'Leg Curl': {
        'Equipment Used': 'Machine',
        'MAIN Muscle Group': 'Legs',
        'Isolation or Compound': 'Isolation',
        'Popularity': '2/4',
        'Motion 💵': 'Pull'
    },
    'Dumbbell Flyes': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Chest',
        'Isolation or Compound': 'Isolation',
        'Popularity': '2/4',
        'Motion 💵': 'Push'
    },
    'Barbell Row': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Back',
        'Isolation or Compound': 'Compound',
        'Popularity': '3/4',
        'Motion 💵': 'Pull'
    },
    'Dips': {
        'Equipment Used': 'Bodyweight',
        'MAIN Muscle Group': 'Chest',
        'Isolation or Compound': 'Compound',
        'Popularity': '3/4',
        'Motion 💵': 'Push'
    },
    'Face Pull': {
        'Equipment Used': 'Cable',
        'MAIN Muscle Group': 'Shoulders',
        'Isolation or Compound': 'Compound',
        'Popularity': '2/4',
        'Motion 💵': 'Pull'
    },
    'Calf Raise': {
        'Equipment Used': 'Machine',
        'MAIN Muscle Group': 'Legs',
        'Isolation or Compound': 'Isolation',
        'Popularity': '2/4',
        'Motion 💵': 'Push'
    },
    'Barbell Curl': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Arms',
        'Isolation or Compound': 'Isolation',
        'Popularity': '3/4',
        'Motion 💵': 'Pull'
    },
    'Skull Crushers': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Arms',
        'Isolation or Compound': 'Isolation',
        'Popularity': '2/4',
        'Motion 💵': 'Push'
    },
    'Romanian Deadlift': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Legs',
        'Isolation or Compound': 'Compound',
        'Popularity': '3/4',
        'Motion 💵': 'Pull'
    },
    'Incline Bench Press': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Chest',
        'Isolation or Compound': 'Compound',
        'Popularity': '3/4',
        'Motion 💵': 'Push'
    },
    'Lateral Raise': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Shoulders',
        'Isolation or Compound': 'Isolation',
        'Popularity': '3/4',
        'Motion 💵': 'Push'
    },
    'Seated Cable Row': {
        'Equipment Used': 'Cable',
        'MAIN Muscle Group': 'Back',
        'Isolation or Compound': 'Compound',
        'Popularity': '3/4',
        'Motion 💵': 'Pull'
    },
    'Hammer Curl': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Arms',
        'Isolation or Compound': 'Isolation',
        'Popularity': '2/4',
        'Motion 💵': 'Pull'
    },
    'Decline Bench Press': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Chest',
        'Isolation or Compound': 'Compound',
        'Popularity': '2/4',
        'Motion 💵': 'Push'
    },
    'Front Squat': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Legs',
        'Isolation or Compound': 'Compound',
        'Popularity': '2/4',
        'Motion 💵': 'Push'
    },
    'Reverse Flyes': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Shoulders',
        'Isolation or Compound': 'Isolation',
        'Popularity': '2/4',
        'Motion 💵': 'Pull'
    },
    'T-Bar Row': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Back',
        'Isolation or Compound': 'Compound',
        'Popularity': '2/4',
        'Motion 💵': 'Pull'
    },
    'Hack Squat': {
        'Equipment Used': 'Machine',
        'MAIN Muscle Group': 'Legs',
        'Isolation or Compound': 'Compound',
        'Popularity': '2/4',
        'Motion 💵': 'Push'
    },
    'Cable Crossover': {
        'Equipment Used': 'Cable',
        'MAIN Muscle Group': 'Chest',
        'Isolation or Compound': 'Isolation',
        'Popularity': '2/4',
        'Motion 💵': 'Push'
    },
    'Pendlay Row': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Back',
        'Isolation or Compound': 'Compound',
        'Popularity': '2/4',
        'Motion 💵': 'Pull'
    },
    'Bulgarian Split Squat': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Legs',
        'Isolation or Compound': 'Compound',
        'Popularity': '3/4',
        'Motion 💵': 'Push'
    },
    'Arnold Press': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Shoulders',
        'Isolation or Compound': 'Compound',
        'Popularity': '2/4',
        'Motion 💵': 'Push'
    },
    'Preacher Curl': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Arms',
        'Isolation or Compound': 'Isolation',
        'Popularity': '3/4',
        'Motion 💵': 'Pull'
    },
    'Tricep Dips': {
        'Equipment Used': 'Bodyweight',
        'MAIN Muscle Group': 'Arms',
        'Isolation or Compound': 'Compound',
        'Popularity': '3/4',
        'Motion 💵': 'Push'
    },
    'Good Morning': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Back',
        'Isolation or Compound': 'Compound',
        'Popularity': '2/4',
        'Motion 💵': 'Pull'
    },
    'Leg Press Calf Raise': {
        'Equipment Used': 'Machine',
        'MAIN Muscle Group': 'Legs',
        'Isolation or Compound': 'Isolation',
        'Popularity': '2/4',
        'Motion 💵': 'Push'
    },
    'Seated Shoulder Press': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Shoulders',
        'Isolation or Compound': 'Compound',
        'Popularity': '3/4',
        'Motion 💵': 'Push'
    },
    'Concentration Curl': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Arms',
        'Isolation or Compound': 'Isolation',
        'Popularity': '2/4',
        'Motion 💵': 'Pull'
    },
    'Chest Dip': {
        'Equipment Used': 'Bodyweight',
        'MAIN Muscle Group': 'Chest',
        'Isolation or Compound': 'Compound',
        'Popularity': '3/4',
        'Motion 💵': 'Push'
    },
    'Sumo Deadlift': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Legs',
        'Isolation or Compound': 'Compound',
        'Popularity': '3/4',
        'Motion 💵': 'Pull'
    },
    'Upright Row': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Shoulders',
        'Isolation or Compound': 'Compound',
        'Popularity': '2/4',
        'Motion 💵': 'Pull'
    },
    'Seated Leg Curl': {
        'Equipment Used': 'Machine',
        'MAIN Muscle Group': 'Legs',
        'Isolation or Compound': 'Isolation',
        'Popularity': '2/4',
        'Motion 💵': 'Pull'
    },
    'Close-Grip Bench Press': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Arms',
        'Isolation or Compound': 'Compound',
        'Popularity': '3/4',
        'Motion 💵': 'Push'
    },
    'Cable Crunch': {
        'Equipment Used': 'Cable',
        'MAIN Muscle Group': 'Core',
        'Isolation or Compound': 'Isolation',
        'Popularity': '3/4',
        'Motion 💵': 'Pull'
    },
    'Reverse Grip Lat Pulldown': {
        'Equipment Used': 'Cable',
        'MAIN Muscle Group': 'Back',
        'Isolation or Compound': 'Compound',
        'Popularity': '2/4',
        'Motion 💵': 'Pull'
    },
    'Dumbbell Pullover': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Chest',
        'Isolation or Compound': 'Compound',
        'Popularity': '2/4',
        'Motion 💵': 'Pull'
    },
    'Glute Bridge': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Legs',
        'Isolation or Compound': 'Isolation',
        'Popularity': '3/4',
        'Motion 💵': 'Push'
    },
    'Wrist Curl': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Arms',
        'Isolation or Compound': 'Isolation',
        'Popularity': '1/4',
        'Motion 💵': 'Pull'
    },
    'Reverse Wrist Curl': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Arms',
        'Isolation or Compound': 'Isolation',
        'Popularity': '1/4',
        'Motion 💵': 'Push'
    },
    'Machine Chest Press': {
        'Equipment Used': 'Machine',
        'MAIN Muscle Group': 'Chest',
        'Isolation or Compound': 'Compound',
        'Popularity': '3/4',
        'Motion 💵': 'Push'
    },
    'Goblet Squat': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Legs',
        'Isolation or Compound': 'Compound',
        'Popularity': '3/4',
        'Motion 💵': 'Push'
    },
    'Dumbbell Shrug': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Shoulders',
        'Isolation or Compound': 'Isolation',
        'Popularity': '2/4',
        'Motion 💵': 'Pull'
    },
    'Single-Leg Romanian Deadlift': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Legs',
        'Isolation or Compound': 'Compound',
        'Popularity': '2/4',
        'Motion 💵': 'Pull'
    },
    'Dumbbell Bench Press': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Chest',
        'Isolation or Compound': 'Compound',
        'Popularity': '4/4',
        'Motion 💵': 'Push'
    },
    'Seated Calf Raise': {
        'Equipment Used': 'Machine',
        'MAIN Muscle Group': 'Legs',
        'Isolation or Compound': 'Isolation',
        'Popularity': '2/4',
        'Motion 💵': 'Push'
    },
    'Cable Tricep Extension': {
        'Equipment Used': 'Cable',
        'MAIN Muscle Group': 'Arms',
        'Isolation or Compound': 'Isolation',
        'Popularity': '3/4',
        'Motion 💵': 'Push'
    },
    'Decline Sit-Up': {
        'Equipment Used': 'Bodyweight',
        'MAIN Muscle Group': 'Core',
        'Isolation or Compound': 'Isolation',
        'Popularity': '2/4',
        'Motion 💵': 'Pull'
    },
    'Rack Pull': {
        'Equipment Used': 'Free Weights',
        'MAIN Muscle Group': 'Back',
        'Isolation or Compound': 'Compound',
        'Popularity': '2/4',
        'Motion 💵': 'Pull'
    }
};

export default exercises;