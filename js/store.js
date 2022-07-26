if (document.readyState == 'loading') { /*цикл, чтобы наш код запустил функцию во время загрузки страницы и если ДОМ КОНТЕНТ загружен, то запускаем фкнкцию*/
    document.addEventListener('DOMContentLoaded', ready)
} else { /*А это в том случае, если он не загружает страницу, значит загрузилось, значит все равно запускаем*/
    ready()
}

function ready() { /*Это в общем функция, которая подключае все наши кнопки. И чтобы она начала работать ТОЛЬКО после загрузки всего документа, мы пишем цикл (см.Выше)*/
    let removeCartItemButtons = document.getElementsByClassName('btn-danger') /*Переменная теперь хранит все кнопки удаления товара*/
    for (let i = 0; i < removeCartItemButtons.length; i++) { /*цикл нужен для того, чтобы мы могли проходить по всем таким кнопкам */
        let button = removeCartItemButtons[i] /*Эта переменная теперь хранит ту кнопку, которую мы жмакнули*/
        button.addEventListener('click', removeCartItem) /*по клику выполняется функция, которая удаляет итем */
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity-input') /*поле количества*/
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged) /*Добавляем прослушиватель событий, когда в этом инпуте что-то меняется и вызываем функцию*/
    }

    let addToCartButtons = document.getElementsByClassName('shop-item-button') /*Кнопка добавления в корзину*/
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked) /*по клику выполняется функция, которая кладет итем в корзину */
        button.addEventListener('click', round) /*по клику выполняется функция, выкидывает красный кружочек в корзину */
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked) /*Добавляем слушатель событий для кнопки заказать и вызываем при клике функцию, которая удалит товары их корзины после заказа*/
}

function purchaseClicked() { /*Если нажимаем кнопку заказать*/
    alert('Спасибо за заказ!Наш специалист свяжется с Вами в ближайшее время для подтверждения.')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) { /*До тех пор, пока у нашей корзины есть дочерние элементы */
        cartItems.removeChild(cartItems.firstChild) /*Мы будем удалять эти элементы до самого первого элемента*/
    }
    updateCartTotal()
}

function removeCartItem(event) {
    let buttonClicked = event.target /*Определяем ту кнопку, на которую кликнули*/
    buttonClicked.parentElement.parentElement.remove() /*Удаляем родителя (shop item) этой кнопки и он удаляется из строки*/
    updateCartTotal() /*Теперь нам надо поменять ощую стоимость, для этого вызовем функцию изменения цены*/
}

function quantityChanged(event) {/*Проверяем, является ли число в поле ввода количества вообще числом, и положительное ли оно*/
    let input = event.target /*Ловим то, че ввел пользователь*/
    if (isNaN(input.value) || input.value <= 0) { /*Если количество вообще есть и оно меньше или равно нулю, то оно становится один*/
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) { /*Функция принимает событие (кликнуто)*/
    let button = event.target /*Ищем кнопку,куда тыкнули*/
    let shopItem = button.parentElement.parentElement /*Ищем родителя родителя кнопки, чтобы оттуда забрать наименование товара*/
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText /*Назначем переменную с текстом из наименования товара*/
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText /*Назначаем переменную, которая забирает текст с ценой товара*/
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src /*Тоже самое с картинкой*/
    addItemToCart(title, price, imageSrc) /*Эта функция создаст строку с корзиной, в которой будет наименование, цена и картинка товара*/
    updateCartTotal()
    
}

function addItemToCart(title, price, imageSrc) { /*Функция берет переменные, которые мы ей передали выше*/
    let cartRow = document.createElement('div')/*Создаем строку (точнее блок)*/
    cartRow.classList.add('cart-row') /*Добавляем стили для нашей новой  сгенерированной корзины*/
    let cartItems = document.getElementsByClassName('cart-items')[0] /*Теперь в html документе мы ищем блок cart-items, который предусмотрительно сделали и которому задали стили*/
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title') /*Теперь ищем наименование товара,который мы добавили в корозину*/
    for (let i = 0; i < cartItemNames.length; i++) { /*И проверяем, если такой товар есть в корзине то мы выводим сообщение, что товар уже добавлен*/
        if (cartItemNames[i].innerText == title) { /*наименование сравнивается с переменной, которую передавали в функцию*/
            alert('Этот товар уже добавлен в корзину!')
            return /*Теперь надо выйти  из фунции и просто пойти дальше*/
        }
    }
    /*Код ниже для того, чтобы сразу задать структуру нашей новой корзины*/
    /*${imageSrc} , ${title}и ${price} мы используем знак доллара чтобы передавать переменные в нашу новую строку корзины*/
    let cartRowContents = `  
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100"> 
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">УДАЛИТЬ</button>
        </div>`
    cartRow.innerHTML = cartRowContents /*задаем  текст из cartRowContents нашей карт-роу*/
    cartItems.append(cartRow) /*метод добавляет в конец элемента нашу новую строку*/
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem) /*Добавляем слушатель события, так как когда страница загрузилась, кнопки удаления из корзины еще не было, тк не было и итемов в корзине*/
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged) /*Тоже самое для изменения количества товаров*/
}

function updateCartTotal() { /*Эта функция будет изменять цену при изменении количества*/
    let cartItemContainer = document.getElementsByClassName('cart-items')[0] /*Сперва находим родителя строки корзины.Индекс говорит о том, что мы хотим взять самый первый элемент массива карт-итемс(Это вообще вся корзина)*/
    let cartRows = cartItemContainer.getElementsByClassName('cart-row') /*теперь находим строку корзины*/
    let total = 0 /*Изначально ставим цену ноль, в корзинке пусто*/
    for (let i = 0; i < cartRows.length; i++) { /*Затем паеребираем массив со строками корзины */
        let cartRow = cartRows[i] /*Задаем переменную, устанавливаем ей значение, равное любому элементу массива со строками*/
        let priceElement = cartRow.getElementsByClassName('cart-price')[0] /*Создаем переменную для получения цены товара и нам снова нужен самый первый элемент*/
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0] //Создаем переменную для получения количества товаров*/
        let price = parseFloat(priceElement.innerText) /*До этого момента мы имели сам элемент, теперь же мы получаем текстовое значние. И чтобы это значение было не строкой, а числом мы используем parseFloat*/
        let quantity = quantityElement.value/*Теперь нужно получить значение инпута с количествоим, поэтому используем value*/
        total = total + (price * quantity) /*Теперь изменяем цену, умножая стоимость на количество*/
    }
    total = Math.round(total * 100) / 100 /*Это я пишу на тот случай, если цена, например, 1999.90, чтобы при умножении не было 100500 десятичных знаков после запятой,беру ближайшее целое число и  округляю до 2 знаков после запятой */
    document.getElementsByClassName('cart-total-price')[0].innerText =  total + 'Р' /*Ловим html класс, где выводится общая цена и задаем ей текст при помощи иннер.текст, а текст этот наша полученная итоговая цена  плюс рубли*/
}




/*Кружочек для корзины*/
function round (e){
    let butWrap = $(this).parents('.shop-item-details');
    butWrap.append('<div class="animtocart"></div>');
    $('.animtocart').css({
      'position' : 'absolute',
      'background' : '#CD3408',
      'width' :  '25px',
      'height' : '25px',
      'border-radius' : '100px',
      'z-index' : '9999999999',
      'left' : e.pageX-25,
      'top' : e.pageY-25,
    });
    let cart = $('.contact').offset();
    $('.animtocart').animate({ top: cart.top + 50 + 'px', left: cart.left + 160 + 'px', width: 25, height: 25 }, 800, function(){
      $(this).remove();
    });
  };