import { colorTypePokemon } from "../constantes/colorPokemon";

export const getColorByType = (type) => {
  const typeObj = colorTypePokemon.find((item) => item.type === type);
  return typeObj ? typeObj.color : "#FFFFFF";
};
