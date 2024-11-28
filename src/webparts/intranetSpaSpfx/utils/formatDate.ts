export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);

  if (isNaN(date.getTime())) {
    throw new Error("Data inválida fornecida.");
  }
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const dia = date.getDate();
  const mes = meses[date.getMonth()];
  const hora = String(date.getHours()).padStart(2, "0");
  const minutos = String(date.getMinutes()).padStart(2, "0");

  return `${dia} de ${mes} às ${hora}:${minutos}`;
};
