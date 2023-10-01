export default function Example({ item, index }) {
  return (
    <>
      <div key={index} class="max-w-full rounded overflow-hidden border">
        <img class="w-full" src={item.gallery[0]} alt={index} />
        <div class="p-4">
          <p className="text-xl font-bold text-gray-900 pb-1">${item.price}</p>
          <div class="text-base pb-1">
            <a href={`/${item.category.value}/${item.slug}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {item.yearModel} {item.brand.label}
            </a>
          </div>
          <p className="text-base font-medium text-gray-400">
            {item.state.value}
          </p>
        </div>
      </div>
    </>
  );
}
