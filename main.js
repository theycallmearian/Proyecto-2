const mobiles = [
  {
    name: 'Apple iPhone 14 Pro',
    price: 1690,
    color: 'black',
    stars: 5,
    reviews: 500,
    seller: 'Apple',
    image:
      'https://www.mobileshoppro.com/cdn/shop/products/Captura_7c16270d-6db3-4280-9f31-4e873c48d295_360x.jpg?v=1671452442'
  },
  {
    name: 'Apple iPhone 14',
    price: 950,
    color: 'red',
    stars: 4,
    reviews: 766,
    seller: 'Apple',
    image:
      'https://www.mobileshoppro.com/cdn/shop/products/Captura_839696d6-c632-4a2e-9d3b-fca9dfad362d_180x.jpg?v=1671456893'
  },

  {
    name: 'Samsung Galaxy A72',
    price: 438,
    color: 'purple',
    stars: 4,
    reviews: 204,
    seller: 'Samsung',
    image:
      'https://www.mobileshoppro.com/cdn/shop/products/1_fb9d8a05-b3db-46b0-a617-0d341ff6b95c_360x.png?v=1618221568'
  },

  {
    name: 'Samsung Galaxy A21S',
    price: 150,
    color: 'blue',
    stars: 2,
    reviews: 134,
    seller: 'Samsung',
    image:
      'https://www.mobileshoppro.com/cdn/shop/products/1_acfc624a-cdaf-4582-be83-b843b0c438db_180x.png?v=1595522169'
  },

  {
    name: 'Xiaomi Mi 8',
    price: 279,
    color: 'black',
    stars: 5,
    reviews: 166,
    seller: 'Xiaomi',
    image:
      'https://www.mobileshoppro.com/cdn/shop/products/1_76e3b44b-962d-4650-a428-844cbf0f373f_360x.jpg?v=1589881439'
  },

  {
    name: 'Xiaomi Redmi Note 9S',
    price: 260,
    color: 'green',
    stars: 3,
    reviews: 60,
    seller: 'Xiaomi',
    image:
      'https://www.mobileshoppro.com/cdn/shop/products/1_c21e8655-fcf1-4468-bf00-bdbd1d0476f3_360x.jpg?v=1589553558'
  },

  {
    name: 'Huawei P40 Lite',
    price: 151,
    color: 'blue',
    stars: 2,
    reviews: 459,
    seller: 'Huawei',
    image:
      'https://www.mobileshoppro.com/cdn/shop/products/2_83e5e445-9cbb-4f6e-80dc-b6c3e6690598_180x.png?v=1593875702'
  },

  {
    name: 'Huawei Y5P',
    price: 89,
    color: 'blue',
    stars: 5,
    reviews: 221,
    seller: 'Huawei',
    image:
      'https://www.mobileshoppro.com/cdn/shop/products/2_ad119897-dee2-4098-89ea-747bc745af81_360x.jpg?v=1592837639'
  },

  {
    name: 'LG K40',
    price: 120,
    color: 'blue',
    stars: 2,
    reviews: 76,
    seller: 'LG',
    image:
      'https://www.mobileshoppro.com/cdn/shop/products/1_b32deb5d-dde7-43c6-8a20-95ee45ed5985_180x.jpg?v=1590690765'
  },
  {
    name: 'Oppo A5',
    price: 139,
    color: 'black',
    stars: 4,
    reviews: 89,
    seller: 'Oppo',
    image:
      'https://www.mobileshoppro.com/cdn/shop/products/1_f2070621-cb13-437a-bec6-ebc36c1bc7eb_180x.jpg?v=1589799053'
  }
]

const SELLERS = []
let SELECTED_SELLER = ''

const fillSellers = (mobiles) => {
  SELLERS.splice(0)
  for (const mobile of mobiles) {
    if (!SELLERS.includes(mobile.seller)) {
      SELLERS.push(mobile.seller)
    }
  }
}

fillSellers(mobiles)

const createSelectSeller = () => {
  const divFiltroVendedor = document.querySelector('.filtro')
  const selectSeller = document.createElement('select')

  const defaultOption = document.createElement('option')
  defaultOption.textContent = 'Selecciona Marca'
  defaultOption.value = ''
  selectSeller.appendChild(defaultOption)

  for (const seller of SELLERS) {
    const option = document.createElement('option')
    option.value = seller
    option.textContent = seller
    selectSeller.appendChild(option)
  }

  divFiltroVendedor.appendChild(selectSeller)

  selectSeller.addEventListener('change', (event) => {
    SELECTED_SELLER = event.target.value
    filtrar()
    removeSuggestedProductsSection()
  })
}

const filtrar = () => {
  const filteredMobiles = SELECTED_SELLER
    ? mobiles.filter((mobile) => mobile.seller === SELECTED_SELLER)
    : mobiles
  printMobiles(filteredMobiles)
}

