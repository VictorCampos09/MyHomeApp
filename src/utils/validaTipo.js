const validaTipo = (variavel, tipo) => {
  if (!tipo || typeof tipo !== 'string') {
    return false;
  }
  const tipoVar = typeof variavel;

  if (!variavel || tipoVar !== tipo) {
    return false;
  }
  return true;
};

export default validaTipo;
