const professionalImages = {
  Apartment: [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  ],
  House: [
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
  ],
  Studio: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
  ],
};

const allImages = [
  ...professionalImages.Apartment,
  ...professionalImages.House,
  ...professionalImages.Studio,
];

const getImageIndex = (property, index = 0, imageCount = allImages.length) => {
  const id = property?._id || `${index}`;
  const total = id
    .split("")
    .reduce((sum, character) => sum + character.charCodeAt(0), index);

  return total % imageCount;
};

export const getProfessionalPropertyImage = (property, index = 0) => {
  const typeImages = professionalImages[property?.propertyType] || allImages;
  const imageIndex = getImageIndex(property, index, typeImages.length);

  return typeImages[imageIndex];
};