const printMobiles = (mobiles) => {
  const divMobiles = document.querySelector('#mobiles')
  divMobiles.innerHTML = ''

  if (mobiles.length === 0) {
    const noProductsMessage = document.createElement('p')
    noProductsMessage.textContent = ''
    divMobiles.appendChild(noProductsMessage)
    showSuggestedProducts(divMobiles)
    return
  }

  for (const mobile of mobiles) {
    const divMobile = document.createElement('div')
    const divImg = document.createElement('div')
    const img = document.createElement('img')
    const nombre = document.createElement('h3')
    const precio = document.createElement('p')
    const divEstrellas = document.createElement('div')

    for (let i = 1; i <= 5; i++) {
      const estrella = document.createElement('div')
      estrella.className = 'estrella'
      if (i <= mobile.stars) {
        estrella.classList.add('rellena')
      }
      divEstrellas.appendChild(estrella)
    }

    divMobile.className = 'flexbox'
    divImg.classList.add('imgContainer')
    divEstrellas.classList.add('estrellas', 'flexbox')
    img.src = mobile.image
    nombre.textContent = mobile.name
    precio.textContent = `${mobile.price} €`

    divMobile.appendChild(divImg)
    divImg.appendChild(img)
    divMobile.appendChild(nombre)
    divMobile.appendChild(precio)
    divMobile.appendChild(divEstrellas)
    divMobiles.appendChild(divMobile)
  }
}

createSelectSeller()
printMobiles(mobiles)
let isSuggestedProductsCreated = false

const showSuggestedProducts = (parentElement) => {
  if (!isSuggestedProductsCreated) {
    const titleSection = document.createElement('section')
    titleSection.classList.add('title-container')

    const titleContainer = document.createElement('div')
    titleContainer.classList.add('title-container')

    const title = document.createElement('h4')
    title.textContent = 'Productos no encontrados...'

    const suggestionMessage = document.createElement('h5')
    suggestionMessage.textContent =
      '¡No hemos encontrado lo que buscas, pero descubre nuestros Top Ventas!'

    titleContainer.appendChild(title)
    titleContainer.appendChild(suggestionMessage)

    titleSection.appendChild(titleContainer)

    parentElement.parentNode.insertBefore(
      titleSection,
      parentElement.nextSibling
    )

    const suggestedProductsSection = document.createElement('section')
    suggestedProductsSection.classList.add('suggested-container')

    parentElement.parentNode.insertBefore(
      suggestedProductsSection,
      titleSection.nextSibling
    )

    const topRatedProducts = mobiles.filter((mobile) => mobile.stars === 5)

    for (let i = 0; i < Math.min(topRatedProducts.length, 3); i++) {
      const product = topRatedProducts[i]
      const productContainer = document.createElement('div')
      productContainer.classList.add('suggested-product')

      const productName = document.createElement('h2')
      productName.textContent = product.name

      const productPrice = document.createElement('p')
      productPrice.textContent = `${product.price} €`

      const productImage = document.createElement('img')
      productImage.src = product.image

      productContainer.appendChild(productName)
      productContainer.appendChild(productPrice)
      productContainer.appendChild(productImage)

      suggestedProductsSection.appendChild(productContainer)
    }

    isSuggestedProductsCreated = true
  }
}

const removeSuggestedProductsSection = () => {
  const suggestedSection = document.querySelector('.suggested-container')
  if (suggestedSection) {
    suggestedSection.remove()
  }

  const titleSection = document.querySelector('.title-container')
  if (titleSection) {
    titleSection.remove()
  }

  isSuggestedProductsCreated = false
}

const createPriceFilter = () => {
  const divPriceFilter = document.querySelector('.filtro')
  const inputPrice = document.createElement('input')
  inputPrice.type = 'number'
  inputPrice.placeholder = '< €€€'
  const searchButton = document.createElement('button')
  searchButton.textContent = 'Buscar'

  searchButton.addEventListener('click', () => {
    const price = parseFloat(inputPrice.value)
    if (!isNaN(price)) {
      filterByPrice(price)
    }
  })

  divPriceFilter.appendChild(inputPrice)
  divPriceFilter.appendChild(searchButton)
}

const filterByPrice = (price) => {
  const filteredMobiles = mobiles.filter((mobile) => mobile.price < price)
  printMobiles(filteredMobiles)
}

const clearFilters = () => {
  const inputPrice = document.querySelector('.filtro input[type="number"]')
  const selectSeller = document.querySelector('.filtro select')
  inputPrice.value = ''
  selectSeller.value = ''
  printMobiles(mobiles)
  removeSuggestedProductsSection()
}

const createClearFiltersButton = () => {
  const clearButton = document.createElement('button')
  clearButton.textContent = 'Limpiar Filtros'
  clearButton.addEventListener('click', clearFilters)

  const divFiltro = document.querySelector('.filtro')
  divFiltro.appendChild(clearButton)
}

createPriceFilter()
createClearFiltersButton()
