import { getProfessionalPropertyImage } from "../utils/propertyImages";

const PropertyCard = ({ property, index }) => {
  const professionalImage = getProfessionalPropertyImage(property, index);

  const image =
    property.imageUrls && property.imageUrls.length > 0
      ? property.imageUrls[0]
      : professionalImage;

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden border border-slate-200">
      <div className="relative">
        <img
          src={image}
          alt={property.title}
          onError={(event) => {
            event.currentTarget.src = professionalImage;
          }}
          className="w-full h-56 object-cover bg-slate-200 group-hover:scale-105 transition duration-500"
        />

        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 text-sm font-semibold px-3 py-1 rounded-full">
          {property.propertyType}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-slate-950 mb-2 leading-snug">
          {property.title}
        </h3>

        <p className="text-slate-600 text-sm mb-4 leading-6">
          {property.description}
        </p>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-slate-800 font-semibold">
              {property.city}, {property.country}
            </p>

            {property.author && (
              <p className="text-xs text-slate-500 mt-1">
                Listed by{" "}
                {property.author.profileName || property.author.username}
              </p>
            )}
          </div>

          <p className="text-blue-700 text-lg font-extrabold whitespace-nowrap">
            FCFA {Number(property.price).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
