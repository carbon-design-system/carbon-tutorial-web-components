const infoCardDetails = [
  {
    strongMsg: 'Open',
    bodyMsg: `It's a distributed effort, guided by the principles of the open-source movement. Carbon's users are also it's makers, and everyone is encouraged to contribute.`,
    pictogramName: 'advocate',
  },
  {
    strongMsg: 'Modular',
    bodyMsg: `Carbon's modularity ensures maximum flexibility in execution. It's components are designed to work seamlessly with each other, in whichever combination suits the needs of the user.`,
    pictogramName: 'accelerating-transformation',
  },
  {
    strongMsg: 'Consistent',
    bodyMsg: `Based on the comprehensive IBM Design Language, every element and component of Carbon was designed from the ground up to work elegantly together to ensure consistent, cohesive user experiences.`,
    pictogramName: 'globe',
  },
];

const updateInfoCard = (here, { strongMsg, bodyMsg, pictogramName }) => {
  const infoCardTemplate = document.querySelector('template#template--info-card');

  if (here && infoCardTemplate) {
    const newInfoCard = infoCardTemplate.content.cloneNode(true);

    const strongEl = newInfoCard.querySelector('.info-card__heading--strong');
    strongEl.innerHTML = strongMsg;

    const infoBodyEl = newInfoCard.querySelector('.info-card__body');
    infoBodyEl.innerHTML = bodyMsg;

    const pictogramEl = newInfoCard.querySelector('.info-card__pictogram');
    pictogramEl.classList.add(`info-card__pictogram--${pictogramName}`);

    here.innerHTML = '';
    here.replaceWith(newInfoCard);
  }
};

const infoCards = document.querySelectorAll('.info-card');
[...infoCards].forEach((infoCard, index) => {
  updateInfoCard(infoCard, infoCardDetails[index]);
});
