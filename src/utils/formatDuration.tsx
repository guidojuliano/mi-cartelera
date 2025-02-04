const parseDuracion = (duracion: string) => {
  const minutos = parseInt(duracion, 10);
  if (isNaN(minutos)) return "";

  const horas = Math.floor(minutos / 60);
  const mins = minutos % 60;

  return `${horas}:${mins.toString().padStart(2, "0")} hs`;
};

export default parseDuracion;
