const shuffle = (values) => [...values].sort(() => Math.random() - 0.5);

export { shuffle };