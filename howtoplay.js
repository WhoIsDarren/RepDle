const HowToPlay = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'button',
      {
        onClick: () => setIsOpen(true),
        className: 'how-to-play-button'
      },
      '?'
    ),
    isOpen && React.createElement(
      'div',
      { className: 'modal-overlay' },
      React.createElement(
        'div',
        { className: 'modal-content' },
        React.createElement(
          'button',
          {
            onClick: () => setIsOpen(false),
            className: 'close-button'
          },
          '×'
        ),
        React.createElement('h2', null, 'How to Play RepDle'),
        React.createElement(
          'ol',
          null,
          React.createElement('li', null, 'Guess the daily exercise in 8 attempts or less.'),
          React.createElement('li', null, 'Each guess must be a valid exercise name.'),
          React.createElement('li', null, 'After each guess, the color of the tiles will change to show how close your guess was.'),
          React.createElement('li', null, 'Green indicates a correct match for that category.'),
          React.createElement('li', null, 'Red indicates an incorrect match.'),
          React.createElement('li', null, 'Try to guess the exercise as quickly as possible to get a better time!')
        )
      )
    )
  );
};

ReactDOM.render(
  React.createElement(HowToPlay),
  document.getElementById('how-to-play-container')
);