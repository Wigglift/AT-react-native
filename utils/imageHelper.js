const DEFAULT_AVATAR = require('../assets/default-avatar.png'); 

export const getAvatarSource = (imageString) => {
  if (!imageString) return DEFAULT_AVATAR;

  if (imageString.startsWith('http')) {
    return { uri: imageString };
  }

  if (imageString.startsWith('data:image')) {
    return { uri: imageString };
  }

  return { uri: `data:image/png;base64,${imageString}` };
};

export const formatUserName = (name) => {
  if (!name) return "Usuário";
  return name.length > 15 ? `${name.substring(0, 15)}...` : name;
};